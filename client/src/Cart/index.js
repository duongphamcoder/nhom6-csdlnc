import { useState, useContext, useLayoutEffect } from "react";

import "./css/index.scss";

import { HandleContext } from "../index";
import axioisClient from "../axios";

import empty_cart from "./empty-cart.png";

export default function Cart_Page() {
  // lưu danh sách thông tin các sản phẩm trong giỏ
  const [listPayment, setListPayment] = useState([]);

  // lưu danh sách id nhưng sản phẩm đã thêm vào giỏ
  const [listIdCart, setListIdCart] = useState([]);

  // lưu danh sách những sản phẩm cần thanh toán
  const [listIdPayment, setListIdPayment] = useState([]);
  const { checkLogin, handleDeleteProductFormCart } = useContext(HandleContext);

  useLayoutEffect(() => {
    if (!checkLogin()) {
      window.location.replace("http://localhost:3000");
    } else {
      axioisClient
        .get(`user/carts/${localStorage.getItem("isLogin")}`)
        .then((res) => {
          console.log(res.data);
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
  console.log("listIdPayment", listIdPayment);
  console.log("listPayment", listPayment);
  console.log("listIdCart", listIdCart);
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
                              return listIdPayment.filter(
                                (item) => item !== listIdCart[index]._id
                              );
                            } else {
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
                      onClick={() => {
                        setListPayment((prev) => prev.splice(index, 1));
                        handleDeleteProductFormCart(listIdCart[index]._id);
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
              <span>Tổng tiền: 100$</span>
            </div>
            <div id="cart_payment-btn">
              <span>Thanh Toán</span>
            </div>
          </div>
        </div>
      ) : (
        <h1></h1>
      )}
    </>
  );
}
