import { useContext, useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import axioisClient from "../axios";
import { HandleContext } from "../index";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import "./details.scss";

export default function Datails() {
  const { handle_add_to_cart } = useContext(HandleContext);
  const [params, setParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  const [product, setProduct] = useState();

  useLayoutEffect(() => {
    axioisClient
      .get(`product-by-id/${params.get("id")}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const hanhdleChangeAmount = (step) => {
    setAmount((prev) => {
      const temp = parseInt(prev) + step;
      if (temp <= 0) {
        return 0;
      } else if (temp > +product.amount) {
        Swal.fire({
          icon: "error",
          text: "Vượt quá số lượng trong kho....",
          timer: 1100,
        });
      }
      return temp;
    });
  };

  return (
    <>
      {!Boolean(product) ? (
        <h1>Loading</h1>
      ) : (
        <div id="details">
          <div id="detail_product-image">
            <img src={product.image} />
          </div>
          <div id="details_info">
            <div id="details_info-name">
              <span> {product.name}</span>
            </div>
            <div id="details_info-price">
              <span>{product.price}đ</span>
            </div>
            <div id="details_info-amount">
              <div>
                <label htmlFor="amount_product">Số lượng</label>
              </div>
              <div id="details_info-amount-item">
                <span
                  onClick={() => {
                    hanhdleChangeAmount(-1);
                  }}
                >
                  <ion-icon name="remove"></ion-icon>
                </span>
                <input
                  type="text"
                  id="amount_product"
                  value={amount}
                  onChange={(e) => {
                    setAmount((prev) => {
                      if (parseInt(prev) < 0) {
                        return 0;
                      }
                      return e.target.value;
                    });
                  }}
                />
                <span
                  onClick={() => {
                    hanhdleChangeAmount(1);
                  }}
                >
                  <ion-icon name="add"></ion-icon>
                </span>
              </div>
            </div>
            <div id="details_info-description">
              <span>{product.desc}</span>
            </div>
            <div id="details_info-btn">
              <span
                onClick={() => {
                  if (amount === 0) {
                    Swal.fire({
                      icon: "error",
                      text: "Vui lòng nhập số lượng",
                      timer: 1100,
                    });
                  } else if (amount > +product.amount) {
                    Swal.fire({
                      icon: "error",
                      text: "Vượt quá số lượng trong kho....",
                      timer: 1100,
                    });
                  } else {
                    handle_add_to_cart(
                      localStorage.getItem("isLogin"),
                      product._id,
                      product.price,
                      amount
                    );
                  }
                }}
              >
                <ion-icon name="cart"></ion-icon>
                Thêm vào giỏ
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
