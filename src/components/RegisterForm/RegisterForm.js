"use client";

import { useState } from "react";
import { useRegisterUserMutation } from "../../context/authApi";
import VerifyOtpForm from "../VerifyOtpForm/VerifyOtpForm";
import "./register.scss";
import Image from "next/image";
import logo from "../../assets/images/logo.svg";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function RegisterForm() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const { t, i18n } = useTranslation("global");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "+998", // +998 bilan boshlanadi
    password: "",
    confirmPassword: "",
  });

  const [showVerify, setShowVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith("+998")) {
      value = "+998" + value.replace(/\D/g, "");
    }

    value = "+998" + value.slice(4).replace(/\D/g, "");

    if (value.length > 13) {
      value = value.slice(0, 13);
    }

    setForm({ ...form, phoneNumber: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form).unwrap();
      setShowVerify(true);
    } catch (err) {
      toast.error("Xatolik: " + (err?.data?.np || "Server xatosi"));
    }
  };

  if (showVerify) {
    return (
      <VerifyOtpForm phoneNumber={form.phoneNumber} password={form.password} />
    );
  }

  return (
    <div id="register">
      <div className="register">
        <form className="register__form" onSubmit={handleSubmit}>
          <Image src={logo} alt="logo" />
          <h2>{t("register.title")}</h2>

          <label htmlFor="">{t("register.firstNameLabel")}</label>
          <input
            className="register__input"
            type="text"
            name="firstName"
            placeholder={t("register.firstNameLabel")}
            value={form.firstName}
            onChange={handleChange}
            required
          />

          <label htmlFor="">{t("register.firstNamePlaceholder")}</label>
          <input
            className="register__input"
            type="text"
            name="lastName"
            placeholder={t("register.firstNamePlaceholder")}
            value={form.lastName}
            onChange={handleChange}
            required
          />

          <label htmlFor="">{t("register.phoneLabel")}</label>
          <input
            className="register__input"
            type="tel"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handlePhoneChange}
            required
          />

          <label htmlFor="">{t("register.passwordLabel")}</label>
          <div className="password-wrapper">
            <input
              className="register__input"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder={t("register.passwordPlaceholder")}
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              id="togglePassword"
              className="password-toggle-btn"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={
                showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"
              }
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3-11-7 1.05-2.2 2.59-3.99 4.43-5.2"></path>
                  <path d="M1 1l22 22"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          </div>

          <label htmlFor="">{t("register.confirmPasswordPlaceholder")}</label>
          <div className="password-wrapper">
            <input
              className="register__input"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder={t("register.confirmPasswordPlaceholder")}
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              id="togglePassword"
              className="password-toggle-btn"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={
                showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"
              }
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3-11-7 1.05-2.2 2.59-3.99 4.43-5.2"></path>
                  <path d="M1 1l22 22"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          </div>

          <button className="button" type="submit" disabled={isLoading}>
            {isLoading ? t("register.loading") : t("register.submit")}
          </button>

          <p>
            {t("register.hasAccount")}
            <br />
            <Link href={"/login"}>{t("register.loginLink")}</Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
