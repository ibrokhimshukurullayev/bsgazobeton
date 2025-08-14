"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginUserMutation } from "../../context/authApi";
import "./login.scss";
import Image from "next/image";
import logo from "../../assets/images/logo.svg";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

export default function LoginForm() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginUserMutation();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login({ phoneNumber, password }).unwrap();

      // 1. Tokenni cookie ga saqlash
      localStorage.setItem("token", response.data.token);
      toast.success("Tizimga muvaffaqiyatli kirdingiz!");

      // 2. Profile sahifasiga yo'naltirish
      router.push("/profile");
    } catch (err) {
      toast.error(err?.data?.message || "Xatolik yuz berdi");
    }
  };

  return (
    <div id="login">
      <div className="login container">
        <form className="login__form" onSubmit={handleLogin}>
          <Image src={logo} alt="logo" />
          <h2>Telefon raqamingiz hamda parolingizni kiriting</h2>
          <label htmlFor="">Telefon raqamingiz</label>
          <input
            className="login__input"
            type="text"
            placeholder="+998 (__) ___-__-__"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <label htmlFor="">Telefon raqamingiz</label>
          <input
            className="login__input"
            type="password"
            placeholder="Parol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Kutilmoqda..." : "Kirish"}
          </button>
          <p>
            Agar sahifangiz bo'lmasa yangi sahifa ochishingiz mumkin.
            <Link href={"/register"}>Yangi sahifa ochish</Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
