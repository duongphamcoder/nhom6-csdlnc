import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

import { HandleContext } from "../index";

export default function RegisterPage({ ischeck }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { handleClick, handleRegsiter } = useContext(HandleContext);

  // Xử lý click submit form
  useEffect(() => {
    const btn_sub = document.querySelector(`#${styles.btn_sub}`);
    btn_sub.onclick = () => {
      handleRegsiter(
        username,
        password,
        confirmPassword,
        email,
        phone,
        address
      );
    };
  }, [username, password, confirmPassword, email, phone, address]);

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
            <span>Đăng Ký</span>
          </div>
          <div id={styles.sub_form}>
            <div className={styles.sub_form_item}>
              <div className={styles.icon}>
                <ion-icon name="people-outline"></ion-icon>
              </div>
              <input
                type="text"
                placeholder="Tài khoản..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
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
                required
              />
            </div>
            <div className={styles.sub_form_item}>
              <div className={styles.icon}>
                <ion-icon name="key-outline"></ion-icon>
              </div>
              <input
                type="password"
                value={confirmPassword}
                placeholder="Nhập lại mật khẩu..."
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
              />
            </div>
            <div className={styles.sub_form_item}>
              <div className={styles.icon}>
                <ion-icon name="mail-outline"></ion-icon>
              </div>
              <input
                type="text"
                value={email}
                placeholder="Email..."
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className={styles.sub_form_item}>
              <div className={styles.icon}>
                <ion-icon name="call-outline"></ion-icon>
              </div>
              <input
                type="text"
                value={phone}
                placeholder="Số điện thoại..."
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                required
              />
            </div>
            <div className={styles.sub_form_item}>
              <div className={styles.icon}>
                <ion-icon name="home-outline"></ion-icon>
              </div>
              <input
                type="text"
                value={address}
                placeholder="Địa chỉ..."
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div id={styles.btn_sub} onClick={() => console.log(123)}>
            <span>Đăng ký</span>
          </div>
          <div id={styles.forgot_password}>
            <span>{/* Quên <Link to="">Tài Khoản / Mật Khẩu ?</Link> */}</span>
          </div>
          <div id={styles.create_accout}>
            <span>
              Đăng nhập nếu bạn đã có
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
