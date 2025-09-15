"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetUserInfoQuery } from "../../context/userApi";
import "./profile.scss";
import Loading from "../../components/loading/Loading";

export default function ProfilePage() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  const { data, isLoading, error } = useGetUserInfoQuery(undefined, {
    skip: !token,
  });

  if (!token) return <div>Yuborilmoqda...</div>;
  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Xatolik yuz berdi</div>;

  const user = data?.data;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-avatar">
          <span>{user.firstname[0]}</span>
        </div>
        <div className="profile-info">
          <h2>Shaxsiy kabinet</h2>
          <p>
            <strong>Ism:</strong> {user.firstname}
          </p>
          <p>
            <strong>Familiya:</strong> {user.lastname}
          </p>
          <p>
            <strong>Telefon:</strong> +{user.phonenumber}
          </p>
        </div>
        {/* <div className="button">
          <button>Edit</button>
        </div> */}
      </div>
    </div>
  );
}
