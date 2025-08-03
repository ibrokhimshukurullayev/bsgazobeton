"use client";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import "./compareBar.scss";

const CompareBar = () => {
  // const wishlist = useSelector((state) => state.wishlist.value);

  // if (!wishlist.length) return null;

  return (
    <div className="compare__bar">
      <div className="container bar">
        <p>Mahsulotlarni taqqoslashga qo‘shilgan: </p>
        <Link href="/taqqoslash" className="compare__btn">
          Taqqoslashga o‘tish →
        </Link>
      </div>
    </div>
  );
};

export default CompareBar;
