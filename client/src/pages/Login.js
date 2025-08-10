import {React,useState} from 'react'
import { Form,Input, message } from 'antd';
import { Link,useNavigate} from 'react-router-dom'
import { json } from 'express';
import Spinner from '../components/Spinner';
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();
  const [Loading,setLoading] = useState(false);
  const submitHandler = async(values) => {
    try
    {
      setLoading(true);
       const {data}=await axios.post('users/login',values)
       setLoading(false);
       message.success('Login Successful');
       localStorage.setItem('user',json.stringify({...data.user,'password':''}));
    }
    catch(error)
    {
      setLoading(false);
      message.error('Invalid Username or Password');
    }
  }

  return (
    <div className='register-form'>
      {Loading && <Spinner />}
      <Form layout='vertical' onFinish={submitHandler}>
        <h2>Login</h2>
        <Form.Item label='Email' name='email'>
          <Input type="email" />
        </Form.Item>
        <Form.Item label='Password' name='password'>
          <Input type="password"  />
        </Form.Item>
        <div className='d-flex justify-content-between'>
        <Link to='/register'>Don't have an account? Click here to Register</Link>
        <button className='btn btn-primary'>Login</button>
        </div>
      </Form>
    </div>
  )
}

export default Login
