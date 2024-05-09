// PostCard.js
import React from 'react';
import { Card, Col } from 'antd';
import "./PostCard.scss";
import { Link } from 'react-router-dom';
const { Meta } = Card;

const PostCard = ({ post }) => {
    return (
        <Col span={8} style={{ marginBottom: 16 }}>
            <Card
                cover={<img alt="post" src={post.image[0]} style={{ height: '400px', width: '400px' }} />}
                actions={[
                    <Link to={`/postDetails/${post?.id}`}>Details</Link>
                ]}
            >
                <Meta title={post.title} description={`Price: ${post.price}`} />
            </Card>
        </Col>
    );
};

export default PostCard;
