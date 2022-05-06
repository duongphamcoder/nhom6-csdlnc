import { NavLink } from "react-router-dom";

import { useContext, useLayoutEffect, useState } from "react";
import axiosClient from "../axios";

import "./index.scss";

import Profile from "./profile";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import { HandleContext } from "../index";
export default function UserProfile() {
  const { checkLogin } = useContext(HandleContext);
  const [profileUser, setProfileUser] = useState({});

  useLayoutEffect(() => {
    if (!checkLogin()) {
      window.location.replace("http://localhost:3000");
    } else {
      axiosClient.get("user/profile").then((res) => {
        // console.log(res.data);
        setProfileUser(res.data);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    Swal.fire({
      icon: "success",
      text: "Đăng xuất thành công...",
      timer: 1000,
    });

    setTimeout(() => {
      window.location.replace("http://localhost:3000");
    }, 1010);
  };
  return (
    <>
      <div id="user_profile--main">
        <div id="user_profile--nav">
          <NavLink to="/user/profile" className="user_profile--nav-item active">
            <ion-icon name="document"></ion-icon>
            <span>Thông tin</span>
          </NavLink>
          <div className="user_profile--nav-item" onClick={handleLogout}>
            <ion-icon name="log-out"></ion-icon>
            <span>Đăng xuất</span>
          </div>
        </div>
        <Profile profileUser={profileUser}></Profile>
      </div>
    </>
  );
}
