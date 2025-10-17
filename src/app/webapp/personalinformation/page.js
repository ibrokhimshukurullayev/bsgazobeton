"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useGetUserInfoQuery } from "../../../context/userApi";
import "react-toastify/dist/ReactToastify.css";
import "./personalinformation.scss";

import profileDefault from "../../../assets/images/webappImages/profiles.svg";
import editIcon from "../../../assets/images/webappImages/edit.svg";

const PersonalInformation = () => {
  const { t } = useTranslation("global");
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

  if (!token) {
    router.push("/login");
    return null;
  }

  if (isLoading) return <p className="loading">{t("personal_info.loading")}</p>;
  if (error) return <p className="error">{t("personal_info.error")}</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsChanged(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      toast.error(t("personal_info.photo_error"));
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
          toast.error(t("personal_info.upload_error"));
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

      if (!res.ok) throw new Error(t("personal_info.update_error"));
      toast.success(t("personal_info.update_success"));
      refetch();
      setIsChanged(false);
    } catch (err) {
      toast.error(t("personal_info.update_error"));
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="setting__top">
        <h3 className="setting__top__title">{t("personal_info.title")}</h3>
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
                  {t("personal_info.change_photo")}
                </label>
                {formData.profileImageUrl && (
                  <button
                    type="button"
                    className="edit-option delete"
                    onClick={handleDeleteImage}
                  >
                    {t("personal_info.delete_photo")}
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
          <label className="form__group__label">
            {t("personal_info.first_name")}
          </label>
          <input
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="form__group__input"
            type="text"
            placeholder={t("personal_info.first_name_placeholder")}
          />
        </div>

        <div className="order__form__info">
          <label className="form__group__label">
            {t("personal_info.last_name")}
          </label>
          <input
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="form__group__input"
            type="text"
            placeholder={t("personal_info.last_name_placeholder")}
          />
        </div>

        <button type="submit" className="form__button" disabled={!isChanged}>
          {t("personal_info.save")}
        </button>
      </form>
    </div>
  );
};

export default PersonalInformation;
