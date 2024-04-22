import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  Avatar,
  Badge,
  Dropdown,
  Space,
  notification,
} from "antd";
import useSider from "@/hooks/useSider";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../slices/auth.slice";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    localStorage.setItem("token", null);
    notification.success({
      message: "Logout successfully",
      description: "See you again!",
    });
  };
  const {
    token: { colorBgContainer, borderRadiusLG, ...other },
  } = theme.useToken();
  const location = useLocation();

  const siderList = useSider();

  const items = [
    {
      key: '1',
      label: (
        <Button
          type={"dashed"}
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Log out
        </Button>
      ),
    },
    {
      key: '2',
      label: (
        <Link to={"/profile"}>
          <Button>
            <UserOutlined />
            Profile
          </Button>
        </Link>
      ),
    },

  ];
  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            height: "100%",
            padding: "16px",
            flex: 1,
          }}
        >
          <Menu
            style={{
              borderRadius: borderRadiusLG,
              height: "100%",
              boxShadow: other.boxShadow,
              background: other.colorBgBlur,
              color: other.colorTextLightSolid,
            }}
            theme="light"
            mode="vertical"
            selectedKeys={[location.pathname.substring(1)]}
            items={[
              ...siderList.map((item) => {
                return {
                  ...item,
                  key: item.href,
                  label: <Link to={item.href}>{item.label}</Link>,
                };
              }),
            ]}
          />
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 20,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Badge.Ribbon
            color={"pink"}
            text={
              <span
                style={{
                  fontWeight: 600,
                }}
              >
                {user?.userData.fullname}
              </span>
            }
          >
            <Dropdown
              menu={{ items }}
            >
              {user.userData.avatar ?
                (
                  <img src={user.userData.avatar} height={"64px"} width={"64px"} style={{ borderRadius: '50%' }} />
                ) : (
                  <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    style={{
                      marginLeft: "auto",
                    }}
                  />
                )}
            </Dropdown>
          </Badge.Ribbon>
        </Header>
        <Content
          style={{
            display: "flex",
            margin: "16px 16px",
            padding: 12,
            minHeight: 280,
            background: other.colorBorderSecondary,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
