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
  Modal,
} from "antd";
import useSider from "@/hooks/useSider";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../slices/auth.slice";
import { useGetUserByIdQuery } from "../services/userAPI";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const user = useSelector(selectCurrentUser);
  const { data: users, error, isLoading } = useGetUserByIdQuery(user.userData.id);
  const location = useLocation();
  const siderList = useSider();
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG, ...other },
  } = theme.useToken();


  const handleOpenModal = () => {
    setOpenModal(true);
  }
  const handleCancel = () => {
    setOpenModal(false);
  }


  const handleOk = () => {
    dispatch(logOut());
    localStorage.setItem("token", null);
    notification.success({
      message: "Logout successfully",
      description: "See you again!",
    });
  };

  if (isLoading) {
    <h1>Loading</h1>
  }
  return (
    <Layout
      style={{
        height: "fit-content",
        minHeight:'100vh'
      }}
    >
      <Sider trigger={Sider} collapsed={collapsed} width={"fit-content"}>
        <div
        style={{
          height: "100%",
          padding: "20px",
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
              padding: '5px 0'
            }}
            theme="light"
            mode="inline"
            selectedKeys={[location.pathname.substring(1)]}
            defaultSelectedKeys={['1']}
            items={[
              ...siderList.map((item) => {
                return {
                  ...item,
                  key: item.href,
                  label:
                    <Link to={item.href}>{item.label}</Link>
                };
              })]}
          >

          </Menu>
          <div style={{ height: "fit-content" }}>
            <Button onClick={handleOpenModal}>Logout</Button>
            <Modal
              title="Are you sure to logout?"
              visible={openModal}
              onOk={handleOk}
              onCancel={handleCancel}
            // okText="Yes"
            // cancelText="No"
            />
          </div>
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

          <Link
            to={`profile/${user.userData.id}`}
          >
            {users?.avatar ?
              (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={users?.avatar} height={"50px"} width={"50px"} style={{ borderRadius: '50%' }} />
                </div>
              ) : (
                <Avatar
                  size="large"
                  icon={<UserOutlined />}
                  style={{
                    marginLeft: "auto",
                  }}
                />
              )}
          </Link>
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
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
