"use client";
import "./admin.scss";
import AdminGazobetonLink from "./_components/admin-gazobeton-link/AdminGazobetonLink";

export default function AdminLayout({ children }) {
  return (
    <div id="adminGazobeton">
      <div className="adminGazobeton container">
        <div className="adminGazobeton__left">
          <AdminGazobetonLink />
        </div>
        <div className="adminGazobeton__right">{children}</div>
      </div>
    </div>
  );
}
