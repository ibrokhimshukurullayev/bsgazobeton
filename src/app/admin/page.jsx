import Button from "../../components/button/Button";
import React from "react";

const Admin = () => {
  return (
    <div className="admin">
      <form action="" className="admin__form">
        <div className="admin__form__header">
          <div className="admin__form__header__left">
            <label htmlFor="">To’liq ismingiz</label>
            <input type="text" placeholder="Ismingizni kiriting" />
          </div>
          <div className="admin__form__header__right">
            <label htmlFor="">Telefon raqmingiz</label>
            <input type="tel" placeholder="+998 (90)  123-45-67" />
          </div>
        </div>
        <div className="admin__form__end">
          <div className="admin__form__end__left">
            <label htmlFor="">Hudud</label>
            <select name="" id="">
              <option value="">Hududni tanlang...</option>
              <option value="">Tashkent</option>
              <option value="">Jizzax</option>
            </select>
          </div>
          <div className="admin__form__end__right">
            <label htmlFor="">Email</label>
            <input type="email" placeholder="Emailni kiriting" />
          </div>
        </div>
        <div className="admin__form__footer">
          <label htmlFor="">Manzil</label>
          <input type="text" placeholder="Manzil kiriting" />
        </div>
        <Button title={"Saqlash"} />
      </form>
    </div>
  );
};

export default Admin;
