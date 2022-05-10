import { memo, useContext } from "react";

import "./header.scss";

import { HandleContext } from "../index.js";

function Header() {
  const { handleLogout } = useContext(HandleContext);
  console.log("Header admin re-render");
  return (
    <>
      <div id="admin_header--bar">
        <label htmlFor="control_form" id="admin_header--user">
          <div id="admin_header--icon-user">
            <ion-icon name="people-outline"></ion-icon>
          </div>
          <div id="admin_header--icon-down">
            <ion-icon name="caret-down-outline"></ion-icon>
          </div>
          <input type="checkbox" name="" id="control_form" hidden />
          <ul id="admin_header--control">
            <li className="admin_header--control-item">Cài đặt</li>
            <li className="admin_header--control-item">Hoạt động</li>
            <li
              className="admin_header--control-item"
              onClick={() => {
                handleLogout("admin/login");
              }}
            >
              Đăng xuất
            </li>
          </ul>
        </label>
      </div>
    </>
  );
}

export default memo(Header);
