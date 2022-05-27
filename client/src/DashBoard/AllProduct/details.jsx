import { useState, memo, useContext } from "react";

import { HandleContext } from "../../index";

import "./details.scss";

function Details({ data, handleClose }) {
  const { handleDeleteProduct, handleUpadatePrByAdmin } =
    useContext(HandleContext);

  const [editName, setEditName] = useState(true);
  const [editPrice, setEditPrice] = useState(true);
  const [editDesc, setEditDesc] = useState(true);
  const [editAmount, setEditAmount] = useState(true);

  const [name, setName] = useState(data.name);
  const [price, setPrice] = useState(data.price);
  const [amount, setAmount] = useState(data.amount);
  const [desc, setDesc] = useState(data.desc);

  const [image, setProductImage] = useState(data.image);
  const [imageTemp, setProductImageTemp] = useState();

  const handleOnchangeImage = (e) => {
    const inputFile = document.querySelector("#product_image");
    const file_name = document.querySelector("#file_name");
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProductImage(reader.result);
    };
    setProductImageTemp(file);
  };

  console.log("Admin details-product re-render");
  return (
    <>
      <div id="admin_details-product">
        <div id="admin_details-product-form">
          <div id="admin_details-product-form-close-icon">
            <ion-icon
              name="close"
              onClick={() => {
                handleClose(false);
              }}
            ></ion-icon>
          </div>
          <div id="admin_details-product--list-info">
            <div className="admin_details-product--info-item">
              <label htmlFor="">Tên sản phẩm:</label>
              <input
                type="text"
                disabled={editName}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <div className="admin_details-product--edit-icon">
                <ion-icon
                  name="brush"
                  onClick={() => {
                    setEditName(!editName);
                  }}
                ></ion-icon>
              </div>
            </div>
            <div className="admin_details-product--info-item">
              <label htmlFor="">giá tiền:</label>
              <input
                type="text"
                disabled={editPrice}
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <div className="admin_details-product--edit-icon">
                <ion-icon
                  name="brush"
                  onClick={() => {
                    setEditPrice(!editPrice);
                  }}
                ></ion-icon>
              </div>
            </div>
            <div className="admin_details-product--info-item">
              <label htmlFor="">Số lượng:</label>
              <input
                type="text"
                disabled={editAmount}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              <div className="admin_details-product--edit-icon">
                <ion-icon
                  name="brush"
                  onClick={() => {
                    setEditAmount(!editAmount);
                  }}
                ></ion-icon>
              </div>
            </div>
            <div className="admin_details-product--info-item">
              <label htmlFor="">Mô tả:</label>
              <textarea
                type="text"
                disabled={editDesc}
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              ></textarea>
              <div className="admin_details-product--edit-icon">
                <ion-icon
                  name="brush"
                  onClick={() => {
                    setEditDesc(!editDesc);
                  }}
                ></ion-icon>
              </div>
            </div>
            <div className="admin_details-product--info-item">
              <div id="add_product--form-upload">
                <div id="add_product--form-upload-file">
                  <div
                    id="file_name"
                    style={{ backgroundImage: `url('${image}')` }}
                  ></div>
                  <label htmlFor="product_image">
                    <ion-icon name="cloud-upload-outline"></ion-icon>Chọn ảnh
                  </label>
                  <input
                    type="file"
                    accept=".jpg, .png"
                    id="product_image"
                    onChange={handleOnchangeImage}
                    hidden
                  />
                </div>
              </div>
            </div>
          </div>
          <div id="btn_update-product">
            <button
              id="btn_update-product--detele"
              onClick={() => {
                handleDeleteProduct(data._id);
              }}
            >
              Xóa
            </button>
            <button
              id="btn_update-product--save"
              onClick={() => {
                handleUpadatePrByAdmin({
                  name,
                  price,
                  amount,
                  desc,
                  origin: data.origin,
                  image: imageTemp ? imageTemp : image,
                  classify: data.classify,
                  discount: data.discount,
                  _id: data._id,
                });
              }}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Details);
