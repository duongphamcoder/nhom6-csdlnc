import image from "./imgError.jpg";
import "./index.css";
export default function ErrorPage() {
  return <div id="error" style={{ backgroundImage: `url('${image}')` }}></div>;
}
