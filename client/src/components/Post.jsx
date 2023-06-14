import React, { useContext, useEffect, useState } from 'react'
import './post.css'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { fetchUserData } from '../utils/fetchUserData'

const Post = ({ post }) => {

  const [userData, setUserData] = useState({});
  const [like, setLike] = useState(false);
  const [postData, setPostData] = useState({ _id: post._id, userId: post.userId, text: post?.text, image: post?.image, likes: post.likes })

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetch = async() => {
      try {
        const user = await fetchUserData(post.userId);
        setUserData(user);

      } catch (error) {
        console.log(error);
      }
    }

    fetch();

  }, [post.userId])


  useEffect(() => {

    const fetchUpdatedPost = async() => {
      try {
        const { data } = await axios.get(`/api/post/${post._id}`);
        setPostData(data);

      } catch (error) {
        console.log(error);
      }
    }
    fetchUpdatedPost();
    
  }, [like, post._id]);


  const likePost = async() => {

    try {
      await axios.put(`/api/post/like/${user._id}/${post._id}`);
      setLike(prev => (!prev));

    } catch (error) {
      console.log(error)
    }
  }

  return (

    <div className='post'>
      <div className='post_user'>
        <img src={userData?.profilePic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt='userimg' />
        <h4><a href={`/profile/${userData?.username}/${userData?._id}`}>{userData?.username}</a></h4>
        <small>On {post?.createdAt?.slice(0, 10)} at {post?.createdAt?.slice(11, 16)}</small>
      </div>

      <Link to={`/post/${postData?._id}`} className='post_link'>
        {postData?.image && <img src={postData?.image} alt='postImg' />}
        <p className='post_text'>{postData?.text}</p>
      </Link>

      <div className='post_likes'>

        <div onClick={likePost}>

              {postData?.likes?.includes(user._id) ? <AiFillHeart className='post_heart_filled' /> : <AiOutlineHeart  className='post_heart' />}
            </div>
            {postData?.likes?.includes(user._id) 

              ? postData?.likes?.length > 1 
                ? <p>You and {postData?.likes?.length - 1} others liked this</p>
                : <p>You liked this post</p>
              : <p>{postData?.likes?.length === 1 ? 'One person' : `${postData?.likes?.length} people`} liked this</p>
              
            }

      </div>
    </div>
        
  )
}

export default Post