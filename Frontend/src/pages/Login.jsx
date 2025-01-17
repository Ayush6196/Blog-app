import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Login = () => {
  const {isAuthenticated,setIsAuthenticated}=useAuth();
  const navigateTo=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async (e) => {
   
    e.preventDefault();
   


    try {

      const { data } = await axios.post('http://localhost:4001/api/users/login', {email,password,role}, {
        withCredentials:true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      localStorage.setItem("token",data.token)
      toast.success(data.message ||'User Login Successfully')
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      navigateTo("/");

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message||"Please fill all required feilds")


    }
  }


  return (
    <div>
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='w-full max-w-md bg-white shadow-md rounded-lg p-8'>
          <form onSubmit={handleLogin}>
            <div className='font-semibold text-xl items-center text-center'>
              padho<span className='text-blue-500'>Likho</span>
            </div>
            <h1 className='text-xl font-semibold mb-6'>Login</h1>
            <select value={role} onChange={(e) => setRole(e.target.value)} className='w-full p-2 mb-4 border rounded-md' >
              <option value="">Select Role</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>

            <div className='mb-4'>
              <input type="email"
                placeholder='Your Email Address'
                value={email}
                className='w-full p-2 mb-4 border rounded-md'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <input type="password"
                placeholder='Your Password'
                value={password}
                className='w-full p-2 mb-4 border rounded-md'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>


            <p className='text-center mb-4'>
              Already Registered?{" "}
              <Link to={"/signup"} className='text-blue-600'>SignUp Now</Link>
            </p>
            <button type='submit' className='w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white'>Register</button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login