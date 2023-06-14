import React from 'react'
import '../followers/followers.css'
import Sidebar from '../../components/Sidebar'
import FollowersC from '../../components/FollowersC'
import { useContext } from 'react'
import { FollowingContext } from '../../context/FollowingContext'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

const Followings = () => {
    const { followings, followingDispatch } = useContext(FollowingContext);

    const { id } = useParams()

    useEffect(() => {
      const fetchUser = async() => {

        try {
          followingDispatch({ type: "LOAD_FOLLOWINGS" })
          const { data } = await axios.get(`/api/user/${id}`)
          followingDispatch({ type: "SET_FOLLOWING", payload: data.followings })

        } catch (error) {
          console.log(error);
        }

      }

      fetchUser();
    }, [id])



  return (
    <div className='followers_main'>
        <Sidebar />
        <FollowersC followers={followings} heading='Followings' />
    </div>
  )
}

export default Followings