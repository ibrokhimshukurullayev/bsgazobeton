"use client";
import React, { useState } from "react";
import "./sotuv.scss";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCreateContactMutation } from "../../context/contactApi";

import instagram from "../../assets/images/social/intagram.svg";
import facebook from "../../assets/images/social/facebook.svg";
import youtube from "../../assets/images/social/youtube.svg";
import telegram from "../../assets/images/social/telegram.svg";

const Joylashuv = () => {
  const [t] = useTranslation("global");
  const [createContact, { isLoading }] = useCreateContactMutation();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phoneNumber || !formData.message) {
      toast.error(t("notifications.fillAllFields"));
      return;
    }

    try {
      await createContact(formData).unwrap();
      toast.success(t("notifications.success"));
      setFormData({ fullName: "", phoneNumber: "", message: "" });
    } catch (err) {
      toast.error(t("notifications.error"));
      console.error(err);
    }
  };

  return (
    <div className="contacts container">
      <div className="cantact">
        <div className="cantact__left">
          <div className="cantact__phone">
            <h3>{t("footer.telefon")}</h3>
            <a href="tel:+998991502222">+998 (99) 150-22-22</a>
            <a href="tel:+998712001022">+998 (71) 200-10-22</a>
            <p>{t("cantact.title1")}</p>
          </div>
          <div className="cantact__email">
            <h3>{t("footer.email")}</h3>
            <a href="mailto:info@bsgroup.uz">info@bsgroup.uz</a>
          </div>
          <div className="cantact__ofis">
            <h3>{t("footer.manzil")}</h3>
            <p>{t("footer.manjil1")}</p>
          </div>
          <div className="cantact__social">
            <a href="https://www.instagram.com/bs_gazobeton/" target="_blank">
              <Image src={instagram} alt="instagram" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61575359537252"
              target="_blank"
            >
              <Image src={facebook} alt="facebook" />
            </a>
            <a href="https://t.me/bsgazobeton_uz" target="_blank">
              <Image src={telegram} alt="telegram" />
            </a>
            <a href="https://www.youtube.com/@bsgazobeton" target="_blank">
              <Image src={youtube} alt="youtube" />
            </a>
          </div>
        </div>

        <div className="cantact__right">
          <form onSubmit={handleSubmit}>
            <h3>{t("cantact.formtitle1")}</h3>
            <input
              type="text"
              placeholder={t("cantact.input1")}
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <input
              type="tel"
              placeholder={t("cantact.input2")}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder={t("cantact.input3")}
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button type="submit" disabled={isLoading}>
              {isLoading ? t("common.loading") : t("cantact.button")}
            </button>
            <p>{t("cantact.formtitle2")}</p>
          </form>
        </div>
      </div>

      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3016.0198743192645!2d68.65991657222736!3d40.89337892939775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38adc398cd5d93d5%3A0xa4fc855136c750b!2sBS%20GAZOBLOK!5e0!3m2!1sen!2s!4v1759859014684!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Joylashuv;
