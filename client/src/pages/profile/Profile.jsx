import React from 'react'
import Sidebar from '../../components/Sidebar'
import ProfileComponent from '../../components/ProfileComponent'
import './profile.css'

const Profile = () => {
  return (
    <div className='profile_main'>

        <Sidebar />  
        <ProfileComponent />    
        
         
    </div>
  )
}

export default Profile