"use client";
import React from "react";
import Image from "next/image";
import "./home.scss";
import main from "../../../assets/images/webappImages/main.svg";
import cart from "../../../assets/images/webappImages/cart.svg";
import order from "../../../assets/images/webappImages/order.svg";
import profile from "../../../assets/images/webappImages/profile.svg";
import logo from "../../../assets/images/webappImages/logo.svg";
import notifacation from "../../../assets/images/webappImages/notifacation.svg";
import card1 from "../../../assets/images/webappImages/card1.svg";
import panel from "../../../assets/images/webappImages/panel.svg";
import kley from "../../../assets/images/webappImages/kley.svg";
import card4 from "../../../assets/images/webappImages/card4.svg";
import rights from "../../../assets/images/webappImages/rights.svg";

const Home = () => {
  return (
    <div className="container">
      <div className="home__header">
        <ul className="home__footer__list">
          <li>
            <Image
              className="home__footer__list__img"
              src={main}
              alt="main"
              width={24}
              height={24}
            />
            <span>Main</span>
          </li>
          <li>
            <Image
              className="home__footer__list__img"
              src={cart}
              alt="cart"
              width={24}
              height={24}
            />
            <span>Cart</span>
          </li>
          <li>
            <Image
              className="home__footer__list__img"
              src={order}
              alt="order"
              width={24}
              height={24}
            />
            <span>Orders</span>
          </li>
          <li>
            <Image
              className="home__footer__list__img"
              src={profile}
              alt="profile"
              width={24}
              height={24}
            />
            <span>Profile</span>
          </li>
        </ul>

        <ul className="home__header__list">
          <li>
            <Image src={logo} alt="logo" width={100} height={40} />
          </li>
          <li>
            <Image
              src={notifacation}
              alt="notifacation"
              width={24}
              height={24}
            />
          </li>
        </ul>

        {/* Product cards */}
        <div className="home__cards">
          <h3 className="home__cards__title">Mahsulotlar</h3>
          <div className="home__box">
            <div className="home__card">
              <Image
                className="home__card__img"
                src={card1}
                alt="card1"
                width={80}
                height={80}
              />
              <p className="home__card__text">Gazobeton bloklari</p>
            </div>
            <div className="home__card">
              <Image
                className="home__card__img"
                src={panel}
                alt="panel"
                width={80}
                height={80}
              />
              <p className="home__card__text">Gazobeton panellari</p>
            </div>
            <div className="home__card">
              <Image
                className="home__card__img"
                src={kley}
                alt="kley"
                width={80}
                height={80}
              />
              <p className="home__card__text">
                Gazoblok <br /> kley
              </p>
            </div>
            <div className="home__card">
              <Image
                className="home__card__img"
                src={card4}
                alt="card4"
                width={80}
                height={80}
              />
              <p className="home__card__text">
                Gazoblok uchun maxsus vositalar
              </p>
            </div>
          </div>
        </div>

        {/* Calculator section */}
        <div className="home__calculator">
          <h3 className="home__calculator__title">Kalkulyator</h3>
          <div className="home__calculator__card">
            <div className="home__calculator__content">
              <h4 className="home__calculator__content__title">
                Gazobloklar sonini bilasizmi?
              </h4>
              <p className="home__calculator__content__text">
                Loyihangiz uchun kerakli gazoblok miqdori va narxini onlayn
                hisoblang!
              </p>
              <div className="home__calculator__card__end">
                <button className="home__calculator__card__button">
                  Hisoblash{" "}
                  <Image src={rights} alt="right" width={16} height={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
