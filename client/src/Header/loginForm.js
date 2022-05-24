import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

import { HandleContext } from "../index";

// Thư viện hiển thị thông báo

export default function LoginPage({ ischeck }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleClick, handleLogin } = useContext(HandleContext);

  // Xử lý click submit form
  useEffect(() => {
    const btn_sub = document.querySelector(`#${styles.btn_sub}`);
    const redirect = window.location.href;
    btn_sub.onclick = () => {
      handleLogin(username, password, "USER_ROLE", redirect);
    };
    console.log(redirect);
  }, [username, password]);

  //Xử lý nút chuyển sang login pages
  useEffect(() => {
    const temp = document.querySelector(`#${styles.create_accout}`);
    temp.addEventListener("click", () => {
      handleClick(ischeck.isloginPage, ischeck.setIsLoginPage);
    });
  }, []);

  return (
    <>
      <div className={styles.form_item}>
        <div className="">
          <div id={styles.title_form}>
            <span>Đăng Nhập</span>
          </div>
          <div id={styles.sub_form}>
            <div className={styles.sub_form_item}>
              <div className={styles.icon}>
                <ion-icon name="mail-outline"></ion-icon>
              </div>
              <input
                type="text"
                placeholder="Tài khoản..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.sub_form_item}>
              <div className={styles.icon}>
                <ion-icon name="key-outline"></ion-icon>
              </div>
              <input
                type="password"
                value={password}
                placeholder="Mật khẩu..."
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div
            id={styles.btn_sub}
            // onClick={() =>
            //   // handleLogin(username, password, "USER_ROLE", window.location.href)
            // }
          >
            <span>Đăng nhập</span>
          </div>
          <div id={styles.forgot_password}>
            <span>
              Quên <Link to="">Tài Khoản / Mật Khẩu ?</Link>
            </span>
          </div>
          <div id={styles.create_accout}>
            <span>
              Đăng ký nếu bạn chưa có
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
