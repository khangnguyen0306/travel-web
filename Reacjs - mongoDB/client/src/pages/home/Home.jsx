import React from 'react'
import { useGetPostsQuery } from '../../services/PostsAPI'
import { Row } from 'antd';
import PostCard from '../../components/PostCard/PostCard';


const Home = () => {

  const { data: posts, error, isLoading } = useGetPostsQuery();

  if (isLoading) {
    return <div>Loading...</div>           //UI
  }

  return (
    <div>
      <Row gutter={[16, 16]} style={{ height: 'fit-content' }}>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </Row>
    </div>
  )
}
PostCard
export default Home