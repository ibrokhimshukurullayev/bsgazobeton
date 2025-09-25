"use client";

import { useState, useEffect } from "react";
import {
  useRequestChangePhoneMutation,
  useChangePhoneMutation,
  useChangePasswordMutation,
} from "../../context/authApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditProfileForm.scss";

export default function EditProfileForm({ onClose }) {
  const [activeTab, setActiveTab] = useState("password");

  // ===========================
  // 🔑 Parol states
  // ===========================
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword, { isLoading: isPasswordLoading }] =
    useChangePasswordMutation();

  // ===========================
  // 📱 Telefon states
  // ===========================
  const [newPhone, setNewPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState(1); // 1 = raqam yuborish, 2 = kod kiritish
  const [secondsLeft, setSecondsLeft] = useState(0);

  const [requestChangePhone, { isLoading: isRequesting }] =
    useRequestChangePhoneMutation();
  const [changePhone, { isLoading: isPhoneLoading }] = useChangePhoneMutation();

  // ===========================
  // 🔑 Parolni o‘zgartirish
  // ===========================
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Yangi parol tasdiqlanmadi ❌");
      return;
    }
    try {
      await changePassword({
        currentPassword: oldPassword,
        newPassword,
        confirmPassword,
      }).unwrap();

      toast.success("Parol muvaffaqiyatli o‘zgartirildi ✅");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Xatolik yuz berdi ❌");
    }
  };

  // ===========================
  // 1-bosqich: kod yuborish
  // ===========================
  const handleRequestCode = async (e) => {
    e.preventDefault();
    if (!newPhone) {
      toast.error("Iltimos yangi telefon raqamni kiriting");
      return;
    }

    try {
      const formattedPhone = newPhone.startsWith("+")
        ? newPhone
        : `+${newPhone}`; // faqat +998... formatda yuboramiz

      // ✅ backend `newphonenumber` ni kutyapti
      await requestChangePhone({ newphonenumber: formattedPhone }).unwrap();

      toast.success("Tasdiqlash kodi yuborildi ✅");
      setStep(2);
      setOtpCode("");
      setSecondsLeft(60); // taymer 60s
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Kod yuborishda xatolik ❌");
    }
  };

  // ===========================
  // 2-bosqich: kodni kiritish
  // ===========================
  const handlePhoneChange = async (e) => {
    e.preventDefault();
    if (!otpCode) {
      toast.error("Iltimos tasdiqlash kodini kiriting");
      return;
    }

    try {
      const formattedPhone = newPhone.startsWith("+")
        ? newPhone
        : `+${newPhone}`;

      await changePhone({
        code: otpCode,
        newphonenumber: formattedPhone, // ✅ backend shuni kutyapti
      }).unwrap();

      toast.success("Telefon raqamingiz yangilandi ✅");
      setNewPhone("");
      setOtpCode("");
      setStep(1);
      setSecondsLeft(0);
      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Telefonni yangilashda xatolik ❌");
    }
  };

  // ===========================
  // Kodni qayta yuborish
  // ===========================
  const handleResend = async () => {
    if (secondsLeft > 0) return;
    try {
      const formattedPhone = newPhone.startsWith("+")
        ? newPhone
        : `+${newPhone}`;

      await requestChangePhone({ newphonenumber: formattedPhone }).unwrap();
      toast.success("Kod qayta yuborildi ✅");
      setSecondsLeft(60);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Qayta yuborishda xatolik ❌");
    }
  };

  // ===========================
  // Taymer
  // ===========================
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  return (
    <div className="edit-profile-form">
      <h3>Shaxsiy ma’lumotlarni o‘zgartirish</h3>

      {/* Tablar */}
      <div className="tabs">
        <button
          className={activeTab === "password" ? "active" : ""}
          onClick={() => setActiveTab("password")}
        >
          🔑 Parol
        </button>
        <button
          className={activeTab === "phone" ? "active" : ""}
          onClick={() => setActiveTab("phone")}
        >
          📱 Telefon
        </button>
      </div>

      {/* 🔑 Parol form */}
      {activeTab === "password" && (
        <form onSubmit={handlePasswordChange} className="form">
          <input
            type="password"
            placeholder="Eski parol"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Yangi parol"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Yangi parolni tasdiqlash"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={isPasswordLoading}>
            {isPasswordLoading ? "Yuklanmoqda..." : "Saqlash"}
          </button>
        </form>
      )}

      {/* 📱 Telefon form */}
      {activeTab === "phone" && (
        <div className="form">
          {step === 1 && (
            <form onSubmit={handleRequestCode}>
              <input
                type="text"
                placeholder="Yangi telefon raqam (+998XXXXXXXXX)"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                required
              />
              <button type="submit" disabled={isRequesting}>
                {isRequesting ? "Yuborilmoqda..." : "Kod yuborish"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePhoneChange}>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="text"
                  placeholder="Tasdiqlash kodi"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={secondsLeft > 0}
                >
                  {secondsLeft > 0
                    ? `Qayta yuborish ${secondsLeft}s`
                    : "Qayta yuborish"}
                </button>
              </div>

              <button type="submit" disabled={isPhoneLoading}>
                {isPhoneLoading ? "Yangilanmoqda..." : "Yangilash"}
              </button>
            </form>
          )}
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
