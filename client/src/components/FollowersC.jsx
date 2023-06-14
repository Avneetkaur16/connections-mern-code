import React from 'react'
import './followersc.css'
import Follower from './Follower'
import { useContext } from 'react'
import { FollowerContext } from '../context/FollowerContext'
import { FollowingContext } from '../context/FollowingContext'

const FollowersC = ({ heading }) => {
  const { followersLoading, followers } = useContext(FollowerContext);
  const { followingsLoading, followings } = useContext(FollowingContext);


  return (
    <div className='followersc_main'>
      <div className='followersc_container'>
        <h3>{heading}</h3>

        {followersLoading || followingsLoading ? <p>Loading...</p> : null}
     
          {heading === 'Followers' && followers.map((follower) => (
            <>
              <Follower key={follower} follower={follower} />
            </>
          ))}

          {heading === 'Followings' && followings.map((following) => (
            <>
              <Follower key={following} follower={following} />
            </>
          ))}
          
      </div>
    </div>
  )
}

export default FollowersC