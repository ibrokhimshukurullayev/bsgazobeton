"use client";
import React from "react";
import "./modal.scss";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // modal ichini bosganda yopilmasin
      >
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
