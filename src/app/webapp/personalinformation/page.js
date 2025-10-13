"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { useGetUserInfoQuery } from "../../../context/userApi";
import "react-toastify/dist/ReactToastify.css";
import "./personalinformation.scss";

import left from "../../../assets/images/webappImages/left.svg";
import profileDefault from "../../../assets/images/webappImages/profiles.svg";

const PersonalInformation = () => {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data, isLoading, error, refetch } = useGetUserInfoQuery(undefined, {
    skip: !token,
  });

  const user = data?.data;

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    avatar: null,
    profileImageUrl: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        phonenumber: user.phonenumber || "",
        avatar: null,
        profileImageUrl: user.profileimageurl || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  if (!token) {
    router.push("/login");
    return null;
  }

  if (isLoading) return <p className="loading">Yuklanmoqda...</p>;
  if (error) return <p className="error">Xatolik yuz berdi</p>;

  // 🔹 Input o'zgarishlari
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsChanged(true);
  };

  // 🔹 Rasm tanlanganda
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Rasm 3MB dan oshmasligi kerak");
      return;
    }
    const preview = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      avatar: file,
      profileImageUrl: preview,
    }));
    setIsChanged(true);
  };

  // 🔹 Ma'lumotni saqlash
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      let uploadedImageUrl = formData.profileImageUrl;

      if (formData.avatar) {
        const imgForm = new FormData();
        imgForm.append("File", formData.avatar);

        const uploadRes = await fetch(
          "https://api.bsgazobeton.uz/api/upload/file",
          { method: "POST", body: imgForm }
        );
        const uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData?.data) {
          toast.error("Rasm yuklanmadi!");
          return;
        }

        uploadedImageUrl = `https://api.bsgazobeton.uz${uploadData.data}`;
      }

      const res = await fetch("https://api.bsgazobeton.uz/api/users/profile", {
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
      });

      if (!res.ok) throw new Error("Yangilashda xatolik");
      toast.success("Profil ma'lumotlari yangilandi ✅");
      refetch();
      setIsChanged(false);
    } catch (err) {
      toast.error("Xatolik: " + err.message);
    }
  };

  // 🔹 Telefon raqamni yangilash
  const handlePhoneChange = async (e) => {
    e.preventDefault();

    if (!formData.phonenumber.trim()) {
      toast.error("Telefon raqamini kiriting!");
      return;
    }

    try {
      const res = await fetch("https://api.bsgazobeton.uz/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phoneNumber: formData.phonenumber,
        }),
      });

      if (!res.ok) throw new Error("Telefon raqamni o‘zgartirishda xatolik");
      toast.success("Telefon raqamingiz yangilandi ✅");
      refetch();
    } catch (err) {
      toast.error("Xatolik: " + err.message);
    }
  };

  // 🔹 Parolni yangilash
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Yangi parollar mos emas!");
      return;
    }

    try {
      const res = await fetch(
        "https://api.bsgazobeton.uz/api/auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword,
          }),
        }
      );

      if (!res.ok) throw new Error("Parolni o‘zgartirishda xatolik");
      toast.success("Parolingiz muvaffaqiyatli o‘zgartirildi ✅");

      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      toast.error("Xatolik: " + err.message);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="setting__top">
        <button className="setting__top__button" onClick={() => router.back()}>
          <Image
            onClick={() => router.push("/webapp/profile")}
            src={left}
            alt="back"
          />
        </button>
        <h3 className="setting__top__title">User settings</h3>
      </div>

      <div className="profile-photo">
        <div className="photo-wrapper">
          <Image
            src={
              formData.profileImageUrl
                ? formData.profileImageUrl
                : profileDefault
            }
            alt="User photo"
            width={100}
            height={100}
            className="profile-image"
          />

          <div className="photo-actions">
            <label htmlFor="upload" className="photo-btn change">
              O‘zgartirish
            </label>
            {formData.profileImageUrl && (
              <button
                type="button"
                className="photo-btn delete"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    avatar: null,
                    profileImageUrl: "",
                  }));
                  setIsChanged(true);
                }}
              >
                O‘chirish
              </button>
            )}
          </div>
        </div>

        <input
          id="upload"
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
      </div>

      <form className="order__form" onSubmit={handleSave}>
        <div className="order__form__info">
          <label className="form__group__label">Ismingiz</label>
          <input
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="form__group__input"
            type="text"
            placeholder="Ismingizni kiriting"
          />
        </div>

        <div className="order__form__info">
          <label className="form__group__label">Familiya</label>
          <input
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="form__group__input"
            type="text"
            placeholder="Familiyangizni kiriting"
          />
        </div>

        <button type="submit" className="form__button" disabled={!isChanged}>
          Saqlash
        </button>
      </form>

      <form className="order__form" onSubmit={handlePhoneChange}>
        <h2 className="setting__top__title" style={{ marginTop: "30px" }}>
          Telefon raqamni o‘zgartirish
        </h2>

        <div className="order__form__info">
          <label className="form__group__label">Telefon raqam</label>
          <input
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            className="form__group__input"
            type="text"
            placeholder="+998 90 123 45 67"
          />
        </div>

        <button type="submit" className="form__button">
          Telefon raqamni saqlash
        </button>
      </form>

      <form className="order__form" onSubmit={handlePasswordChange}>
        <h2 className="setting__top__title" style={{ marginTop: "30px" }}>
          Parolni o‘zgartirish
        </h2>

        <div className="order__form__info">
          <label className="form__group__label">Joriy parol</label>
          <input
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="form__group__input"
            type="password"
            placeholder="Hozirgi parolingiz"
          />
        </div>

        <div className="order__form__info">
          <label className="form__group__label">Yangi parol</label>
          <input
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="form__group__input"
            type="password"
            placeholder="Yangi parolni kiriting"
          />
        </div>

        <div className="order__form__info">
          <label className="form__group__label">Parolni tasdiqlang</label>
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form__group__input"
            type="password"
            placeholder="Yangi parolni qayta kiriting"
          />
        </div>

        <button type="submit" className="form__button">
          Parolni o‘zgartirish
        </button>
      </form>
    </div>
  );
};

export default PersonalInformation;
