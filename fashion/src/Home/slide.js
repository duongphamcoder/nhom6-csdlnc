import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./customSlick.css";
import styles from "./index.module.scss";

export default function Sliders() {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;

    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          right: "50px",
          zIndex: "1",
        }}
        onClick={onClick}
      ></div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    console.log(className);
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          left: "50px",
          zIndex: "1",
          color: "red",
        }}
        onClick={onClick}
      >
        <ion-icon name="arrow-back-outline"></ion-icon>
      </div>
    );
  }

  const [setting, setSetting] = useState({
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    adaptiveHeight: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  });
  return (
    <>
      <div id={styles.slider} className="hidden lg:block">
        <Slider {...setting}>
          <Link to="" className={styles.slide_item}>
            <img
              src="https://m.media-amazon.com/images/S/aplus-media/sota/5ddd2207-a69b-4bdd-aef8-3c0f5fae48b8.__CR0,0,1464,600_PT0_SX1464_V1___.jpg"
              alt=""
            />
          </Link>
          <Link to="" className={styles.slide_item}>
            <img
              src="https://www.wegotsoccer.com/mmwgs/team/landing/new/team-banner-puma.jpg"
              alt=""
            />
          </Link>
          <Link to="" className={styles.slide_item}>
            <img
              src="https://cdn.shopify.com/s/files/1/1880/7069/files/Nike-Main-Banner.jpg?v=1644430644"
              alt=""
            />
          </Link>
        </Slider>
      </div>
    </>
  );
}
