import React, { useContext, useEffect, useState } from 'react'
import './postpagecomponent.css'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { fetchUserData } from '../utils/fetchUserData'
import { AuthContext } from '../context/AuthContext'
import { useRef } from 'react';

const PostPageComponent = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [post, setPost] = useState({});
  const [userData, setUserData] = useState({});
  const [like, setLike] = useState(false);
  const [text, setText] = useState('');
  

  const popup = useRef();
  const textRef = useRef();
  const edited = useRef();
  const save = useRef();

  useEffect(() => {
    const fetchPost = async() => {
      try {

        const { data } = await axios.get(`/api/post/${postId}`);
        const user = await fetchUserData(data.userId);

        setPost(data);
        setUserData(user);
        setText(data.text);


      } catch (error) {
        console.log(error)
      }
    }

    fetchPost();

  }, [postId, like])

  const likePost = async() => {

    try {
      await axios.put(`/api/post/like/${user._id}/${post._id}`);
      setLike(prev => (!prev));

    } catch (error) {
      console.log(error)
    }
  }

  
  const savePost = async() => {

    try {
      await axios.put(`/api/post/${user._id}/${postId}`, {text: text});
      navigate(`/post/${post._id}`);
      setPost({ ...post, text })
      textRef.current.className = 'show';
      save.current.className = 'postpage_c_save hide';
      edited.current.className = 'postpage_c_edited hide';

    } catch (error) {
      console.log(error);
    }

  }

  const handleClick = () => {
    if (popup.current.className === 'postpage_c_popup hide') {
      popup.current.className = 'postpage_c_popup show';
    } else {
      popup.current.className = 'postpage_c_popup hide';
    }
  }

  const handleEditClick = () => {
    textRef.current.className = 'hide';
    save.current.className = 'postpage_c_save show';
    edited.current.className = 'postpage_c_edited show';
    popup.current.className = 'postpage_c_popup hide'
  }

  const handleDeleteClick = async() => {
    try {
      await axios.delete(`/api/post/${user._id}/${post._id}`)
      navigate('/home');

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='postpage_c_main'>
      <div className='postpage_c_container'>

        <div onClick={() => navigate(`/profile/${userData?.username}/${userData?._id}`)} className='postpage_c_user'>
          <img src={userData?.profilePic ? userData?.profilePic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt='img' />
          <h4>{userData?.firstName} {userData?.lastName}</h4>
          <p>@{userData?.username}</p>
        </div>

        <div className='postpage_c_post'>
          
          {post?.image && <img src={post?.image} alt='postImg' />}
          <div className='postpage_c_options'>

            <p className='show' ref={textRef}>{post?.text}</p>
            <input className='postpage_c_edited hide' ref={edited} type='text' value={text} onChange={(e) => setText(e.target.value)}  />
            <button ref={save} className='postpage_c_save hide' onClick={savePost}>Save</button>

            {userData._id === user._id && <button onClick={handleClick} style={{ backgroundColor: 'white', border: 'none' }}><BsThreeDots /></button>}
            <div ref={popup} className='postpage_c_popup hide'>
              <ul>
                <li className='popup' onClick={handleEditClick}>Edit</li>
                <li className='popup' onClick={handleDeleteClick}>Delete</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='postpage_c_likes'>

          <div onClick={likePost}>
            {post?.likes?.includes(user._id) ? <AiFillHeart className='heart_filled' /> : <AiOutlineHeart className='heart' />}
          </div>
          {post?.likes?.includes(user._id) 

            ? post?.likes?.length > 0 
              ? <p>You and {post?.likes?.length - 1} people liked this</p>
              : <p>You liked this post</p>
            : <p>{post?.likes?.length} people liked this</p>
            
          }

        </div>

      </div>
    </div>
  )
}

export default PostPageComponent