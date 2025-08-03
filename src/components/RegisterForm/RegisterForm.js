"use client";

import { useState } from "react";
import { useRegisterUserMutation } from "../../context/authApi";
import VerifyOtpForm from "../VerifyOtpForm/VerifyOtpForm";
import "./register.scss";
import Image from "next/image";
import logo from "../../assets/images/logo.svg";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

export default function RegisterForm() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [showVerify, setShowVerify] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
          <h2>
            Ro'yxatdan o'tish uchun ozingiz haqingizdagi ma'lumotlarni kiriting
          </h2>
          <label htmlFor="">Ism</label>
          <input
            className="register__input"
            type="text"
            name="firstName"
            placeholder="Ism"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <label htmlFor="">Familiya</label>
          <input
            className="register__input"
            type="text"
            name="lastName"
            placeholder="Familiya"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <label htmlFor="">Telefon raqamingiz</label>
          <input
            className="register__input"
            type="text"
            name="phoneNumber"
            placeholder="+998 (__) ___-__-__"
            value={form.phoneNumber}
            onChange={handleChange}
            required
          />
          <label htmlFor="">Parolingiz</label>
          <input
            className="register__input"
            type="password"
            name="password"
            placeholder="Parol"
            value={form.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="">Parolni tasdiqlang</label>
          <input
            className="register__input"
            type="password"
            name="confirmPassword"
            placeholder="Parolni tasdiqlang"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Yuborilmoqda..." : "Ro'yxatdan o'tish"}
          </button>
          <p>
            Agar sahifangiz bo'lsa kirishingiz mumkin
            <br />
            <Link href={"/login"}>Tizimga kirish</Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
