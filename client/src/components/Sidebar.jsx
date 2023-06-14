import React, { useContext, useEffect } from 'react'
import './sidebar.css'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

    const { user, dispatch } = useContext(AuthContext);
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async() => {
            try {
                const { data } = await axios.get(`/api/post/profile/${user?._id}`)
                setCount(data.length)


            } catch (error) {
                console.log(error);
            }
        }

        fetchPosts();

    }, [user])

    const handleLogout = () => {
        navigate('/')
        dispatch({ type: "LOGOUT" });
    }

  return (
    <div className='sidebar_main'>
        <h2 className='title'>Connections</h2>

        <div className='userinfo'>
            
                <div onClick={() => navigate(`/profile/${user.username}/${user._id}`)} className='user_image_container'>
                    <img className='user_image' src={user?.profilePic ? user?.profilePic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt="pic" />
                </div>
                <br></br>
                <h4 onClick={() => navigate(`/profile/${user.username}/${user._id}`)}>{user?.firstName} {user?.lastName}</h4>
                <p onClick={() => navigate(`/profile/${user.username}/${user._id}`)}>{user?.username}</p>
                <div className='userdata'>
                    <div className='userdata_fields'>
                        <h5>{user?.followers.length}</h5>
                        <p>Followers</p>
                    </div>
                    <div className='userdata_fields'>
                        <h5>{user?.followings.length}</h5>
                        <p>Followings</p>
                    </div>
                    <div className='userdata_fields'>
                        <h5>{count}</h5>
                        <p>Posts</p>
                    </div>
                </div>
            

            <div className='links'>
                <h5 onClick={() => navigate('/home')}>Feed</h5>
                <h5 onClick={handleLogout}>Logout</h5>
            </div>
        </div>
    </div>
  )
}

export default Sidebar