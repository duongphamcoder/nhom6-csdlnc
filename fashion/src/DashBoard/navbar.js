import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./navbar.scss";

function Navbar() {
  const [dropDownProduct, setDropDownPr] = useState(false);
  const [dropDownAccount, setDropDownAc] = useState(false);
  console.log("Nav admin re-render");
  return (
    <>
      <div id="admin_navbar">
        <div className="admin_navbar--item">
          <Link to="/admin">
            <span>
              <ion-icon name="timer-outline"></ion-icon> Dashboard
            </span>
          </Link>
        </div>
        <div
          className="admin_navbar--item"
          style={{
            marginBottom: dropDownProduct ? "10px" : "-100px",
          }}
        >
          <label
            onClick={() => {
              setDropDownPr((prev) => !prev);
              setDropDownAc((prev) => {
                if (prev) {
                  return false;
                }
                return prev;
              });
            }}
          >
            <span>
              <ion-icon name="receipt-outline"></ion-icon>Sản phẩm
            </span>
            <div
              className="admin_navbar_icon--drop"
              style={{
                transform: `${dropDownProduct ? "rotate(90deg)" : "none"}`,
              }}
            >
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
          </label>
          <div
            className={`admin_navbar_drop--list ${
              dropDownProduct ? "active" : ""
            }`}
          >
            <Link to="all-product" className="admin_navbar_drop--item ">
              <span>Tất cả sản phẩm</span>
            </Link>
            <Link to="add-product " className="admin_navbar_drop--item">
              <span>Thêm sản phẩm</span>
            </Link>
          </div>
        </div>
        <div
          className="admin_navbar--item"
          style={{
            marginBottom: dropDownAccount ? "10px" : "-100px",
          }}
        >
          <label
            onClick={() => {
              setDropDownAc((prev) => !prev);
              setDropDownPr((prev) => {
                if (prev) {
                  return false;
                }
                return prev;
              });
            }}
          >
            <span>
              <ion-icon name="people-circle-outline"></ion-icon>
              Tài khoản
            </span>
            <div
              className="admin_navbar_icon--drop"
              style={{
                transform: `${dropDownAccount ? "rotate(90deg)" : "none"}`,
              }}
            >
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
          </label>
          <div
            className={`admin_navbar_drop--list ${
              dropDownAccount ? "active" : ""
            }`}
          >
            <Link to="all-user" className="admin_navbar_drop--item ">
              <span>Tất cả tài khoản</span>
            </Link>
            <Link to="" className="admin_navbar_drop--item">
              <span>Thêm tài khoản </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Navbar);
