import { useSelector } from "react-redux";
import { selectCurrentUser } from '../../slices/auth.slice';
import "./Header.css";
import { Avatar, Dropdown, Space } from "antd";
// import LogoutButton from "../../../../../Baitap/nhom-1/src/pages/login/LogoutButton";

import { Link } from "react-router-dom";

// import UpdatePassword from "../../../../../Baitap/nhom-1/src/pages/login/UpdatePassword";

const Header = (props) => {
  const user = useSelector(selectCurrentUser);

  return (
    <header className="header">
      <Link className="logo-img">
        <img
          src="https://insacmau.com/wp-content/uploads/2023/02/logo-FPT-Polytechnic-.png"
          alt="Logo"
          height={60}
        />
      </Link>
      <div className="user-space">
        <div className="user-item">
          {user ? (
            <>
              <div className="user-avatar">
                <Avatar
                  size={40}
                  src="https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg"
                />
              </div>
              <div className="user-content">
                <div className="username">{user.username}</div>
              </div>
            </>
          ) : (
            <div className="btn-login">
              <Link to="/login" style={{ textDecoration: "none" }}>
                <div className="login-text">Login</div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
