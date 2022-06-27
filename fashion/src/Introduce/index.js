import { useEffect } from "react";

import styles from "./index.module.scss";

import { member_information } from "../fakeAPI";

export default function Introduce() {
  function slide(left, right) {}

  useEffect(() => {
    const listItem_left = document.querySelectorAll(`.left`);
    const listItem_right = document.querySelectorAll(`.right`);
    document.onscroll = () => {
      const indexScroll = parseInt(window.scrollY);
      listItem_left.forEach((item) => {
        if (item.offsetTop < indexScroll + 500) {
          item.classList.add(`${styles.slide_in_right}`);
        }
      });
      listItem_right.forEach((item) => {
        if (item.offsetTop < indexScroll + 500) {
          item.classList.add(`${styles.slide_in_left}`);
        }
      });
    };
  }, []);

  return (
    <>
      <div className="" style={{ padding: "20px 0" }}>
        <div
          className={`${styles.introduce_content}  ${styles.gradually_clear}`}
        >
          <div id={styles.shop_name}>
            <h1>Sáu Lục Six.</h1>
          </div>
          <div id={styles.slogan}>
            <p>
              Chúng tôi biết rằng trong COVID-19, rất nhiều người dân xung quanh
              thành phố đang cảm thấy lo lắng về tương lai - chúng tôi cũng
              không chắc tương lai sẽ ra sao.
            </p>
            <p>
              Điều đó nói lên rằng: chúng tôi biết rằng chúng tôi muốn đảm bảo
              rằng bạn có trang bị cần thiết cho cuộc sống hằng ngày của mình và
              chúng tôi sẽ tiếp tục làm điều đó - cùng với nhóm của chúng tôi -
              cho đến khi thành phố cho chúng tôi biết là chúng tôi không thể.
            </p>
            <p>
              Nhưng miễn là những người như bạn ủng hộ các doanh nghiệp nhỏ xung
              quanh thành phố, thì chúng tôi sẽ ở đây - hàng ngày, đảm bảo đơn
              đặt hàng của bạn đến đúng giờ.
            </p>
            <p>
              --------------------------------------------------------------------
            </p>
          </div>
        </div>

        <div
          className=""
          style={{
            textAlign: "center",
            paddingBottom: "50px",
            textDecoration: "underline",
            textTransform: "uppercase",
            fontSize: "20px",
          }}
        >
          <h2>Một Số Thông Tin Về Thành Viên</h2>
        </div>

        {member_information.data.map((item, index) => {
          if (index % 2 === 0) {
            return (
              <div
                className={`${styles.common} ${styles.member_l} left`}
                key={index}
              >
                <div
                  className={styles.image_member}
                  style={{
                    backgroundImage: `url('${item.image}')`,
                  }}
                ></div>
                <div className={styles.personal_information}>
                  <div className={styles.member_name}>
                    <h2>{item.name}</h2>
                  </div>
                  <div className={styles.information}>
                    <span>{item.information}</span>
                  </div>
                  <div className={styles.contact}>
                    <h4>Thông tin liên hệ</h4>
                    <span>Email:{item.email}</span>
                    <br />
                    <span>Phone Number: {item.phoneNumber}</span>
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div
              className={`${styles.common} ${styles.member_r}  right`}
              key={index}
            >
              <div className={styles.personal_information}>
                <div className={styles.member_name}>
                  <h2>{item.name}</h2>
                </div>
                <div className={styles.information}>
                  <span>{item.information}</span>
                </div>
                <div className={styles.contact}>
                  <h4>Thông tin liên hệ</h4>
                  <span>Email: {item.email}</span>
                  <br />
                  <span>Phone Number: {item.phoneNumber}</span>
                </div>
              </div>
              <div
                className={styles.image_member}
                style={{
                  backgroundImage: `url('${item.image}')`,
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </>
  );
}
