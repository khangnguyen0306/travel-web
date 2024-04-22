import { useMemo } from "react";
import {
  UserOutlined,
  SolutionOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";

const useSider = () => {
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
    ];
  }, []);
  return siderList;
};

export default useSider;
