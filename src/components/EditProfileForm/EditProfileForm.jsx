"use client";

import { useState } from "react";
import {
  useRequestChangePhoneMutation,
  useChangePhoneMutation,
  useChangePasswordMutation,
} from "../../context/authApi";
import { useUpdateUserProfileMutation } from "../../context/userApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditProfileForm.scss";

export default function EditProfileForm({ onClose }) {
  const [activeTab, setActiveTab] = useState("profile");

  // 👤 Profil + Parol states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateUserProfile, { isLoading: isProfileLoading }] =
    useUpdateUserProfileMutation();
  const [changePassword, { isLoading: isPasswordLoading }] =
    useChangePasswordMutation();

  // 📱 Telefon states
  const [newPhone, setNewPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const [requestChangePhone, { isLoading: isRequesting }] =
    useRequestChangePhoneMutation();
  const [changePhone, { isLoading: isPhoneLoading }] = useChangePhoneMutation();

  // 👤 Profil + 🔑 Parolni birga update qilish
  const handleProfileAndPassword = async (e) => {
    e.preventDefault();

    try {
      // 🔹 1. Profilni yangilash
      if (firstName || lastName) {
        await updateUserProfile({ firstName, lastName }).unwrap();
        toast.success("Profil yangilandi ✅");
      }

      // 🔹 2. Parolni yangilash
      if (oldPassword || newPassword || confirmPassword) {
        if (newPassword !== confirmPassword) {
          toast.error("Yangi parol tasdiqlanmadi ❌");
          return;
        }
        await changePassword({
          currentPassword: oldPassword,
          newPassword,
          confirmPassword,
        }).unwrap();
        toast.success("Parol yangilandi ✅");
      }

      // 🔹 Reset
      setFirstName("");
      setLastName("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Xatolik yuz berdi ❌");
    }
  };

  // 📱 Telefon kod yuborish
  const handleRequestCode = async (e) => {
    e.preventDefault();
    if (!newPhone) {
      toast.error("Iltimos yangi telefon raqamni kiriting");
      return;
    }

    try {
      const formattedPhone = newPhone.startsWith("+")
        ? newPhone
        : `+${newPhone}`;

      await requestChangePhone({ newPhoneNumber: formattedPhone }).unwrap();
      toast.success("Tasdiqlash kodi yuborildi ✅");
      setStep(2);
      setOtpCode("");
      setSecondsLeft(60);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Kod yuborishda xatolik ❌");
    }
  };

  // 📱 Telefonni tasdiqlash
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
        newPhoneNumber: formattedPhone,
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

  return (
    <div className="edit-profile-form">
      <h3>Shaxsiy ma’lumotlarni o‘zgartirish</h3>

      <div className="tabs">
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          👤 Profil & Parol
        </button>
        <button
          className={activeTab === "phone" ? "active" : ""}
          onClick={() => setActiveTab("phone")}
        >
          📱 Telefon
        </button>
      </div>

      {/* 👤 Profil + 🔑 Parol */}
      {activeTab === "profile" && (
        <form onSubmit={handleProfileAndPassword} className="form">
          <input
            type="text"
            placeholder="Ism"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Familiya"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="password"
            placeholder="Eski parol"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Yangi parol"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Yangi parolni tasdiqlash"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={isProfileLoading || isPasswordLoading}
          >
            {isProfileLoading || isPasswordLoading
              ? "Yuklanmoqda..."
              : "Saqlash"}
          </button>
        </form>
      )}

      {/* 📱 Telefon */}
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
              <input
                type="text"
                placeholder="Tasdiqlash kodi"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                required
              />
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
