import React from 'react'
import './followersc.css'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Follower = ({ follower }) => {

  const [followerState, setFollowerState] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFollower = async () => {
      try {
        const { data } = await axios.get(`/api/user/${follower}`)
        setFollowerState(data);

      } catch (error) {
        console.log(error);
      }
    }

    fetchFollower()

  }, [follower])



  return (
    <div className='follower_main' onClick={() => navigate(`/profile/${followerState?.username}/${followerState?._id}`)}>
        <img src={followerState?.image ? followerState?.image : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt='image' />
        <h5>{followerState.username}</h5>
    </div>
  )
}

export default Follower