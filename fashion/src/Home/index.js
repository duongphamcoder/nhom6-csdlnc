import { Link, Outlet } from "react-router-dom";

import Sliders from "./slide";
import FeaturedProduct from "./featured";

export default function Home() {
  return (
    <>
      <Sliders></Sliders>
      <FeaturedProduct> </FeaturedProduct>
    </>
  );
}
