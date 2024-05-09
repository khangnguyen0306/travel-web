import { useMemo } from "react";
import {
  UserOutlined,
  SolutionOutlined,
  FieldTimeOutlined,
  LogoutOutlined,
  ProfileFilled,
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
        icon:<ProfileFilled/>,
        href: `profile/${user?.userData.id}`,
      },
    ];
  }, []);
  return siderList;
};

export default useSider;
