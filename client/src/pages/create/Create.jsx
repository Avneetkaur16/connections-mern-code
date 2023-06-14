import React, { useContext, useState } from 'react'
import './create.css'
import { AiOutlineSend } from 'react-icons/ai'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [img, setImg] = useState('');
    const [text, setText] = useState('');

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImg(e.target.value)
    }

    const createPost = async() => {
        try {
            const { data } = await axios.post(`/api/post/${user._id}`, {image: img, text: text});
            console.log(data)
            navigate('/home');
        

        } catch (error) {
            console.log(error);
        }
    }
    

  return (
    <div className='create_main'>
        <h3>Create a new post</h3>
        <div className='create_container'>
            <input className='create_url' type='url' placeholder='Enter image URL' onChange={handleImageChange} />
            <button className='create_button' onClick={createPost}>Post <AiOutlineSend /></button>
            
        </div>
        <div className='create_image'>
            {img !== '' ? <img src={img} alt='newPost' /> : <div className='noImage'>No image selected</div>}
            <textarea placeholder='Write something here...' value={text} onChange={(e) => setText(e.target.value)} />
        </div>
    </div>
  )
}

export default Create