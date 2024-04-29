import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Button, Form, Input, Radio, DatePicker, message, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useGetUserByIdQuery, useEditUserMutation } from '../../../services/userAPI';
import "./profile.scss"
const Profile = () => {
    const { userId } = useParams();
    const { data: user, error, isLoading } = useGetUserByIdQuery(userId);
    const [form] = Form.useForm();
    const [updateUser, setUpdateUser] = useState(false);
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

    const updateUserProfile = async (values) => {
        const result = await editUser({
            body: values,
            id: userId
        });
        if (result.data.status == 200) {
            message.success(result.data.message);
            setUpdateUser(false);
        }
    }

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Layout>
            {!updateUser ? (
                <>
                    <Layout.Header>
                        <div className='header-user-profile'>
                            <h1 className='header-user-profile-title'>User information</h1>
                            <Button onClick={handleUpdate} type='primary'>Update profile user</Button>
                        </div>
                    </Layout.Header>
                    <Layout.Content>
                        <p>Avatar: {user.avatar ? (<img width={"90px"} src={user.avatar} alt="User Avatar" />) : (
                            <Avatar size={64} icon={<UserOutlined />} />
                        )}</p>
                        <p> Full name : {user.fullname}</p>
                        <p> Email : {user.email}</p>
                        <p> Gender : {user.gender ? "Male" : "Female"}</p>
                        <p> Day of birth : {dayjs(user.DOB).format('YYYY-MM-DD')}</p>
                    </Layout.Content>
                </>
            ) : (
                <Layout.Content>
                    <Form
                        variant="outlined"
                        style={{ maxWidth: 600 }}
                        form={form}
                        name="updateProfile"
                        onFinish={updateUserProfile}
                    >
                        <Form.Item label="Full name" name="fullname" rules={[{ required: true, message: 'Please input your full name!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select your gender!' }]}>
                            <Radio.Group>
                                <Radio value={true}>Male</Radio>
                                <Radio value={false}>Female</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Date of Birth" name="DOB" rules={[{ required: true, message: 'Please select your date of birth!' }]}>
                            <DatePicker />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                            <Button type="primary" onClick={() => setUpdateUser(false)}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </Layout.Content>
            )}
        </Layout>
    );
}

export default Profile;
