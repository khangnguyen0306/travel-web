import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../slices/auth.slice';
import { Avatar, Button, Cascader, DatePicker, Form, Input, InputNumber, Layout, Mentions, Radio, Select, Space, TreeSelect } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import './profile.scss';
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useEditUserMutation } from '../../../services/userAPI';


const profille = () => {
    const user = useSelector(selectCurrentUser);
    const [form] = Form.useForm();
    const [updateUP] = useEditUserMutation();
    useEffect(() => {
        if (user?.userData) {
            form.setFieldsValue({
                id: user.userData.id,
                fullname: user.userData.fullname,
                email: user.userData.email,
                DOB: user.userData.DOB ? dayjs(user.userData.DOB) : null,
                gender: user.userData.gender,
                phoneNumber: user.userData.phoneNumber
            });
        }
    }, [user, form]);
    const [updateUser, setUpdateUser] = useState(false);

    const handleUpdate = () => {
        setUpdateUser(!updateUser);
        console.log("update");
    }
    const updateUserProfile = async (values) => {
        const result = await updateUP(
            {
                body: values,
                id: user.userData.id
            })

            console.log(user.userData.id);
    }
    return (
        <Layout>
            {!updateUser ? (
                <>
                    <Header>
                        <div className='header-user-profile'>
                            <h1 className='header-user-profile-title'>User information</h1>
                            <Button onClick={handleUpdate} type='primary'>Update profile user</Button>
                        </div>
                    </Header>
                    <Content>
                        <div>
                            <p>Avatar: {user.userData.avatar ? (<img src={user.userData.avatar} />) : (

                                <Space direction="vertical" size={16}>
                                    <Space wrap size={16}>
                                        <Avatar size={64} icon={<UserOutlined />} />
                                    </Space>
                                </Space>
                            )}</p>
                            <p> Full name : {user.userData.fullname}</p>
                            <p> Email : {user.userData.email}</p>
                            <p> Gender : {user.userData.fullname == true ? "Male" : "Female"}</p>
                            <p> Day of birth : {(user.userData?.DOB)}</p>                {/* chua chinh */}
                        </div>
                    </Content>
                    <Footer>
                    </Footer>
                </>
            ) : (
                <div>
                    <Form
                        variant="outlined"
                        style={{ maxWidth: 600 }}
                        form={form}
                        name="updateProfile"
                        onFinish={updateUserProfile}
                    >
                        <Form.Item label="full name" name="fullname" rules={[{ required: true, message: 'Please input!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="full name" name="email" rules={[{ required: true, message: 'Please input!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Select"
                            name="gender"
                            rules={[{ required: true, message: 'Please select an option!' }]}
                        >
                            <Radio.Group>
                                <Radio value={true}>Male</Radio>
                                <Radio value={false}>Female</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="DatePicker"
                            name="DOB"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )}
        </Layout>

    )
}

export default profille