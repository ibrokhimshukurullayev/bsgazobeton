"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { useGetUserInfoQuery } from "../../../context/userApi";
import "react-toastify/dist/ReactToastify.css";
import "./personalinformation.scss";

import profileDefault from "../../../assets/images/webappImages/profiles.svg";
import editIcon from "../../../assets/images/webappImages/edit.svg"; // ✏️ yangi icon qo‘sh

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
    avatar: null,
    profileImageUrl: "",
  });

  const [isChanged, setIsChanged] = useState(false);
  const [showOptions, setShowOptions] = useState(false); // 🔹 yangi holat

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        avatar: null,
        profileImageUrl: user.profileimageurl || "",
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
    setShowOptions(false);
  };

  const handleDeleteImage = () => {
    setFormData((prev) => ({
      ...prev,
      avatar: null,
      profileImageUrl: "",
    }));
    setIsChanged(true);
    setShowOptions(false);
  };

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

  return (
    <div className="container">
      <ToastContainer />
      <div className="setting__top">
        <h3 className="setting__top__title">Profil ma‘lumotlari</h3>
      </div>

      <div className="profile-photo">
        <div className="photo-wrapper">
          <div className="photo-container">
            <Image
              src={
                formData.profileImageUrl
                  ? formData.profileImageUrl
                  : profileDefault
              }
              alt="User photo"
              width={120}
              height={120}
              className="profile-image"
            />

            <button
              type="button"
              className="edit-btn"
              onClick={() => setShowOptions(!showOptions)}
            >
              <Image src={editIcon} alt="Edit" width={20} height={20} />
            </button>

            {showOptions && (
              <div className="edit-options">
                <label htmlFor="upload" className="edit-option">
                  Rasmni o‘zgartirish
                </label>
                {formData.profileImageUrl && (
                  <button
                    type="button"
                    className="edit-option delete"
                    onClick={handleDeleteImage}
                  >
                    Rasmni o‘chirish
                  </button>
                )}
                <input
                  id="upload"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </div>
            )}
          </div>
        </div>
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
    </div>
  );
};

export default PersonalInformation;
