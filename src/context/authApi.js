import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Ro‘yxatdan o‘tish (register)
    registerUser: build.mutation({
      query: (body) => ({
        url: "/identity/register",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "uz_UZ",
        },
      }),
    }),

    // Telefon raqamni tasdiqlash (OTP code yuboriladi)
    verifyPhone: build.mutation({
      query: (body) => ({
        url: "/identity/verify-phone",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "uz_UZ",
        },
      }),
    }),

    // Tizimga kirish (login)
    loginUser: build.mutation({
      query: (body) => ({
        url: "/identity/login",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "uz_UZ",
        },
      }),
    }),

    // Parolni o‘zgartirish
    changePassword: build.mutation({
      query: (body) => ({
        url: "/identity/change-password",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "uz_UZ",
        },
      }),
    }),

    // Telefon raqamni o‘zgartirishni so‘rash (kod yuboriladi)
    requestChangePhone: build.mutation({
      query: (body) => ({
        url: "/identity/request-change-phone",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "uz_UZ",
        },
      }),
    }),

    // Telefon raqamni yangilash (tasdiqlashdan keyin)
    changePhone: build.mutation({
      query: (body) => ({
        url: "/identity/change-phone",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "uz_UZ",
        },
      }),
    }),
  }),
});

// Hooklarni export qilish
export const {
  useRegisterUserMutation,
  useVerifyPhoneMutation,
  useLoginUserMutation,
  useChangePasswordMutation,
  useRequestChangePhoneMutation,
  useChangePhoneMutation,
} = authApi;
