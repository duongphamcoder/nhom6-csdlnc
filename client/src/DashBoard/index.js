import { Outlet } from "react-router-dom";

import Header from "./header";
import Dashboard from "./HomeDashboard";
import Navbar from "./navbar";
import { useEffect, useLayoutEffect, useState } from "react";

export default function AdminPage() {
  const [isLogin, setIsLogin] = useState(
    Boolean(localStorage.getItem("roleLogin") === "ADMIN_ROLE")
  );
  useLayoutEffect(() => {
    if (localStorage.getItem("roleLogin") != "ADMIN_ROLE") {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("roleLogin");
      window.location.assign("http://localhost:3000/admin/login");
    }
  }, []);

  useEffect(() => {
    const admin_header_bar = document.querySelector("#admin_header--bar");
    const admin_bar = document.querySelector("#admin_navbar");
    const admin_content = document.querySelector("#admin_content");
    const style = {
      paddingTop: `${admin_header_bar.offsetHeight}px`,
      paddingLeft: `${admin_header_bar.offsetWidth}px`,
    };
    admin_content.style.paddingTop = `${admin_header_bar.offsetHeight + 20}px`;
    admin_content.style.paddingLeft = `${admin_bar.offsetWidth + 20}px`;
    admin_content.style.paddingRight = `${20}px`;
    admin_content.style.paddingBottom = `${20}px`;
    console.log(admin_header_bar);
    console.log(admin_bar);
    console.log(admin_content);
  }, []);

  console.log("Admin pages re-render");
  return (
    <>
      {isLogin && (
        <div className="admin_main">
          <Header></Header>
          <Navbar></Navbar>
          <div id="admin_content" style={{ height: "100vh" }}>
            <Outlet></Outlet>
          </div>
        </div>
      )}
    </>
  );
}
