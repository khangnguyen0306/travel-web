import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../slices/auth.slice";
import { useLoginUserMutation } from "../../services/AuthApi";
import { Form, Input, Button, Alert, notification } from "antd";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { LockFilled, LockOutlined, SmileFilled, SmileOutlined, UserOutlined } from "@ant-design/icons";
import cookieParser from "cookie-parser";

const LoginForm = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (values) => {
    try {
      const result = await loginUser({ email: values.email, password: values.password });
      if (result.data && result.data.token) {
        dispatch(setUser(result.data));
        dispatch(setToken(result.data.token));
        localStorage.setItem("token", result.data.token);
        navigate("/");
        notification.success({
          message: "Login successfully",
          description:
            <div>
              Welcome   {result.data.userData.fullname}   <SmileOutlined />
            </div>,
        });
      } else {
        notification.error({
          message: "Login error",
          description: "Invalid email or password. Try again!",
        });
        form.resetFields(); // Xóa dữ liệu trong các ô input
      }
    } catch (error) {
      setError("An error occurred while attempting to log in");
    }
  };

  return (
    <div className="form-container">
      <Form form={form} onFinish={handleSubmit}>
        {error && (
          <>
            <Alert message={error} type="error" showIcon />
            <br />
          </>
        )}
        <Form.Item
          style={{ marginBottom: '2rem' }}
          name="email"
          rules={[
            {
              required: true,
              pattern: /^[\w-]+(\.[\w-]+)*@(gmail\.com|fpt\.edu\.vn)$/,
              message: "Please input valid Email!",
            },
          ]}
        >
          <Input placeholder="   Email" size="large" className="form-input" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="   Password" size="large" className="form-input" prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item>
          <button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="submit-btn"
          >
            Đăng nhập
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
