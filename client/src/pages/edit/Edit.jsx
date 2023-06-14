import React from 'react'
import './edit.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useState } from 'react'
import { FaGraduationCap, FaHome, FaUser, FaUserCircle} from 'react-icons/fa'
import axios from 'axios'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom';


const Edit = () => {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const [info, setInfo] = useState({ firstName: user?.firstName, lastName: user?.lastName, username: user?.username});
    const [detail, setDetail] = useState({ city: user?.city ? user?.city : '', institute: user?.institute ? user?.institute : ''  });
    const [profilePic, setProfilePic] = useState('');
    const [coverPic, setCoverPic] = useState('');

    const profImg = useRef();
    const profNew = useRef();
    const saveProfile = useRef();

    const coverImg = useRef();
    const coverNew = useRef();
    const saveCover = useRef();

    const first = useRef();
    const last = useRef();
    const userRef = useRef();
    const saveUser = useRef();
    const username = useRef();
    const name = useRef();

    const saveDetail = useRef();
    const city = useRef();
    const institution = useRef();
    const cityNew = useRef();
    const institutionNew = useRef();

    const handleUserChange = (e) => {
        saveUser.current.className = 'save_button show';
        setInfo({ ...info, [e.target.name]: e.target.value })
        console.log(info)
    }

    const handleChange = (e) => {
        saveDetail.current.className = 'save_button show';
        setDetail({ ...detail, [e.target.name]: e.target.value });
        console.log(detail)
    }

    const handleEditProfile = (e) => {

        saveProfile.current.className = 'save_button show';
        profImg.current.className = 'hide';

        setProfilePic(e.target.value);

        profNew.current.className = 'edit_profile_pic show';
        

    }

    const handleEditCover = (e) => {

        saveCover.current.className = 'save_button show';
        coverImg.current.className = 'hide';

        setCoverPic(e.target.value);

        coverNew.current.className = 'edit_cover_pic show'
    }


    const handleEdit = () => {
        name.current.className = 'hide';
        username.current.className = 'hide';

        first.current.className = 'edit_field show';
        last.current.className = 'edit_field show';
        userRef.current.className = 'edit_field show';
    }

    const handleEditDetails = () => {
        city.current.className = 'hide';
        institution.current.className = 'hide';

        cityNew.current.className = 'edit_field show'
        institutionNew.current.className = 'edit_field show'
    }

    const handleSaveProfilePic = async() => {
        try {
            const { data } = await axios.put(`/api/user/${user._id}`, { profilePic: profilePic });
            dispatch({ type: "USER_UPDATE", payload: data });
            navigate(`/profile/${user?.username}/${user?._id}`)

        } catch (error) {
            console.log(error)
        }
    }

    const handleSaveCoverPic = async() => {
        try {
            const { data } = await axios.put(`/api/user/${user._id}`, { coverPic: coverPic });
            dispatch({ type: "USER_UPDATE", payload: data });
            navigate(`/profile/${user?.username}/${user?._id}`)

        } catch (error) {
            console.log(error)
        }
    }

    const handleSaveUser = async () => {
        if (info?.firstName?.length === 0 || info?.lastName?.length === 0 || info?.username?.length === 0) {
            console.log('Fill all')

        } else {
            try {
                
                const { data } = await axios.put(`/api/user/${user._id}`, info)
                dispatch({ type: "USER_UPDATE", payload: data });
                navigate(`/profile/${user?.username}/${user?._id}`)
                
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleSaveDetails = async() => {
        
        try {
            const { data } = await axios.put(`/api/user/${user?._id}`, detail);
            dispatch({ type: "USER_UPDATE", payload: data });
            navigate(`/profile/${user?.username}/${user?._id}`)
            
            console.log(data);

        } catch (error) {
            console.log(error)
        }
    }
    

  return (
    <div className='edit_main'>
        <h3>Edit Your Profile</h3>

        <div className='edit_container'>
            <div className='edit_data_container'>
                <div className='edit_data'>
                    <h4>{user?.profilePic ? 'Edit Profile Picture' : 'Add Profile Picture'}</h4>
                    <input type='url' className='edit_url' placeholder='Enter image URL' onChange={handleEditProfile} />
                    <button className='save_button hide' ref={saveProfile} onClick={handleSaveProfilePic}>Save</button>
                </div>
                <img ref={profNew} className='edit_profile_pic hide' src={profilePic} alt='new profile' />
                <img ref={profImg} className='edit_profile_pic' src={user?.profilePic ? user?.profilePic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt='profilePic' />
            </div>

            <div className='edit_data_container'>
                <div className='edit_data'>
                    <h4>{user?.coverPic ? 'Edit Cover Picture' : 'Add Cover Picture'}</h4>
                    <input type='url'  className='edit_url' placeholder='Enter image URL' onChange={handleEditCover} />
                    <button className='save_button hide' ref={saveCover} onClick={handleSaveCoverPic}>Save</button>
                </div>
                <img ref={coverNew} className='edit_cover_pic hide' src={coverPic} alt='new cover' />
                <img ref={coverImg} className='edit_cover_pic' src={user?.coverPic ? user?.coverPic : 'https://png.pngtree.com/thumb_back/fh260/background/20200821/pngtree-pure-white-minimalist-background-wallpaper-image_396581.jpg'} alt='coverPic' />
            </div>

            <div className='edit_data_container'>
                <div className='edit_info_container'>
                    <div className='edit_data'>
                        <h4>Edit User</h4>    

                        <div className='edit_buttons'>
                            <button className='edit_info_button' onClick={handleEdit}>Edit</button>
                            <button className='save_button hide' ref={saveUser} onClick={handleSaveUser}>Save</button>
                        </div>
                    </div>    

                    <div className='edit_info'>
                        <FaUser className='edit_icon' />
                        <p className='show' ref={name}>{user?.firstName} {user?.lastName}</p>
                        <input className='edit_field hide' ref={first} type='text' name='firstName' value={info?.firstName} onChange={handleUserChange} required pattern='^[a-zA-Z]{3,64}'/>
                        <span className='edit_error'>Required</span>
                        <input className='edit_field hide' ref={last} type='text' name='lastName' value={info?.lastName} onChange={handleUserChange} required pattern='^[a-zA-Z]{3,64}'/>
                        <span className='edit_error'>Required</span>
                    </div>

                    <div className='edit_info'>
                        <FaUserCircle className='edit_icon' />
                        <p className='show' ref={username}>{user?.username}</p>
                        <input className='edit_field hide' ref={userRef} type='text' name='username' value={info?.username} onChange={handleUserChange} required pattern='^[a-zA-Z0-9]{6,16}' />
                        <span className='edit_error'>Required</span>
                    </div>
                </div>
            </div>

            <div className='edit_data_container'>
                <div className='edit_info_container'>
                <div className='edit_data'>
                        <h4>Edit Details</h4>    

                        <div className='edit_buttons'>
                            <button className='edit_info_button' onClick={handleEditDetails}>Edit</button>
                            <button className='save_button hide' ref={saveDetail} onClick={handleSaveDetails}>Save</button>
                        </div>
                    </div> 

                    <div className='edit_info'>
                        <FaHome className='edit_icon' /> 
                        <p className='show' ref={city}>{user?.city ? `Lives in ${user?.city}`: `Add Current City`}</p>
                        <input className='edit_field hide' ref={cityNew} type='text' name='city' value={detail?.city} onChange={handleChange} required  />
                        <span className='edit_error'>Please enter a valid city</span>
                    </div>
                    <div className='edit_info'>
                        <FaGraduationCap className='edit_icon' />
                        <p className='show' ref={institution}>{user?.institute ? `Studies at ${user?.institute}` : `Add Current Institution`}</p>
                        <input className='edit_field hide' ref={institutionNew} type='text' name='institute' value={detail?.institute ? detail?.institute : ' '} onChange={handleChange} required />
                        <span className='edit_error'>Please enter a valid school</span>
                    </div>
                </div>
            </div>


        </div>
    </div>
  )
}

export default Edit