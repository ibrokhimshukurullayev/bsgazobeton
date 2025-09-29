// src/app/profile/components/ProfileLayoutClient.jsx
"use client";

import React from "react";
import ProfileHeaderLink from "./components/ProfileHeaderLink/ProfileHeaderLink";
import ProfileLink from "./components/ProfileLink/ProfileLink";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import "./profile.scss";

const ProfileLayoutClient = ({ children }) => {
  const pathname = usePathname();
  const { t } = useTranslation("global");

  const titles = {
    "/profile": t("profile.personal"),
    "/profile/buyurtmalar": t("profile.orders"),
  };

  const title = titles[pathname] || "Profile";

  return (
    <div id="Profile">
      <ProfileHeaderLink title={title} link={pathname} />
      <div className="Profile container">
        <div className="Profile__right">
          <ProfileLink />
        </div>
        <div className="Profile__left">{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayoutClient;
