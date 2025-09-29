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

  const [phoneNumber, setPhoneNumber] = useState("+998");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // yangi state: parol ko'rsatilsinmi
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login({ phoneNumber, password }).unwrap();

      localStorage.setItem("token", response.data.token);
      toast.success("Tizimga muvaffaqiyatli kirdingiz!");

      if (response.data.token) {
        router.push("/profile");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Xatolik yuz berdi");
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;

    // Agar foydalanuvchi +998 ni o‘chirsa, yana qaytib qo‘yiladi
    if (!value.startsWith("+998")) {
      value = "+998" + value.replace(/\D/g, "");
    }

    // faqat raqamlar
    value = "+998" + value.slice(4).replace(/\D/g, "");

    // maksimal uzunlik (+998 dan keyin 9 ta raqam)
    if (value.length > 13) {
      value = value.slice(0, 13);
    }

    setPhoneNumber(value);
  };

  return (
    <div id="login">
      <div className="login container">
        <form className="login__form" onSubmit={handleLogin}>
          <Image src={logo} alt="logo" />
          <h2>Telefon raqamingiz hamda parolingizni kiriting</h2>

          <label htmlFor="phone">Telefon raqamingiz</label>
          <input
            id="phone"
            className="login__input"
            type="tel"
            placeholder="+998 (__) ___-__-__"
            value={phoneNumber}
            onChange={handlePhoneChange}
            required
          />

          <label htmlFor="password">Parolingiz</label>

          {/* Password wrapper: input + toggle button */}
          <div className="password-wrapper">
            <input
              id="password"
              className="login__input login__input--password"
              type={showPassword ? "text" : "password"}
              placeholder="Parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-describedby="togglePassword"
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

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button className="button" type="submit" disabled={isLoading}>
            {isLoading ? "Kutilmoqda..." : "Kirish"}
          </button>

          <p>
            Agar sahifangiz bo'lmasa yangi sahifa ochishingiz mumkin.{" "}
            <Link href={"/register"}>Yangi sahifa ochish</Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
