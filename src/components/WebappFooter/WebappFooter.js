"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

// 🔹 Oddiy (kulrang) iconlar
import main from "../../assets/images/webappImages/main.svg";
import cart from "../../assets/images/webappImages/cart.svg";
import order from "../../assets/images/webappImages/order.svg";
import profile from "../../assets/images/webappImages/profile.svg";

// 🔸 Aktiv (qizil) iconlar
import homered from "../../assets/images/webappImages/homered.svg";
import cartred from "../../assets/images/webappImages/cartred.svg";
import ordersred from "../../assets/images/webappImages/ordersred.svg";
import profilered from "../../assets/images/webappImages/profilered.svg";

import "./page.scss";

export default function WebappFooter() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      path: "/webapp/home",
      label: "Main",
      icon: main,
      activeIcon: homered,
    },
    {
      path: "/webapp/cart",
      label: "Cart",
      icon: cart,
      activeIcon: cartred,
    },
    {
      path: "/webapp/orders",
      label: "Orders",
      icon: order,
      activeIcon: ordersred,
    },
    {
      path: "/webapp/profile",
      label: "Profile",
      icon: profile,
      activeIcon: profilered,
    },
  ];

  return (
    <ul className="home__footer__list">
      {navItems.map((item, index) => {
        const isActive = pathname === item.path;
        return (
          <li
            key={index}
            onClick={() => router.push(item.path)}
            className={isActive ? "active" : ""}
          >
            <div className="icon-wrapper">
              <Image
                src={isActive ? item.activeIcon : item.icon}
                alt={item.label}
                width={24}
                height={24}
                className="home__footer__list__img"
              />
            </div>
            <span>{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
