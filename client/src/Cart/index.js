import { useState, useContext, useLayoutEffect, useRef } from "react";

import "./css/index.scss";

import { HandleContext } from "../index";
import axioisClient from "../axios";

import empty_cart from "./empty-cart.png";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function Cart_Page() {
  const [totalPayment, setTotalPayemt] = useState(0);
  const [str_TotalPayment, setStrTtPayment] = useState("0");

  // lưu danh sách thông tin các sản phẩm trong giỏ
  const [listPayment, setListPayment] = useState([]);

  // lưu danh sách id nhưng sản phẩm đã thêm vào giỏ
  const [listIdCart, setListIdCart] = useState([]);

  // lưu danh sách những sản phẩm cần thanh toán
  const [listIdPayment, setListIdPayment] = useState([]);

  const {
    checkLogin,
    handleDeleteProductFormCart,
    handlePayment,
    handle_get_size_cart,
  } = useContext(HandleContext);

  const handleSums = (money) => {
    const new_money = totalPayment + money;

    let String_Money = "";
    let String_Money_temp = "";
    const temp = "" + new_money;

    let count = 0;
    for (let index = temp.length; index >= 0; index--) {
      String_Money += temp.charAt(index);
      if (count === 3) {
        String_Money += ".";
        count = 0;
      }
      count++;
    }
    for (let index = String_Money.length; index >= 0; index--) {
      String_Money_temp += String_Money.charAt(index);
    }

    setTotalPayemt(new_money);
    setStrTtPayment(String_Money_temp);
  };
  useLayoutEffect(() => {
    if (!checkLogin()) {
      window.location.replace("http://localhost:3000");
    } else {
      axioisClient
        .get(`user/carts/${localStorage.getItem("isLogin")}`)
        .then((res) => {
          setListIdCart(res.data);
          const lists = res.data.map((item) => {
            return axioisClient.get(`/product-by-id/${item.product_id}`);
          });
          Promise.all(lists).then((data) => {
            setListPayment(data);
          });
        })
        .catch((err) => {
          console.log("Co loi phat sinh");
        });
    }
  }, []);

  return (
    <>
      {checkLogin() ? (
        <div id="cart_container">
          <div id="cart_header">
            <div className="cart_header--item c_1">
              <span>Sản phẩm</span>
            </div>
            <div className="cart_header--item c_3">
              <span>Giá </span>
            </div>
            <div className="cart_header--item c_2">
              <span>Số lượng</span>
            </div>
            <div className="cart_header--item c_3">
              <span>Tổng tiền</span>
            </div>
            <div className="cart_header--item c_2"></div>
          </div>
          <div
            id="cart_content"
            style={
              listPayment.length === 0
                ? {
                    backgroundImage: `url('${empty_cart}')`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }
                : {}
            }
          >
            {listPayment.map((item, index) => {
              return (
                <div
                  className="cart_content--item"
                  key={listIdCart[index]._id}
                  id={listIdCart[index]._id}
                >
                  <div className="c_1 cart--temp-cart">
                    <div className="cart_check-payment">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={listIdPayment.includes(listIdCart[index]._id)}
                        onChange={() => {
                          setListIdPayment((prev) => {
                            if (listIdPayment.includes(listIdCart[index]._id)) {
                              handleSums(
                                -listIdCart[index].sum_price.replaceAll(".", "")
                              );
                              return listIdPayment.filter(
                                (item) => item !== listIdCart[index]._id
                              );
                            } else {
                              handleSums(
                                +listIdCart[index].sum_price.replaceAll(".", "")
                              );
                              return [...prev, listIdCart[index]._id];
                            }
                          });
                        }}
                      />
                    </div>

                    <div id="cart_img">
                      <img
                        src={item.data.image}
                        alt=""
                        style={{ display: "block", width: "100%" }}
                      />
                    </div>
                    <span>{item.data.name}</span>
                  </div>
                  <div className="c_3 cart--temp-cart">
                    <span>{item.data.price}đ </span>
                  </div>
                  <div className="c_2 cart--temp-cart">
                    <span>{listIdCart[index].amount}</span>
                  </div>
                  <div className="c_3 cart--temp-cart">
                    <span>{listIdCart[index].sum_price}đ</span>
                  </div>
                  <div className="c_2 cart--temp-cart">
                    <span
                      className="cart_delete--btn"
                      onClick={(e) => {
                        handleDeleteProductFormCart(listIdCart[index]._id);
                        handle_get_size_cart(localStorage.getItem("isLogin"));
                        setListPayment((prev) =>
                          prev.filter((item, indexx) => indexx != index)
                        );
                        setListIdCart((prev) =>
                          prev.filter((item, indexx) => indexx != index)
                        );
                      }}
                    >
                      <ion-icon name="trash"></ion-icon>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div id="cart_payment">
            <div id="cart_total">
              <span>Tổng tiền: {str_TotalPayment}đ</span>
            </div>
            <div id="cart_payment-btn">
              <span
                onClick={() => {
                  if (listIdPayment.length === 0) {
                    Swal.fire({
                      icon: "error",
                      text: "Vui lòng chọn sản phẩm để thanh toán....",
                      timer: 1000,
                    });
                  } else {
                    handlePayment(listIdPayment);
                  }
                }}
              >
                Thanh Toán
              </span>
            </div>
          </div>
        </div>
      ) : (
        <h1></h1>
      )}
    </>
  );
}
