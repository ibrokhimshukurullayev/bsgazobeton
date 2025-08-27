"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";

import {
  useVerifyPhoneMutation,
  useLoginUserMutation,
} from "../../context/authApi";
import logo from "../../assets/images/logo.svg";
import "./verify.scss";

export default function VerifyOtpForm({ phoneNumber, password }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [verifyPhone, { isLoading: isVerifying }] = useVerifyPhoneMutation();
  const [loginUser] = useLoginUserMutation();

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      await verifyPhone({
        phoneNumber: phoneNumber.replace("+", ""),
        code,
        language: "uz",
      }).unwrap();

      const loginRes = await loginUser({
        phoneNumber,
        password,
      }).unwrap();

      const token = loginRes?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        router.push("/profile");
      } else {
        toast.error("Login muvaffaqiyatsiz: token olinmadi");
      }
    } catch (err) {
      toast.error(
        "Xatolik: " + (err?.data?.message || "Tasdiqlash yoki login xato")
      );
    }
  };

  return (
    <div id="otp">
      <div className="otp">
        <form className="otp__form" onSubmit={handleVerify}>
          <Image src={logo} alt="logo" />
          <h2>Telefon raqamni tasdiqlash</h2>
          <input
            className="otp__input"
            type="text"
            placeholder="SMS kod"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button type="submit" disabled={isVerifying}>
            {isVerifying ? "Tasdiqlanmoqda..." : "Tasdiqlash"}
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}
