import { useMemo } from "react";
import {
  UserOutlined,
  SolutionOutlined,
  FieldTimeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../slices/auth.slice";
import './useSider.scss'
const useSider = () => {
  const user = useSelector(selectCurrentUser)

  const siderList = useMemo(() => {
    return [
      {
        label: "Admin",
        icon: <UserOutlined />,
        href: "admin",
      },
      {
        label: "Dashboard",
        icon: <SolutionOutlined />,
        href: "/",
      },
      {
        label: "Home",
        icon: <FieldTimeOutlined />,
        href: "home",
      },
      {
        label: <div className="useSider-profile-layout">
          <h4>{user?.userData.fullname}</h4>
        </div>,
        icon: <img height={"40px"} width={"40px"} 
        src={user?.userData.avatar} 
        style={{marginLeft:'-12px',borderRadius:'50%'}}/> ,
        href: `profile/${user?.userData.id}`,
      },
    ];
  }, []);
  return siderList;
};

export default useSider;
