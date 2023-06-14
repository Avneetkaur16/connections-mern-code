import React from 'react'
import './followers.css'
import Sidebar from '../../components/Sidebar'
import FollowersC from '../../components/FollowersC'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { FollowerContext } from '../../context/FollowerContext';

const Followers = () => {
  const { id } = useParams();

  const { followers, followerDispatch } = useContext(FollowerContext);

  useEffect(() => {
    const fetchUser = async () => {

      try {

        followerDispatch({ type: "LOAD_FOLLOWERS" })
        const { data } = await axios.get(`/api/user/${id}`);
        followerDispatch({ type: "SET_FOLLOWERS", payload: data.followers })
        

      } catch (error) {
        console.log(error)
      }

    }

    fetchUser();

  },[id, followerDispatch])

  console.log(followers)

  
  return (
    <div className='followers_main'>
        <Sidebar />
        <FollowersC heading='Followers' />
    </div>
  )
}

export default Followers