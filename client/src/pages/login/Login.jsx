import React, { useContext, useState } from 'react';
import '../register/register.css';
import './login.css'
import FormField from '../../components/FormField';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  // credential state
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  // context values
  const { err, dispatch } = useContext(AuthContext);

  // nav
  const navigate = useNavigate()

  // form fields
  const fields = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      value: credentials.username,
      pattern: `^[a-zA-Z0-9]{6,16}$`,
      label: 'Username',
      placeholder: 'Username',
      err: 'Username Required',
      required: true
    },

    {
      id: 2,
      name: 'password',
      type: 'password',
      value: credentials.password,
      pattern: `^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      label: 'Password',
      placeholder: 'Password',
      err: 'Password Required',
      required: true
    }
  ];

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]:e.target.value })
    
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      dispatch({ type: "LOGIN_START" });
      const { data } = await axios.post('/api/auth/login', credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      navigate('/home')
      

    } catch (error) {
      dispatch({ type: "LOGIN_FAIL", payload: error.response.data })
      
    }
  }


  return (
    <div className='register_main'>
      <h1 className='title'>Connections</h1>
      <h2 className='sign_in'>Sign In</h2>
      {err ? <p>{err?.message}</p> : <p></p>}
      <form className='login_container' onSubmit={handleSubmit}>
        {fields.map((field) => (
          <FormField 
            key={field.id}
            name={field.name}
            type={field.type}
            pattern={field.pattern}
            value={field.value}
            placeholder={field.placeholder}
            label={field.label}
            err={field.err}
            req={field.required}
            handleChange={handleChange}
          />
        ))}

        <button className='login_button'>Log In</button>
      </form>
      <p>Don't have an account?<a href='/register'> Sign up</a></p>

    </div>
  )
}

export default Login