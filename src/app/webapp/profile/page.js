"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "./profile.scss";

import settings from "../../../assets/images/webappImages/settings.svg";
import person from "../../../assets/images/webappImages/person.svg";
import cantact from "../../../assets/images/webappImages/cantact.svg";
import manzil from "../../../assets/images/webappImages/manzil.svg";
import language from "../../../assets/images/webappImages/language.svg";
import right from "../../../assets/images/webappImages/right.svg";
import logout from "../../../assets/images/webappImages/logout.svg";
import defaultAvatar from "../../../assets/images/webappImages/profiles.svg";

import { useGetUserInfoQuery } from "../../../context/userApi";

export default function Profile() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data, isLoading, isError } = useGetUserInfoQuery(undefined, {
    skip: !token,
  });

  const user = data?.data;

  const fullName = `${user?.firstname || ""} ${user?.lastname || ""}`.trim();
  const phone = user?.phonenumber || "—";

  const avatar = user?.profileimageurl
    ? user.profileimageurl.startsWith("http")
      ? user.profileimageurl
      : `https://api.bsgazobeton.uz${user.profileimageurl}`
    : defaultAvatar;

  if (isLoading) {
    return (
      <div className="container containers">
        <div className="profile">
          <p>Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container containers">
        <div className="profile">
          <p>Xatolik yuz berdi!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container containers">
      <div className="profile">
        <div className="user-info">
          <div className="user__info__header">
            <h3>Profile</h3>
          </div>

          <div className="user__info__footer">
            <Image
              src={avatar}
              alt="Avatar"
              width={64}
              height={64}
              className="avatar"
            />
            <div className="user__info__footer__end">
              <h4>{fullName || "Ism mavjud emas"}</h4>
              <p>+{phone}</p>
            </div>
          </div>
        </div>

        <div className="menu">
          <div className="menu__hero">
            <Link
              className="menu__hero__link"
              href="/webapp/personalinformation"
            >
              <Image src={person} alt="" width={40} height={40} />
              Shaxsiy ma‘lumotlar
            </Link>
            <Link href="/webapp/personalinformation">
              <Image src={right} alt="" width={18} height={18} />
            </Link>
          </div>

          <div className="menu__hero">
            <Link className="menu__hero__link" href="/webapp/language">
              <Image src={language} alt="" width={40} height={40} />
              Tilni o‘zgartirish
            </Link>
            <Link href="/webapp/language">
              <Image src={right} alt="" width={18} height={18} />
            </Link>
          </div>

          <div className="menu__hero">
            <Link className="menu__hero__link" href="/webapp/contact">
              <Image src={cantact} alt="" width={40} height={40} />
              Biz bilan bog‘lanish
            </Link>
            <Link href="/webapp/contact">
              <Image src={right} alt="" width={18} height={18} />
            </Link>
          </div>

          <div className="menu__hero">
            <Link className="menu__hero__link" href="/webapp/addresses">
              <Image src={manzil} alt="" width={40} height={40} />
              Manzillar
            </Link>
            <Link href="/webapp/addresses">
              <Image src={right} alt="" width={18} height={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
