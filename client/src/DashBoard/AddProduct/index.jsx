import { useContext, useState } from "react";
import { HandleContext } from "../../index";
import "./index.scss";
import uploadImage from "./upload.jpg";

export default function AddProduct() {
  const { addProductByAdmin } = useContext(HandleContext);
  const [name, setProductName] = useState("");
  const [price, setProductPrice] = useState("");
  const [amount, setProductAmount] = useState("");
  const [origin, setProductOrigin] = useState("");
  const [classify, setProductClassify] = useState("adidas");
  const [desc, setProductDesc] = useState("");
  const [image, setProductImage] = useState("");

  //xử lý xem hình ảnh trước khi gửi lên server
  const handleOnchangeImage = (e) => {
    const inputFile = document.querySelector("#product_image");
    const file_name = document.querySelector("#file_name");
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProductImage(reader.result);
    };
    const urlImageTemp = URL.createObjectURL(file);
    file_name.style.backgroundImage = `url('${urlImageTemp}')`;
  };

  console.log("add-product re-render");

  return (
    <>
      <div id="add_product--main">
        <div id="add_product--head">
          <h2>Thêm sản phẩm</h2>
        </div>

        <div id="add_product--form">
          <div className="add_product_form--group">
            <div className="add_product--form-item">
              <label htmlFor="product_name">Tên sản phẩm:</label>
              <input
                type="text"
                id="product_name"
                placeholder="Vd: Sản phẩm A"
                value={name}
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
              />
            </div>
            <div className="add_product--form-item">
              <label htmlFor="product_price">Giá sản phẩm:</label>
              <input
                type="text"
                id="product_price"
                placeholder="Vd: 1.500.000"
                value={price}
                onChange={(e) => {
                  // sconsole.log(e.target.value);
                  setProductPrice((prev) => {
                    const temp = prev.replaceAll(".", "");
                    if (
                      temp.length % 3 == 0 &&
                      temp.length != 0 &&
                      e.target.value.length > prev.length &&
                      prev.charAt(prev.length - 1) != "."
                    ) {
                      const newPrice =
                        prev +
                        "." +
                        e.target.value.charAt(e.target.value.length - 1);
                      console.log("chia het:", newPrice);
                      return newPrice;
                    }
                    return e.target.value;
                  });
                }}
              />
            </div>
          </div>

          <div className="add_product_form--group">
            <div className="add_product--form-item">
              <label htmlFor="product_amount">Số lượng:</label>
              <input
                type="text"
                id="product_amount"
                placeholder="Vd: 100"
                value={amount}
                onChange={(e) => {
                  setProductAmount(e.target.value);
                }}
              />
            </div>
            <div className="add_product--form-item">
              <label htmlFor="product_origin">Xuất xứ:</label>
              <input
                type="text"
                id="product_origin"
                placeholder="Vd: Đà Nẵng"
                value={origin}
                onChange={(e) => {
                  setProductOrigin(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="add_product_form--group">
            <div className="add_product--form-item">
              <label htmlFor="product_classNameify">Thương hiệu:</label>
              <select
                name="classNameify"
                id="product_classNameify"
                value={classify}
                onChange={(e) => {
                  setProductClassify(e.target.value);
                }}
              >
                <option value="adidas">Adidas</option>
                <option value="puma">Puma</option>
                <option value="Nike">Nike</option>
              </select>
            </div>
            <div className="add_product--form-item">
              <label htmlFor="product_desc">Chi tiết:</label>

              <textarea
                name="description"
                id="product_desc"
                rows="6"
                placeholder="Vd: Sản phẩm này rất đẹp ..."
                style={{ resize: "none" }}
                value={desc}
                onChange={(e) => {
                  setProductDesc(e.target.value);
                }}
              ></textarea>
            </div>
          </div>

          <div id="add_product--form-upload">
            <div id="add_product--form-upload-file">
              <div
                id="file_name"
                style={{ backgroundImage: `url('${uploadImage}')` }}
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

          <div id="add_product--form-btn">
            <button
              id="add_product--fomr-btn-item"
              onClick={() => {
                addProductByAdmin({
                  name,
                  price,
                  classify,
                  amount,
                  origin,
                  desc,
                  image,
                });
              }}
            >
              Thêm Sản phẩm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
