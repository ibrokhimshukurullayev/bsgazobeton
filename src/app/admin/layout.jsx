"use client";
import "./admin.scss";
import AdminGazabetonLink from "./components/adminGazabetonLink/adminGazabetonLink";

export default function AdminLayout({ children }) {
  return (
    <div id="adminGazabeton">
      <div className="adminGazabeton container">
        <div className="adminGazabeton__left">
          <AdminGazabetonLink />
        </div>
        <div className="adminGazabeton__right">{children}</div>
      </div>
    </div>
  );
}
