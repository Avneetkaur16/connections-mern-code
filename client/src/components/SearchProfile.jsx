import React from 'react'
import './searchprofile.css'
import { useNavigate } from 'react-router-dom'

const SearchProfile = ({ profile }) => {

  const navigate = useNavigate();

  return (
    <div className='searchprofile_main' onClick={() => navigate(`/profile/${profile?.username}/${profile?._id}`)}>
      <img src={profile?.profilePic ? profile?.profilePic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt='profileImage' />
      <div className='searchprofile_info'>
        <h4>{profile.firstName} {profile.lastName}</h4>
        <h5>{profile.username}</h5>
        <p>{profile.institute}</p>
      </div>
    </div>
  )
}

export default SearchProfile