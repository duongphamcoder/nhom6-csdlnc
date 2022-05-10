import { memo, useEffect, useState } from "react";

import "./index.scss";

let all_product = [];

for (let i = 0; i < 21; i++) {
  all_product = [
    ...all_product,
    {
      name: "tên sản phẩm q q q q q q q qq q q q q q q q  q q q",
      price: `giá sản phẩm ${i + 1}`,
      discount: "giảm giá (%)",
      desc: "mô tả sản phẩm",
      origin: "xuất xứ sản phẩm",
    },
  ];
}

function AllProduct() {
  const [entries, setEntries] = useState(5);
  const [pagination, setPagination] = useState(
    all_product.length % entries === 0
      ? parseInt(all_product.length / entries)
      : parseInt(all_product.length / entries) + 1
  );
  const [indexPagin, setIndexPagin] = useState(1);
  console.log("All product re-render");

  useEffect(() => {
    const pagination_class = document.getElementById(
      "admin_dashboard--table-item-pagination"
    );
    pagination_class.innerHTML = "";
    for (let index = 0; index < pagination; index++) {
      const element = document.createElement("button");
      element.classList.add("admin_dashboard--table-pagination-btn");
      if (index + 1 === indexPagin) {
        element.classList.add("active");
      }
      element.innerText = `${index + 1}`;
      element.addEventListener("click", () => {
        setIndexPagin(index + 1);
      });
      pagination_class.appendChild(element);
    }
  }, [entries, indexPagin, indexPagin]);
  return (
    <>
      <div id="admin_dashboard--all-product">
        <h1>Tất cả sản phẩm</h1>
        <div id="admin_dashboard--table-product">
          <div id="admin_dashboard--table-title">
            <span>
              <ion-icon name="list"></ion-icon> Bảng sản phẩm
            </span>
          </div>
          <div id="admin_dashboard--table-item">
            <div id="admin_dashboard--table-entries-per-page">
              <label htmlFor="entries">Chọn số mục muốn xem: </label>
              <select
                name="entries"
                id="entries"
                onChange={(e) => {
                  setEntries(+e.target.value);
                  setPagination(
                    all_product.length % +e.target.value === 0
                      ? parseInt(all_product.length / +e.target.value)
                      : parseInt(all_product.length / +e.target.value) + 1
                  );

                  // kiểm tra xem vị trí trang hiện tại có lớn hơn số trang hay không
                  if (
                    (all_product.length % +e.target.value === 0
                      ? parseInt(all_product.length / +e.target.value)
                      : parseInt(all_product.length / +e.target.value) + 1) <
                    indexPagin
                  ) {
                    setIndexPagin(1);
                  }
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <div id="admin_dashboard--table-item-product">
              <table>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Giá tiền</th>
                  <th>Giảm giá %</th>
                  <th>Mô tả</th>
                  <th>Xuất xứ</th>
                  <th></th>
                </tr>

                {all_product.map((item, index) => {
                  if (
                    index >= entries * indexPagin - entries &&
                    index < entries * indexPagin
                  ) {
                    return (
                      <>
                        <tr>
                          <td>
                            <span>{item.name}</span>
                          </td>
                          <td>{item.price}</td>
                          <td>{item.discount}</td>
                          <td>{item.desc}</td>
                          <td>{item.origin}</td>
                          <td>
                            <div className="admin_dashboard--table-edit-product">
                              <button>Xóa</button>
                              <button>Sửa</button>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  }
                })}
              </table>
            </div>
            <div id="admin_dashboard--table-item-pagination"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(AllProduct);
