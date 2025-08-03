"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const redirectTo = localStorage.getItem("next_after_login") || "/";
      localStorage.removeItem("next_after_login");
      router.push(redirectTo);
    }
  }, []);
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
