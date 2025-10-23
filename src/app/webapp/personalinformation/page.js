"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { useGetUserInfoQuery } from "../../../context/userApi";
import "react-toastify/dist/ReactToastify.css";
import "./personalinformation.scss";
import profileDefault from "../../../assets/images/webappImages/profiles.svg";
import editIcon from "../../../assets/images/webappImages/edit.svg";

export default function PersonalInformation() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [mounted, setMounted] = useState(false);

  // ✅ faqat clientda localStorage o‘qiladi
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setMounted(true);
  }, []);

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
  const [showOptions, setShowOptions] = useState(false);

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

  // 🔹 login redirect client mount bo‘lgandan keyin
  useEffect(() => {
    if (mounted && !token) {
      router.push("/login");
    }
  }, [mounted, token, router]);

  // 🔹 SSR paytida hech narsa render qilma
  if (!mounted) return null;

  if (!token) return <p className="loading">Yuborilmoqda...</p>;
  if (isLoading) return <p className="loading">Yuklanmoqda...</p>;
  if (error) return <p className="error">Xatolik yuz berdi</p>;

  // Rasmni tanlash
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Rasm 3MB dan oshmasligi kerak");
      return;
    }

    if (formData.profileImageUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(formData.profileImageUrl);
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
    if (formData.profileImageUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(formData.profileImageUrl);
    }
    setFormData((prev) => ({
      ...prev,
      avatar: null,
      profileImageUrl: "",
    }));
    setIsChanged(true);
    setShowOptions(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsChanged(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      let uploadedImageUrl = formData.profileImageUrl;

      // ✅ Agar yangi avatar tanlangan bo‘lsa — token bilan upload qilamiz
      if (formData.avatar) {
        const formDataImg = new FormData();
        formDataImg.append("File", formData.avatar);

        const uploadRes = await fetch(
          "https://api.bsgazobeton.uz/api/upload/file",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`, // 🟢 Tokenni yuboramiz
            },
            body: formDataImg,
          }
        );

        // ✅ JSON parse xatoligini oldini olamiz
        const text = await uploadRes.text();
        let uploadData;
        try {
          uploadData = JSON.parse(text);
        } catch {
          throw new Error("Serverdan noto‘g‘ri javob keldi");
        }

        if (!uploadRes.ok || !uploadData?.data) {
          toast.error("Rasm yuklanmadi!");
          return;
        }

        uploadedImageUrl = `https://api.bsgazobeton.uz${uploadData.data}`;
      }

      // ✅ Profil ma’lumotlarini yangilaymiz
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
      toast.success("Profil yangilandi ✅");
      refetch();
      setIsChanged(false);
    } catch (err) {
      toast.error("Xatolik: " + err.message);
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-center" style={{ top: "50px" }} />
      <div className="setting__top">
        <h3 className="setting__top__title">Profil ma‘lumotlari</h3>
      </div>

      <div className="profile-photo">
        <div className="photo-wrapper">
          <div className="photo-container">
            <Image
              src={formData.profileImageUrl || profileDefault}
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
}
