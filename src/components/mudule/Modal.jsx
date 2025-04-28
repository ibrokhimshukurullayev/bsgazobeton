"use client";

import React, { useEffect } from "react";
import "./modal.scss";
import Button from "../button/Button";

const Modal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="user-modal-backdrop" onClick={onClose}>
      <div className="user-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3>Kirish</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <form className="modal__form" action="">
          <label htmlFor="">Telefon raqamingiz</label>
          <input type="tel" placeholder="+998 (__) ___-__-__" />
          <Button title={"Davom etish"} />
        </form>
        <p>
          Yuborish tugmachasini bosish orqali siz maxfiylik siyosatiga rozilik
          bildirasiz.
        </p>
      </div>
    </div>
  );
};

export default Modal;
