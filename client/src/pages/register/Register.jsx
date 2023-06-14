import React, { useState } from 'react';
import './register.css';
import FormField from '../../components/FormField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ firstName: '', lastName: '', email: '', username: '', password: '', confirm: '' })

  const fields = [
    {
      id: 1,
      name: 'firstName',
      label: 'First Name',
      placeholder: 'First Name',
      value: credentials.firstName,
      pattern: '^[A-Za-z]{2,64}',
      err: 'First Name Required',
      type: 'text',
      required: true,
    },

    {
      id: 2,
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
      value: credentials.lastName,
      pattern: '^[A-Za-z]{2,64}',
      err: 'Last Name Required',
      type: 'text',
      required: true,
    },

    {
      id: 3,
      name: 'email',
      label: 'E-mail',
      placeholder: 'E-mail',
      value: credentials.email,
      err: 'Please enter a valid email',
      type: 'email',
      required: true,
    },

    {
      id: 4,
      name: 'username',
      label: 'Username',
      placeholder: 'Username',
      value: credentials.username,
      pattern: "^[a-zA-Z0-9]{6,16}$",
      err: 'Username must be 6-16 characters long',
      type: 'text',
      required: true,
    },

    {
      id: 5,
      name: 'password',
      label: 'Password',
      placeholder: 'Password',
      value: credentials.password,
      pattern: "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#%&])[a-zA-Z0-9!@#%&]{8,20}$",
      err: '8-20 characters. 1 number, 1 special character except $*^',
      type: 'password',
      required: true,
    },

    {
      id: 6,
      name: 'confirm',
      label: 'Confirm Password',
      placeholder: 'Confirm Password',
      value: credentials.confirm,
      pattern: credentials.password ,
      err: 'Passwords did not match',
      type: 'password',
      required: true,
    }
  ];

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    
  }

  
  console.log(credentials)

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/auth/register', credentials);

    navigate('/');
  }


  return (
    <div className='register_main'>
      <h1 className='title'>Connections</h1>
      <h2 className='sign_up'>Sign Up</h2>

      <form className='register_container' onSubmit={handleSubmit}>
        {fields.map((field) => (
          <FormField 
            key={field.id}
            type={field.type}
            pattern={field.pattern}
            name={field.name} 
            value={field.value} 
            label={field.label} 
            placeholder={field.placeholder} 
            err={field.err}
            req={field.required}
            handleChange={handleChange}
            
          />
        ))}
        <button className='register_button'>Create</button>
      </form>
      <p>Already have an account?<a href='/'> Sign in</a></p>
    </div>
  )
}

export default Register