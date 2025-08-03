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
          "Accept-language": "uz_UZ",
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
          "Accept-language": "uz_UZ",
        },
      }),
    }),

    // Tizimga kirish (login)
    loginUser: build.mutation({
      query: (body) => ({
        url: "/identity/login", // <-- bu endpoint backendga to‘g‘ri bo‘lishi kerak
        method: "POST",
        body,
        headers: {
          "Accept-language": "uz_UZ",
        },
      }),
    }),
  }),
});

// Export qilinayotgan hooklar
export const {
  useRegisterUserMutation,
  useVerifyPhoneMutation,
  useLoginUserMutation, // <-- login uchun hook qo‘shildi
} = authApi;
