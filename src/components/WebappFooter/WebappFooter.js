"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation"; // ✅ usePathname qo‘shildi
import main from "../../assets/images/webappImages/main.svg";
import cart from "../../assets/images/webappImages/cart.svg";
import order from "../../assets/images/webappImages/order.svg";
import profile from "../../assets/images/webappImages/profile.svg";
import "./page.scss";

export default function WebappFooter() {
  const router = useRouter();
  const pathname = usePathname(); // ✅ hozirgi sahifani olish

  const navItems = [
    { path: "/webapp/home", label: "Main", icon: main },
    { path: "/webapp/cart", label: "Cart", icon: cart },
    { path: "/webapp/orders", label: "Orders", icon: order },
    { path: "/webapp/profile", label: "Profile", icon: profile },
  ];

  return (
    <ul className="home__footer__list">
      {navItems.map((item, index) => {
        const isActive = pathname === item.path; // ✅ active holat
        return (
          <li
            key={index}
            onClick={() => router.push(item.path)}
            className={isActive ? "active" : ""}
          >
            <Image
              src={item.icon}
              alt={item.label}
              width={24}
              height={24}
              className="home__footer__list__img"
              style={{
                filter: isActive
                  ? "invert(28%) sepia(95%) saturate(5951%) hue-rotate(355deg) brightness(96%) contrast(97%)"
                  : "none",
              }}
            />
            <span>{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
