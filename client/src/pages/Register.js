import {React,useState} from 'react'
import { Form,Input, message } from 'antd';
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios';
import Spinner from '../components/Spinner';

const Register = () => {

  const navigate = useNavigate();
  const [Loading,setLoading]=setLoading(false);
  const submitHandler = async(values) => {
    try
    {
      setLoading(true);
      await axios.post('/api/v1/users/register', values);
      message.success('Registration successful');
      setLoading(false);
      navigate('/login');
    } 

  catch(error)
  {
      setLoading(false);
      message.error('Registration failed');
    }
  }

  return (
    <div className='register-form'>
      {Loading && <Spinner />}
      <Form layout='vertical' onFinish={submitHandler}>
        <h2>Register</h2>
        <Form.Item label='Name' name='name'>
          <Input  />
        </Form.Item>
        <Form.Item label='Email' name='email'>
          <Input type="email" />
        </Form.Item>
        <Form.Item label='Password' name='password'>
          <Input type="password"  />
        </Form.Item>
        <div className='d-flex justify-content-between'>
        <Link to='/login'>Already Registered? Click here to Log In</Link>
        <button className='btn btn-primary'>Register</button>
        </div>
      </Form>
    </div>
  )
}

export default Register
