import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Row, Col, Button, message } from 'antd';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import "./createPost.scss"
import UploadWidget from '../../../components/uploadWidget/uploadWidget';
import { useAddPostsMutation } from '../../../services/PostsAPI';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const CreatePost = () => {
    const VietnameseProvinces = [
        "An Giang",
        "Bà Rịa - Vũng Tàu",
        "Bắc Giang",
        "Bắc Kạn",
        "Bạc Liêu",
        "Bắc Ninh",
        "Bến Tre",
        "Bình Định",
        "Bình Dương",
        "Bình Phước",
        "Bình Thuận",
        "Cà Mau",
        "Cao Bằng",
        "Đắk Lắk",
        "Đắk Nông",
        "Điện Biên",
        "Đồng Nai",
        "Đồng Tháp",
        "Gia Lai",
        "Hà Giang",
        "Hà Nam",
        "Hà Tĩnh",
        "Hải Dương",
        "Hậu Giang",
        "Hòa Bình",
        "Hưng Yên",
        "Khánh Hòa",
        "Kiên Giang",
        "Kon Tum",
        "Lai Châu",
        "Lâm Đồng",
        "Lạng Sơn",
        "Lào Cai",
        "Long An",
        "Nam Định",
        "Nghệ An",
        "Ninh Bình",
        "Ninh Thuận",
        "Phú Thọ",
        "Quảng Bình",
        "Quảng Nam",
        "Quảng Ngãi",
        "Quảng Ninh",
        "Quảng Trị",
        "Sóc Trăng",
        "Sơn La",
        "Tây Ninh",
        "Thái Bình",
        "Thái Nguyên",
        "Thanh Hóa",
        "Thừa Thiên Huế",
        "Tiền Giang",
        "Trà Vinh",
        "Tuyên Quang",
        "Vĩnh Long",
        "Vĩnh Phúc",
        "Yên Bái",
        "Phú Yên",
        "Cần Thơ",
        "Đà Nẵng",
        "Hải Phòng",
        "Hà Nội",
        "TP Hồ Chí Minh"
    ];
    const [form] = Form.useForm();
    const [value, setValue] = useState("");
    const [addPost] = useAddPostsMutation();
    const [image, setImage] = useState([]);
    const navigate = useNavigate()
    const handleImageChange = (value) => {
        setImage(value);
    }
    const handleDeleteImage = (index) => {
        const newImageArray = [...image];
        newImageArray.splice(index, 1);
        setImage(newImageArray);
    };

    const handleCreatePost = async (value) => {
        console.log(value);
        try {
            const post = await addPost({
                postData: {
                    title: value.title,
                    price: value.price,
                    image: image,
                    address: value.address,
                    city: value.city,
                    bedroom: value.bedroom,
                    bathroom: value.bathroom,
                    latitude: value.latitude,
                    longitude: value.longitude,
                    type: value.type,
                    property: value.property
                },
                postDetail: {
                    desc: value.desc,
                    utilities: value.utilities,
                    pet: value.pet,
                    income: value.income,
                    size: value.size,
                    school: value.school,
                    bus: value.bus,
                    restaurant: value.restaurant
                }
            })
            console.log(post);
            if(post.data.status === 201) {
                form.resetFields();
                message.success(post.data.message);
                navigate('/home');
            }else{
                message.success(post.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div style={{ width: '70%' }}>
            <Form
                initialValues={{ type: 'rent', property: 'apartment' }}
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
                onFinish={handleCreatePost}
            >
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price!' }]}>
                            <InputNumber style={{ width: '100%' }} suffix="VND" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input the address!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item name="city" label="City" rules={[{ required: true, message: 'Please select the city!' }]}>
                            <Select
                                showSearch
                                style={{
                                    width: 200,
                                }}
                                placeholder="Select a province"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.children ?? '').toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                filterSort={(optionA, optionB) => optionA.children.localeCompare(optionB.children)}
                            >
                                {VietnameseProvinces.map((province, index) => (
                                    <Option key={index} value={province}>
                                        {province}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="bedroom" label="Bedroom" rules={[{ required: true, message: 'Please input the number of bedrooms!' }]}>
                            <InputNumber style={{ width: '100%' }} min={1} max={100} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="bathroom" label="Bathroom" rules={[{ required: true, message: 'Please input the number of bathrooms!' }]}>
                            <InputNumber style={{ width: '100%' }} min={1} max={100} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item name="latitude" label="Latitude" rules={[{ required: true, message: 'Please input the latitude!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="longitude" label="Longitude" rules={[{ required: true, message: 'Please input the longitude!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select the type!' }]}>
                            <Select>
                                <Option value="rent">Rent</Option>
                                <Option value="sale">Sale</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item name="property" label="Property" rules={[{ required: true, message: 'Please select the property!' }]}>
                            <Select>
                                <Option value="apartment">Apartment</Option>
                                <Option value="house">House</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Form.Item name="desc" label="Description">
                            <ReactQuill theme='snow' onChange={setValue} value={value} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Form.Item name="image" label="Image">
                            <UploadWidget
                                uwConfig={{
                                    multiple: true,
                                    cloudName: "dnnvrqoiu",
                                    uploadPreset: "estate",
                                    folder: "posts"
                                }}
                                setState={handleImageChange}
                            />
                        </Form.Item>
                        <Row gutter={[16, 16]}>
                            {image.map((imageUrl, index) => (
                                <Col span={8} key={index}>
                                    <img src={imageUrl} alt={`Image ${index + 1}`} style={{ maxWidth: '100%', marginBottom: '10px' }} />
                                    <Button onClick={() => handleDeleteImage(index)}>Delete</Button>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item name="utilities" label="Utilities">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="pet" label="Pet" rules={[{ required: true, message: 'Please select whether pets are allowed!' }]}>
                            <Select>
                                <Option value="allow">Allowed</Option>
                                <Option value="not_allow">Not Allowed</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="income" label="Income">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item name="size" label="Size">
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="school" label="School">
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="bus" label="Bus">
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item name="restaurant" label="Restaurant">
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Button type="primary" htmlType="submit" style={{ marginRight: '20px' }}>
                    Create Post
                </Button>
                <Button type="primary" onClick={() => setUpdateUser(false)}>
                    Cancel
                </Button>
            </Form>
        </div>
    )
}

export default CreatePost;
