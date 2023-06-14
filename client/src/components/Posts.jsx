import React, { useContext, useEffect } from 'react'
import './posts.css'
import Post from './Post'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { PostContext } from '../context/PostContext'

const Posts = () => {
  const { user } = useContext(AuthContext);
  const { posts, dispatch } = useContext(PostContext);

  useEffect(() => {

    const fetchPosts = async () => {
      dispatch({ type: "POSTS_START" })
      try {
        const { data } = await axios.get(`/api/post/timeline/${user._id}`);
        dispatch({ type: "POSTS_SUCCESS", payload: data })


      } catch (error) {
        dispatch({ type: "POSTS_FAIL", payload: error.response.data })
      }
    }

    fetchPosts();

  }, [user, dispatch]);

  console.log(posts)

  
  return (

    <div className='posts_container'>

      {posts[1] ? posts[1][0]?.map((post) => (
        <Post key={post._id} post={post} />
      )) : (<p></p>)}
      
      <>
        {posts[0] ? posts[0]?.map((post) => (
          <Post key={post?._id} post={post} />
        )) : (<p>Loading</p>)}
      </>

    </div>

  )
}

export default Posts