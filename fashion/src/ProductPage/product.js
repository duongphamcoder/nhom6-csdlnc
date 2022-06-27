import axioisClient from "../axios";
import { useEffect, useLayoutEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

export default function Children() {
  const { slug } = useParams();
  const [list_product, setList_product] = useState();

  // gọi api để lấy dữ liệu cho việc render
  useLayoutEffect(() => {
    axioisClient.get(`/san-pham/${slug}`).then((res) => {
      console.log(res);
      setList_product(res);
    });
  }, [slug]);
  return (
    <>
      {!Boolean(list_product) ? (
        <h1>Loading</h1>
      ) : (
        <div id="list_product">
          <div className="product_item">
            {list_product.data.map((item) => {
              return (
                <Link
                  to={`details?id=${item._id}`}
                  className="items"
                  key={item._id}
                  title={item.name}
                >
                  <div
                    className="image"
                    style={{
                      backgroundImage: `url('${item.image}')`,
                    }}
                  ></div>
                  <div className="product_information">
                    <div className="product_name">
                      <span>{item.name}</span>
                    </div>
                    <div className="product_price">
                      <span>{item.price}đ</span>
                    </div>
                  </div>
                  <div className="details_btn">
                    <span>Chi tiết</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
