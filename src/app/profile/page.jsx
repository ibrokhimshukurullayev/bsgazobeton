"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetUserInfoQuery,
  useUpdateUserProfileMutation,
} from "../../context/userApi";
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

export default function ProfilePage() {
  const { t } = useTranslation("global");
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  const { data, isLoading, error } = useGetUserInfoQuery(undefined, {
    skip: !token,
  });

  const user = data?.data;

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    avatar: null,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isChanged, setIsChanged] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  // Mutations
  const [updateProfile, { isLoading: updatingProfile }] =
    useUpdateUserProfileMutation();
  const [changePassword, { isLoading: updatingPassword }] =
    useChangePasswordMutation();
  const [requestPhoneChange, { isLoading: requestingPhone }] =
    useRequestChangePhoneMutation();
  const [verifyPhoneChange, { isLoading: verifyingPhone }] =
    useChangePhoneMutation();

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        phonenumber: user.phonenumber || "",
      }));
    }
  }, [user]);

  if (!token) return <div>Yuborilmoqda...</div>;
  if (isLoading) return <Loading />;
  if (error) return <div>Xatolik yuz berdi</div>;

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsChanged(true);
  };

  // Profil yangilash
  const handleSave = async () => {
    try {
      await updateProfile({
        firstName: formData.firstname,
        lastName: formData.lastname,
      }).unwrap();
      toast.success("Profil yangilandi ✅");
      setIsChanged(false);
    } catch (err) {
      toast.error("Xatolik: " + (err?.data?.message || "Profil yangilanmadi"));
    }
  };

  // Parol yangilash
  const handlePasswordUpdate = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Parollar mos emas!");
      return;
    }
    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      }).unwrap();
      toast.success("Parol yangilandi ✅");
      setShowPasswordFields(false);
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      toast.error("Xatolik: " + (err?.data?.message || "Parol yangilanmadi"));
    }
  };

  // Telefon raqamga kod yuborish (request-change-phone)
  const handleRequestPhoneChange = async () => {
    try {
      await requestPhoneChange({
        newPhoneNumber: formData.phonenumber.replace("+", ""), // ✅ plus belgisisiz yuboramiz
      }).unwrap();
      toast.info("Tasdiqlash kodi yuborildi 📩");
      setVerifyModal(true);
    } catch (err) {
      toast.error("Xatolik: " + (err?.data?.message || "Kod yuborilmadi"));
    }
  };

  // Telefon raqamni tasdiqlash (change-phone)
  const handleVerifyCode = async () => {
    try {
      await verifyPhoneChange({
        newPhoneNumber: formData.phonenumber.replace("+", ""), // ✅
        code: otpCode, // SMS orqali kelgan kod
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
        <div className="profile__avatar__section">
          <div className="profile-avatar">
            {formData.avatar ? (
              <img src={URL.createObjectURL(formData.avatar)} alt="avatar" />
            ) : (
              <span>{formData.firstname[0]}</span>
            )}
          </div>
          <div className="avatar-actions">
            <input
              type="file"
              id="avatarUpload"
              hidden
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  avatar: e.target.files[0],
                }))
              }
            />
            <label htmlFor="avatarUpload" className="upload-btn">
              {t("profiles.uploadPhoto")}
            </label>
            {formData.avatar && (
              <button
                className="remove-btn"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, avatar: null }))
                }
              >
                {t("profiles.removePhoto")}
              </button>
            )}
          </div>
        </div>
        <small>{t("profiles.recommended")}</small>

        {/* Full Name */}
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
            disabled={!isChanged || updatingProfile}
            onClick={handleSave}
          >
            {updatingProfile ? t("profiles.saving") : t("profiles.saveChanges")}
          </button>
        </div>

        {/* Phone */}
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

        {/* Password */}
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
