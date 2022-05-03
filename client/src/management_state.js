import axioisClient from "./axios";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

// Xử lý chuyển qua lại giữa login và register
function handleClick(isLoginPage, callback) {
  callback(!isLoginPage);
}

//Xử lý gửi form đăng nhập
function handleLogin(username, password, role = "USER_ROLE", redirect = "/") {
  if (!Boolean(username) || !Boolean(password)) {
    Swal.fire({
      icon: "error",
      text: "Vui lòng nhập đầy đủ thông tin....",
      timer: 1200,
    });
  } else {
    axioisClient
      .post("login", {
        username,
        password,
        role,
      })
      .then((res) => {
        if (res.err) {
          Swal.fire({
            icon: "error",
            text: "Tài khoản hoặc mật khẩu không đúng....",
            timer: 1200,
          });
        } else {
          Swal.fire({
            icon: "success",
            text: "Đăng nhập thành công...",
            timer: 1200,
          });
          setTimeout(() => {
            window.location.assign(`http://localhost:3000${redirect}`);
          }, 1200);
        }
        // console.log(res);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          text: "Chưa thể xử lý....",
          timer: 1200,
        });
      });
  }
}

//Xử lý gửi form đăng ký
function handleRegsiter(
  username,
  password,
  confirmPassword,
  email,
  phone,
  address
) {
  if (
    username === "" ||
    password === "" ||
    confirmPassword === "" ||
    email === "" ||
    phone === "" ||
    address === ""
  ) {
    Swal.fire({
      icon: "error",
      text: "Vui lòng nhập đầy đủ thông tin....",
      timer: 1000,
    });
  } else if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      text: "Xác thực mật khẩu không đúng...",
      timer: 1000,
    });
  } else {
    axioisClient
      .post("register", {
        username,
        password,
        email,
        phone,
        address,
      })
      .then((res) => {
        if (res.err) {
          Swal.fire({
            icon: "error",
            text: "Tài khoản đã tồn tại...",
            timer: 1000,
          });
        } else {
          const time = 1200;
          Swal.fire({
            icon: "success",
            text: "Đăng ký thành công...",
            timer: time,
          });
          setTimeout(() => {
            window.location.assign("http://localhost:3000/");
          }, time);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          text: "Dữ liệu tại chưa được xử lý...",
          timer: 1000,
        });
      });
  }
}

//xử lý thêm vào giỏ hàng
function handle_add_to_cart(user_id, product_id, one_pr_price, amount) {
  axioisClient
    .post("add-to-cart", {
      user_id,
      product_id,
      one_pr_price,
      amount,
    })
    .then((res) => {
      const status = res.status;
      const cart_id = document.querySelector(".cart_id");
      if (status === 0) {
        cart_id.innerHTML = +cart_id.textContent + 1;
      }
      Swal.fire({
        icon: "success",
        text: "Thêm thàng công....",
        timer: 1000,
      });
    });
}

// lấy ra số lượng đơn hàng trong giỏ hàng
function handle_get_size_cart(user_id) {
  axioisClient
    .get(`user/carts/${user_id}`)
    .then((res) => {
      const cart_id = document.querySelector(".cart_id");
      cart_id.innerHTML = res.size;
      console.log(res);
    })
    .catch((error) => {
      console.log("Co loix");
    });
}
export default {
  handleClick,
  handleLogin,
  handleRegsiter,
  handle_add_to_cart,
  handle_get_size_cart,
};
