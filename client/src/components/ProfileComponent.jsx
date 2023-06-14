import React, { useContext, useEffect, useState } from 'react'
import './profilecomponent.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { ProfileContext } from '../context/ProfileContext';
import Post from './Post';
import { AuthContext } from '../context/AuthContext';


const ProfileComponent = () => {
    const [follow, setFollow] = useState(false);
    
    const { userProfile, userDispatch } = useContext(UserContext);
    const { user } = useContext(AuthContext);
    const { profilePosts, dispatch } = useContext(ProfileContext);

    const navigate = useNavigate();
    console.log(user)

    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            userDispatch({ type: "USER_START" })
            try {
                const { data } = await axios.get(`/api/user/${id}`)
                userDispatch({ type: "USER_SUCCESS", payload: data })
                

            } catch (error) {
                userDispatch({ type: "USER_FAILURE", payload: error.response.data })
                console.log(error)
            }
        }

        fetchUser()
    }, [id, follow, userDispatch])


    useEffect(() => {
        const fetchUserPosts = async () => {
            dispatch({ type: "PROFILE_START" })

            try {
                const { data } = await axios.get(`/api/post/profile/${id}`)
                dispatch({ type: "PROFILE_SUCCESS", payload: data });
            

            } catch (error) {
                dispatch({ type: "PROFILE_FAIL", payload: error.response.data })
            }
        } 

        fetchUserPosts();

    }, [id, dispatch])

    const handleClick = async(e) => {
        try {

            await axios.put(`/api/user/follow/${userProfile._id}`);
            setFollow(prev => (!prev));

        } catch (error) {
            console.log(error)
        }
    }


    const handleEdit = () => {
        navigate('/edit')
    }

  return (
    <div className='profile_c_main'>
        <div className='profile_c_container'>
            <div className='profile_c_images'>
                <img className='cover' src={userProfile?.coverPic ? userProfile?.coverPic : 'https://s3.amazonaws.com/export.easil.com/4ffc1b2d-5384-404e-bcf9-e77f388b1f46/798e7a925e22c21006.png'}  alt='cover' />
                <img className='profile' src={userProfile?.profilePic ? userProfile?.profilePic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt='profile' />
            </div>

            <div className='profile_c_name'>
                <h4>{userProfile?.firstName} {userProfile?.lastName}</h4>
                <p>@{userProfile?.username}</p>
            </div>

            <div className='profile_c_info_container'>
                <div className='profile_c_info'>

                    {userProfile?.city && <div className='profile_c_data'>
                        <h4>Lives in</h4>
                        <p>{userProfile?.city}</p>
                    </div>}

                    {userProfile?.institute && <div className='profile_c_data'>
                        <h4>Studies at</h4>
                        <p>{userProfile?.institute}</p>
                    </div>}

                    <div className='profile_c_data'>
                        <h4>Joined on</h4>
                        <p>{userProfile?.createdAt?.slice(0, 10)}</p>
                    </div>
                </div>
                <div className='profile_c_info'>
                    <div className='profile_c_data' onClick={() => navigate(`/followers/${userProfile._id}`)}>
                        <h4>Followers</h4>
                        <p>{userProfile?.followers?.length}</p>
                    </div>
                    <div className='profile_c_data' onClick={() => navigate(`/followings/${userProfile._id}`)}>
                        <h4>Followings</h4>
                        <p>{userProfile?.followings?.length}</p>
                    </div>

                    {user?._id === id 
                        ? <div className='profile_c_data'>
                            <button className='follow' onClick={handleEdit}>Edit</button>
                        </div> 
                        : <div className='profile_c_data'>

                        <div onClick={handleClick}>{userProfile?.followers?.includes(user._id) || follow
                            ? <button className='following'>Following</button> 
                            : <button className='follow'>Follow</button>
                        }</div>
                        
                    </div>}

                </div>
            </div>
        </div>

        <div className='profile_c_posts'>
            {profilePosts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </div>

        </div>

  )
}

export default ProfileComponent