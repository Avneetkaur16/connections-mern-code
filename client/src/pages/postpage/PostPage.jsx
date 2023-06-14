import React from 'react'
import './postpage.css'
import Sidebar from '../../components/Sidebar'
import PostPageComponent from '../../components/PostPageComponent'

const PostPage = () => {
  return (
    <div className='postpage_main'>
        <Sidebar />
        <PostPageComponent />
    </div>
  )
}

export default PostPage