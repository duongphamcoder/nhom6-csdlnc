import "./index.js";

import avatar from "./user_image.jpg";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function Profile({ profileUser }) {
  return (
    <>
      <div id="profile_main">
        <div id="profile_header">
          <div
            id="profile_header--img"
            style={{ backgroundImage: `url('${avatar}')` }}
          ></div>
          <div id="profile_header--title">
            <span>
              <span>
                Xin Chào, <span>Dương</span>
              </span>
            </span>
          </div>
        </div>
        <div id="profile_content">
          <table>
            <tbody>
              <tr>
                <td className="profile_content--field">Tên: </td>
                <td>Pham Tan Duong</td>
              </tr>
              <tr>
                <td className="profile_content--field">địa chỉ: </td>
                <td>{profileUser.address}</td>
              </tr>
              <tr>
                <td className="profile_content--field">Email: </td>
                <td>{profileUser.email}</td>
              </tr>
              <tr>
                <td className="profile_content--field">số điện thoại: </td>
                <td>{profileUser.phone}</td>
              </tr>
              <tr>
                <td className="profile_content--field">nick name: </td>
                <td>{profileUser.role}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
