import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../../../services/PostsAPI';
import { Card, Col, Descriptions, Divider, Row } from 'antd';
import Title from 'antd/es/skeleton/Title';

const PostDetails = () => {
    const { postId } = useParams('postId');
    const { data: PostDetail, error, isLoading } = useGetPostByIdQuery(postId);
    console.log(postId);
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div style={{ width: '100%' }}>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card
                    // cover={<img alt="post" src={PostDetail.image[0]} />}
                    >
                        <Title level={2}>{PostDetail.title}</Title>
                        <Divider orientation="left">Details</Divider>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Price">{PostDetail.price}</Descriptions.Item>
                            <Descriptions.Item label="Address">{PostDetail.address}, {PostDetail.city}</Descriptions.Item>
                            <Descriptions.Item label="Bedrooms">{PostDetail.bedroom}</Descriptions.Item>
                            <Descriptions.Item label="Bathrooms">{PostDetail.bathroom}</Descriptions.Item>
                            <Descriptions.Item label="Latitude">{PostDetail.latitude}</Descriptions.Item>
                            <Descriptions.Item label="Longitude">{PostDetail.longitude}</Descriptions.Item>
                            <Descriptions.Item label="Type">{PostDetail.type}</Descriptions.Item>
                            <Descriptions.Item label="Property">{PostDetail.property}</Descriptions.Item>
                            {/* <Descriptions.Item label="Created At">{new Date(createdAt).toLocaleDateString()}</Descriptions.Item> */}
                            
                            <Descriptions.Item label="Description" span={2}>
                                <div dangerouslySetInnerHTML={{ __html: PostDetail.postDetail.desc }} />
                            </Descriptions.Item>
                            <Descriptions.Item label="Pet">{PostDetail.postDetail.pet}</Descriptions.Item>
                            <Descriptions.Item label="Income">{PostDetail.postDetail.income}</Descriptions.Item>
                            <Descriptions.Item label="Size">{PostDetail.postDetail.size}</Descriptions.Item>
                            <Descriptions.Item label="School">{PostDetail.postDetail.school}</Descriptions.Item>
                            <Descriptions.Item label="Bus">{PostDetail.postDetail.bus}</Descriptions.Item>
                            <Descriptions.Item label="Restaurant">{PostDetail.postDetail.restaurant}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
                {/* <Col span={8}>
                    <Card
                        cover={<img alt="avatar" src={user.avatar} />}
                    >
                        <Title level={3}>{user.fullname}</Title>
                    </Card>
                </Col> */}
            </Row>
        </div>
    )
}

export default PostDetails