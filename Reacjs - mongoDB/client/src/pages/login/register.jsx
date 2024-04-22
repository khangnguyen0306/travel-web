import { Button, Col, DatePicker, Form, Input, Layout, Radio, Row, Space, message } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { validationPatterns } from '../../components/validation';
import { useAddUserMutation } from '../../services/userAPI';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './register.scss'
import imager from '../../assets/signup-image.jpg';

const register = () => {

  const [form] = Form.useForm();
  const [registerUser, isLoading] = useAddUserMutation();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const user = await registerUser(values);
    try {
      console.log(user);
      if (user.data.status == 200) {
        message.success(user.data.message);
        form.resetFields();
        navigate("/login");
      } else {
        message.error(user.error.data.message);
        form.resetFields();
      }
    } catch (error) {
      message.error(user.error.data.message);
    }
  }

  return (
    <Layout style={{ height: '100%' }} className='register-layout'>
      <Header />
      <Row className='row-layout'>
        <Col>
          <div className='content-layout-register'>
            <div className='form-register'>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 className="title-login">Sign Up</h2>
              </div>
              <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                  hasFeedback
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      pattern: validationPatterns.email.pattern,
                      message: validationPatterns.email.message,
                    },
                  ]}
                >
                  <Input type="" placeholder="Email" className="form-input" />
                </Form.Item>
                <Form.Item
                  hasFeedback
                  label="Full name"
                  name="fullname"
                  rules={[
                    {
                      required: true,
                      pattern: validationPatterns.name.pattern,
                      message: validationPatterns.name.message,
                    },
                  ]}
                >
                  <Input type="" placeholder="Full name" className="form-input" />
                </Form.Item>
                <Form.Item
                  hasFeedback
                  label="Phone number"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      pattern: validationPatterns.phoneNumber.pattern,
                      message: validationPatterns.phoneNumber.message,
                    },
                  ]}
                >
                  <Input type="" placeholder="Phone number" className="form-input" />
                </Form.Item>

                <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[{ required: true, message: "Please select gender!" }]}
                >
                  <Radio.Group>
                    <Radio value={true}>Male</Radio>
                    <Radio value={false}>Female</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="DOB"
                  name="DOB"
                  rules={[
                    { required: true, message: "Please select date of birth!" },
                    () => ({
                      validator(_, value) {
                        const selectedYear = value && value.year();
                        const nowYear = new Date().getFullYear();
                        const yearChecked = nowYear - selectedYear;
                        if ((selectedYear && nowYear) && yearChecked >= 18 && yearChecked <= 100) {
                          return Promise.resolve();
                        }
                        else {
                          form.resetFields(['DOB']);
                          if (yearChecked < 18) {
                            message.error("you must 18 year old !!!")
                          }
                          return Promise.reject(new Error("Invalid date of birth!"));
                        }
                      },
                    }),
                  ]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  hasFeedback
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      pattern: validationPatterns.password.pattern,
                      message: validationPatterns.password.message

                    }
                  ]}
                >
                  <Input.Password placeholder="Password" className="form-input"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
                <Form.Item
                  label="Re-Type Password"
                  name="retypePassword"
                  rules={[
                    { required: true, message: 'Please re-type the password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The passwords do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Re-type password"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                <Form.Item>
                  {isLoading ? (
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '2rem' }}>
                      <button
                        type="primary"
                        htmlType="submit"
                        className="submit-btn"
                      >
                        Register
                      </button>

                      <div style={{ marginLeft: '2rem' }}>
                        <span>Already have account</span>
                        <Link to={"/login"}> <u>Login</u></Link>
                      </div>

                    </div>

                  ) : (
                    <Button type='primary' loading>Register</Button>
                  )}
                </Form.Item>
              </Form>
            </div>
            <div className='image-register'>
              <img src={imager} />
            </div>
          </div>
        </Col>
      </Row>
      <Footer />
    </Layout>
  )
}

export default register