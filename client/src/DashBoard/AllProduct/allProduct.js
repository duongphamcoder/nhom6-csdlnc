import { useEffect, useLayoutEffect, useState } from "react";

import axiosClient from "../../axios";

import "./index.scss";

function AllProduct() {
  const [listProduct, setListProduct] = useState();
  const [indexPagination, setIndexPagination] = useState(1);

  // thực hiện call API
  useLayoutEffect(() => {
    axiosClient
      .get("admin/all-product")
      .then((res) => {
        setListProduct({
          data: res.data,
          size: res.data.length,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // thực hiện việc tạo số lượng trang
  useEffect(() => {
    const paginationsEl = document.querySelector(
      "#admin_allproduct--pagination"
    );
    if (paginationsEl) {
      paginationsEl.innerHTML = "";
      const paginationSize = Boolean(listProduct)
        ? listProduct.size % 5 === 0
          ? parseInt(listProduct.size / 5)
          : parseInt(listProduct.size / 5 + 1)
        : 0;
      console.log(paginationSize);

      for (let i = 0; i < paginationSize; i++) {
        const button = document.createElement("button");
        button.classList.add("admin_allproduct--pagination-item");
        if (i === 0) {
          button.classList.add("active");
        }
        button.textContent = `${i + 1}`;
        button.addEventListener("click", (e) => {
          const buttonActive = document.querySelector(
            ".admin_allproduct--pagination-item.active"
          );
          buttonActive.classList.remove("active");
          e.target.classList.add("active");
          setIndexPagination(i + 1);
        });
        paginationsEl.appendChild(button);
      }
    }
  }, [listProduct]);

  const handleDeatailProduct = (_id) => {
    console.log(_id);
  };

  return (
    <>
      {Boolean(listProduct) && (
        <div id="admin_allproduct--wrapper">
          <div id="admin_allproduct--head">
            <h2>Tất cả sản phẩm</h2>
          </div>
          <div id="admin_allproduct--content">
            <div>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Tên</th>
                    <th>Mã sản phẩm</th>
                    <th>Kho</th>
                    <th>Giá</th>
                    <th>Xuất xứ</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="admin_allproduct--listproduct">
                  {listProduct.data.map((product, index) => {
                    if (
                      index >= indexPagination * 5 - 5 &&
                      index < indexPagination * 5
                    ) {
                      return (
                        <tr
                          className="admin_allproduct--listproduct-item"
                          key={product._id}
                        >
                          <td className="admin_allproduct--listproduct-item-img">
                            <div
                              className="admin__img"
                              style={{
                                backgroundImage: `url('${product.image}')`,
                              }}
                            ></div>
                          </td>
                          <td className="admin_allproduct--listproduct-item-name">
                            <span>{product.name}</span>
                          </td>
                          <td className="admin_allproduct--listproduct-item-id">
                            <span>{product._id}</span>
                          </td>
                          <td className="admin_allproduct--listproduct-item-warehouse">
                            <span>{product.amount}</span>
                          </td>
                          <td className="admin_allproduct--listproduct-item-price">
                            <span>{product.price}đ</span>
                          </td>
                          <td className="admin_allproduct--listproduct-item-origin">
                            <span>{product.origin}</span>
                          </td>
                          <td className="admin_allproduct--listproduct-item-btn">
                            <button
                              onClick={() => {
                                handleDeatailProduct(product._id);
                              }}
                            >
                              Chi Tiết
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
            <div id="admin_allproduct--pagination"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default AllProduct;
