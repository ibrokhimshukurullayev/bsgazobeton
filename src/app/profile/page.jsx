"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetUserInfoQuery } from "../../context/userApi";
import {
  useChangePasswordMutation,
  useRequestChangePhoneMutation,
  useChangePhoneMutation,
} from "../../context/authApi";
import { useTranslation } from "react-i18next";
import "./profile.scss";
import Loading from "../../components/loading/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export const metadata = {
//   title: "Profile | BS Gazobeton",
//   description: "O'zbekistonning eng sifatli gazobeton mahsulotlari.",
// };

export default function ProfilePage() {
  const { t } = useTranslation("global");
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) router.push("/login");
  }, [token, router]);

  const { data, isLoading, error, refetch } = useGetUserInfoQuery(undefined, {
    skip: !token,
  });

  const user = data?.data;

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    avatar: null,
    profileImageUrl: null,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isChanged, setIsChanged] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const [changePassword, { isLoading: updatingPassword }] =
    useChangePasswordMutation();
  const [requestPhoneChange, { isLoading: requestingPhone }] =
    useRequestChangePhoneMutation();
  const [verifyPhoneChange, { isLoading: verifyingPhone }] =
    useChangePhoneMutation();

  // ✅ Foydalanuvchi ma'lumotlarini yuklash
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        phonenumber: user.phonenumber || "",
        avatar: null,
        profileImageUrl: user.profileimageurl || null,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setIsChanged(false);
    }
  }, [user]);

  if (!token) return <div>Yuborilmoqda...</div>;
  if (isLoading) return <Loading />;
  if (error) return <div>Xatolik yuz berdi</div>;

  // Input o‘zgarishi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsChanged(true);
  };

  // ✅ Rasm tanlanganda preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      toast.error(t("toasts.imageTooLarge"));
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      avatar: file,
      profileImageUrl: previewUrl,
    }));
    setIsChanged(true);
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      avatar: null,
      profileImageUrl: user?.profileimageurl || null,
    }));
    setIsChanged(true);
  };

  // ✅ Fayl yuklash va profilni yangilash
  const handleSave = async () => {
    try {
      let uploadedImageUrl = user?.profileimageurl || null;

      // Agar yangi rasm tanlangan bo‘lsa
      if (formData.avatar) {
        const form = new FormData();
        form.append("File", formData.avatar);

        const uploadResponse = await fetch(
          "https://api.bsgazobeton.uz/api/upload/file",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: form,
          }
        );

        if (!uploadResponse.ok) {
          if (uploadResponse.status === 401)
            throw new Error("Avtorizatsiya xatosi! Iltimos qayta kiring.");
          throw new Error(t("toasts.uploadError"));
        }

        const uploadData = await uploadResponse.json();
        uploadedImageUrl = uploadData?.data
          ? `https://api.bsgazobeton.uz${uploadData.data}`
          : null;

        if (!uploadedImageUrl) throw new Error("Yuklangan rasm URL topilmadi!");
      }

      // 🔹 Profil ma'lumotlarini PUT orqali yangilash
      const response = await fetch(
        "https://api.bsgazobeton.uz/api/users/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: formData.firstname,
            lastName: formData.lastname,
            profileImageUrl: uploadedImageUrl,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401)
          throw new Error("Sessiya tugagan! Iltimos qayta tizimga kiring.");
        throw new Error(t("toasts.profileUpdateError"));
      }

      toast.success(t("toasts.profileUpdated"));
      setFormData((prev) => ({ ...prev, avatar: null }));
      refetch();
    } catch (err) {
      toast.error(
        "Xatolik: " +
          (err?.data?.message || err.message || t("toasts.profileUpdateError"))
      );
    }
  };

  // ✅ Parolni yangilash
  const handlePasswordUpdate = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error(t("toasts.passwordMismatch"));
      return;
    }
    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      }).unwrap();
      toast.success(t("toasts.passwordUpdated"));
      setShowPasswordFields(false);
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      toast.error(
        "Xatolik: " + (err?.data?.message || t("toasts.passwordError"))
      );
    }
  };

  // ✅ Telefon raqam o‘zgartirish
  const handleRequestPhoneChange = async () => {
    try {
      await requestPhoneChange({
        newPhoneNumber: formData.phonenumber.replace("+", ""),
      }).unwrap();
      toast.info("Tasdiqlash kodi yuborildi 📩");
      setVerifyModal(true);
    } catch (err) {
      toast.error("Xatolik: " + (err?.data?.message || "Kod yuborilmadi"));
    }
  };

  // ✅ Telefon kodi tasdiqlash
  const handleVerifyCode = async () => {
    try {
      await verifyPhoneChange({
        newPhoneNumber: formData.phonenumber.replace("+", ""),
        code: otpCode,
      }).unwrap();
      toast.success("Telefon raqam tasdiqlandi ✅");
      setVerifyModal(false);
      setOtpCode("");
    } catch (err) {
      toast.error("Xatolik: " + (err?.data?.message || "Kod xato"));
    }
  };

  return (
    <div className="profile-wrapper">
      <ToastContainer />
      <h2 className="profile-title">{t("profiles.title")}</h2>
      <p className="subtitle">{t("profiles.subtitle")}</p>

      <div className="profile-card">
        {/* ✅ Avatar bo‘limi */}
        <div className="profile__avatar__section">
          <div className="profile-avatar">
            {formData.avatar ? (
              <img src={URL.createObjectURL(formData.avatar)} alt="avatar" />
            ) : formData.profileImageUrl ? (
              <img
                src={
                  formData.profileImageUrl.startsWith("http")
                    ? formData.profileImageUrl
                    : `https://api.bsgazobeton.uz${formData.profileImageUrl}`
                }
                alt="avatar"
              />
            ) : (
              <span>{formData.firstname?.[0]?.toUpperCase() || "?"}</span>
            )}
          </div>

          <div className="avatar-actions">
            <input
              type="file"
              id="avatarUpload"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
            <label htmlFor="avatarUpload" className="upload-btn">
              {t("profiles.uploadPhoto")}
            </label>

            {(formData.avatar || formData.profileImageUrl) && (
              <button className="remove-btn" onClick={handleRemoveImage}>
                {t("profiles.removePhoto")}
              </button>
            )}
          </div>
        </div>

        <small>{t("profiles.recommended")}</small>

        {/* Ism familiya */}
        <div className="profile__forms">
          <div className="profile__forms__left">
            <label>{t("profiles.firstName")}</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>

          <div className="profile__forms__left">
            <label>{t("profiles.lastName")}</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>

          <button
            className="save-btn"
            disabled={!isChanged}
            onClick={handleSave}
          >
            {t("profiles.saveChanges")}
          </button>
        </div>

        {/* Telefon */}
        <div className="profile-form">
          <label>{t("profiles.phoneNumber")}</label>
          <div className="phone-input">
            <input
              type="text"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
            />
            <button
              type="button"
              className="verify-btn"
              onClick={handleRequestPhoneChange}
              disabled={requestingPhone}
            >
              {requestingPhone
                ? t("profiles.sending")
                : t("profiles.verifyPhone")}
            </button>
          </div>
        </div>

        {/* Parol o‘zgarishi */}
        <div className="profile-form">
          {!showPasswordFields ? (
            <div className="password__change">
              <p>{t("profiles.password")}</p>
              <button
                type="button"
                className="change-pass-btn"
                onClick={() => setShowPasswordFields(true)}
              >
                {t("profiles.changePassword")}
              </button>
            </div>
          ) : (
            <div className="password-fields">
              <label>{t("profiles.currentPassword")}</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
              />

              <label>{t("profiles.newPassword")}</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />

              <label>{t("profiles.confirmNewPassword")}</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <div className="password-actions">
                <button onClick={() => setShowPasswordFields(false)}>
                  {t("profiles.cancel")}
                </button>
                <button
                  onClick={handlePasswordUpdate}
                  disabled={
                    updatingPassword ||
                    !formData.currentPassword ||
                    !formData.newPassword ||
                    !formData.confirmPassword ||
                    formData.newPassword !== formData.confirmPassword
                  }
                >
                  {updatingPassword
                    ? t("profiles.updating")
                    : t("profiles.updatePassword")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tasdiqlash oynasi */}
      {verifyModal && (
        <div className="verify-modal">
          <div className="modal-content">
            <h3>{t("profiles.verifyPhoneTitle")}</h3>
            <p>
              {t("profiles.verifyPhoneText")} {formData.phonenumber}
            </p>
            <div className="code-inputs">
              <input
                type="text"
                maxLength="6"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
              />
            </div>
            <button
              className="verify-code-btn"
              onClick={handleVerifyCode}
              disabled={verifyingPhone}
            >
              {verifyingPhone
                ? t("profiles.verifying")
                : t("profiles.verifyCode")}
            </button>
            <button onClick={() => setVerifyModal(false)}>
              {t("profiles.close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
