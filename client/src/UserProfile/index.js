import { NavLink } from "react-router-dom";

import { useContext, useLayoutEffect, useState } from "react";
import axiosClient from "../axios";

import "./index.scss";

import Profile from "./profile";

import { HandleContext } from "../index";
export default function UserProfile() {
  const { checkLogin, handleLogout } = useContext(HandleContext);
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

  return (
    <>
      <div id="user_profile--main">
        <div id="user_profile--nav">
          <NavLink to="/user/profile" className="user_profile--nav-item active">
            <ion-icon name="document"></ion-icon>
            <span>Thông tin</span>
          </NavLink>
          <div
            className="user_profile--nav-item"
            onClick={() => {
              handleLogout("");
            }}
          >
            <ion-icon name="log-out"></ion-icon>
            <span>Đăng xuất</span>
          </div>
        </div>
        <Profile profileUser={profileUser}></Profile>
      </div>
    </>
  );
}
