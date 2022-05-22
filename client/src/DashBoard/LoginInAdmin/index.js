import { useState, useContext, memo, useLayoutEffect } from "react";

import "./index.scss";

import keylogo from "./keyLogo.png";

import { HandleContext } from "../../index";

function LoginAdminPage() {
  const [isLogin, setIsLogin] = useState(
    Boolean(localStorage.getItem("isLogin"))
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useContext(HandleContext);

  // không cho truy cập khi đã đăng nhập
  useLayoutEffect(() => {
    if (isLogin) {
      window.location.replace("/admin");
    }
  }, []);

  console.log("Login admin re-render");
  return (
    <>
      {!isLogin && (
        <div id="admin_login--page">
          <div id="admin_login--panel">
            <div
              id="admin_login--logo"
              style={{ backgroundImage: `url('${keylogo}')` }}
            ></div>
            <div id="admin_login--form">
              <div className="admin_login--form-item">
                <label htmlFor="admin_logim--item-username">Username</label>
                <input
                  type="text"
                  id="admin_logim--item-username"
                  autoFocus
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="admin_login--form-item">
                <label htmlFor="admin_logim--item-password">Password</label>
                <input
                  type="password"
                  id="admin_logim--item-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div id="admin_login--subform">
              <button
                id="admin_login--btn"
                onClick={() => {
                  handleLogin(username, password, "ADMIN_ROLE", "/admin");
                }}
              >
                Đăng nhập
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(LoginAdminPage);
