import React from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <div className='navbar_main'>
        <div className='search'>
            <button className='add_post' onClick={() => navigate('/search')}>Search Users</button>
        </div>
        <button className='add_post' onClick={() => navigate('/new')}>Add Post</button>
    </div>
  )
}

export default Navbar