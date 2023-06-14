import React from 'react'
import Main from '../../components/Main'
import './home.css'
import Sidebar from '../../components/Sidebar'

const Home = () => {
  return (
    <div className='home_main'>
        
        <Sidebar />
        <Main />
        
    </div>
  )
}

export default Home