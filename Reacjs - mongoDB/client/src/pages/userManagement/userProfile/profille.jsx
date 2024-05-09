import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout, Button, Form, Input, Radio, DatePicker, message, Avatar, Row, Col, Card } from 'antd';
import { ManOutlined, UserOutlined, WomanOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useGetUserByIdQuery, useEditUserMutation } from '../../../services/userAPI';
import "./profile.scss"
import UploadWidget from '../../../components/uploadWidget/uploadWidget';
import { validationPatterns } from '../../../components/validation';

const Profile = () => {
    const { userId } = useParams();
    const { data: user, error, isLoading } = useGetUserByIdQuery(userId);
    const [form] = Form.useForm();
    const [updateUser, setUpdateUser] = useState(false);
    const [newAvatar, setNewAvatar] = useState([]);
    const [editUser] = useEditUserMutation();

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                DOB: user.DOB ? dayjs(user.DOB) : null,
                gender: user.gender,
                phoneNumber: user.phoneNumber
            });
        }
    }, [user, form]);

    const handleUpdate = () => {
        setUpdateUser(!updateUser);
    }

    const setAvatar = (imageUrl) => {
        setNewAvatar(imageUrl);
    };

    const updateUserProfile = async (values) => {
        console.log(values)
        const result = await editUser({
            body: { ...values, avatar: newAvatar[0] || user.avatar },
            id: userId
        });
        if (result.data.status === 200) {
            message.success(result.data.message);
            setUpdateUser(false);
        }
    };
    const validateEmail = (rule, value, callback) => {
        if (!value) {
            callback('Please input your email!');
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            callback('Please enter a valid email address!');
        } else {
            callback();
        }
    };
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Layout>
            {!updateUser ? (
                <Row gutter={[16, 16]}>
                    <Col span={17}>
                        <Card title={
                            <div className='profile-information-title'>
                                <p>My account</p>
                                <Button onClick={() => setUpdateUser(true)}>Update profile</Button>
                            </div>
                        }
                            style={{ height: '100%' }}>
                            <div className='profile-information-content'>
                                <h5 className='profile-information-content-subtitle'>USER INFOMATION</h5>
                                <div className='profile-information-content-type'>
                                    <Col span={12}>
                                        <div className='profile-information-content-input' >
                                            <label id='fullname'>Full name</label>
                                            <Input value={user?.fullname} readOnly size='large' name='fullname' />
                                        </div>
                                        <div className='profile-information-content-input'>
                                            <label id='fullname'>Phone number</label>
                                            <Input value={user?.phoneNumber} readOnly size='large' />
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className='profile-information-content-input'>
                                            <label id='fullname'>Email adress</label>
                                            <Input value={user?.email} readOnly size='large' />
                                        </div>
                                        <div className='profile-information-content-input'>
                                            <label id='fullname'>Day of birth</label>
                                            <Input value={dayjs(user?.DOB).format("DD/MM/YYYY")} readOnly size='large' />
                                        </div>
                                    </Col>

                                </div>
                                <h5 className='profile-information-content-subtitle'>CONTACT INFOMATION</h5>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Col span={24} style={{ marginTop: '20px' }}>
                                        <div style={{ width: '100%' }} >
                                            <label id='fullname'>Address</label>
                                            <Input value={user?.fullname} readOnly size='large' name='fullname' />

                                        </div>
                                    </Col>

                                    <Col span={24} >
                                        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
                                            <div className='profile-information-content-input' style={{ marginRight: '50px' }} >
                                                <label id='fullname'>Full name</label>
                                                <Input value={user?.fullname} readOnly size='large' name='fullname' />
                                            </div>
                                            <div className='profile-information-content-input' >
                                                <label id='fullname'>Full name</label>
                                                <Input value={user?.fullname} readOnly size='large' name='fullname' />
                                            </div>
                                        </div>
                                        <Link to={"/createPosts"}>
                                            <Button>Create a new post</Button>
                                        </Link>
                                    </Col>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={7}>
                        <Card style={{ height: '100%' }}>
                            <Col flex={1} style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ textAlign: 'center' }} className='profile-card-user'>
                                    <img
                                        src={user?.avatar} height={"170px"} width={"170px"}
                                        style={{ borderRadius: '50%', display: 'block' }}
                                    />
                                    <h3 className='profile-card-user-name'>{user.fullname}
                                        {user.gender == true ?
                                            <ManOutlined style={{ color: 'blue', marginLeft: '10px' }} /> : <WomanOutlined
                                                style={{ color: 'red', marginLeft: '10px' }} />}
                                    </h3>
                                </div>
                            </Col>

                        </Card>
                    </Col>
                </Row>
            ) : (
                <Form
                    variant="outlined"
                    form={form}
                    name="updateProfile"
                    onFinish={updateUserProfile}
                >
                    <Row gutter={[16, 16]}>
                        <Col span={17}>
                            <Card title={
                                <div className='profile-information-title'>
                                    <p>My account</p>
                                    <Button>Update profile</Button>
                                </div>
                            }
                                style={{ height: '100%' }}>
                                <div className='profile-information-content'>
                                    <h5 className='profile-information-content-subtitle'>USER INFOMATION</h5>
                                    <div className='profile-information-content-type'>
                                        <Col span={12}>
                                            <div className='profile-information-content-input' >
                                                <label id='fullname'>Full name</label>
                                                <Form.Item name="fullname" rules={[
                                                    { required: true, message: 'Please input your full name!' },
                                                    {
                                                        pattern: validationPatterns.name.pattern,
                                                        message: validationPatterns.name.message
                                                    }
                                                ]}>
                                                    <Input />
                                                </Form.Item>
                                            </div>

                                            <div className='profile-information-content-input'>
                                                <label id='phoneNumber'>Phone number</label>
                                                <Form.Item name="phoneNumber"
                                                    rules={[
                                                        { required: true, message: 'Please input your phone number!' },
                                                        {
                                                            pattern: validationPatterns.phoneNumber.pattern,
                                                            message: validationPatterns.phoneNumber.message
                                                        }
                                                    ]}>
                                                    <Input type={Number} />
                                                </Form.Item>
                                            </div>

                                            <div className='profile-information-content-input' style={{ marginTop: '1rem' }}>
                                                <label id='fullname'>Image</label>
                                                <Form.Item >
                                                    <UploadWidget
                                                        uwConfig={{
                                                            cloudName: "dnnvrqoiu",
                                                            uploadPreset: "estate",
                                                            mutiple: false,
                                                            maxImageSize: 2000000,
                                                            folder: "avatars"
                                                        }}
                                                        setState={setAvatar}
                                                    />
                                                </Form.Item>

                                            </div>

                                        </Col>
                                        <Col span={12}>
                                            <div className='profile-information-content-input'>
                                                <label id='fullname'>Email adress</label>
                                                <Form.Item name="email"
                                                    rules={[
                                                        { required: true, message: 'Please input your email!' },
                                                        {
                                                            pattern: validationPatterns.email.pattern,
                                                            message: validationPatterns.email.message
                                                        }
                                                    ]}>
                                                    <Input />
                                                </Form.Item>
                                            </div>
                                            <div>
                                                <label id='fullname'>Day of birth</label>
                                                <Form.Item name="DOB"
                                                    rules={[
                                                        { required: true, message: "Please select user date of birth!" },
                                                        () => ({
                                                            validator(_, value) {
                                                                const selectedYear = value && value.year();
                                                                const currentYear = new Date().getFullYear();
                                                                if (selectedYear && currentYear && currentYear - selectedYear >= 18 && currentYear - selectedYear <= 100) {
                                                                    return Promise.resolve();
                                                                } else {
                                                                    form.resetFields(['DOB']);
                                                                    if ((currentYear - selectedYear < 18)) {
                                                                        message.error("must greater than 18 years old !!!")
                                                                    }
                                                                    return Promise.reject(new Error("Invalid date of birth!"));
                                                                }
                                                            },
                                                        }),
                                                    ]}>
                                                    <DatePicker />
                                                </Form.Item>
                                            </div>
                                            <div className='profile-information-content-input' style={{ marginTop: '1rem' }} >
                                                <label id='gender'>Gender</label>
                                                <Form.Item name="gender" rules={[{ required: true, message: 'Please select your gender!' }]}>
                                                    <Radio.Group>
                                                        <Radio value={true}>Male</Radio>
                                                        <Radio value={false}>Female</Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                            </div>

                                            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                                <Button type="primary" htmlType="submit" style={{ marginRight: '20px' }}>
                                                    Save
                                                </Button>
                                                <Button type="primary" onClick={() => setUpdateUser(false)}>
                                                    Cancel
                                                </Button>
                                            </Form.Item>
                                        </Col>

                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={7}>
                            <Card style={{ height: '100%' }}>
                                <Col flex={1} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <img
                                            src={newAvatar[0] || user?.avatar} height={"170px"} width={"170px"}
                                            style={{ borderRadius: '50%', display: 'block' }}
                                        />
                                        <h3>{user.fullname}</h3>
                                    </div>
                                </Col>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            )}
        </Layout>
    );
}

export default Profile;






