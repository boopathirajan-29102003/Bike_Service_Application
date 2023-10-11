import React, { useState } from 'react'
import './css/login.css'
import axios from 'axios'
import { redirectToLogin } from './handlers/redirect'
import { validEmail, validMobileNo, validPassword } from './handlers/regex'
import { useNavigate } from 'react-router-dom'
function SignUp() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mno, setMno] = useState('')
  const [password, setPassword] = useState('')
  const [position, setPosition] = useState('')

  const navigate=useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validEmail.test(email)) {
      alert("Enter valid email");
    }
    else if (!validPassword.test(password)) {
      alert("Password must contain one capital letter, one special charactor");
    }
    else if (!validMobileNo.test(mno) || mno.length !== 10) {
      alert("Enter valid mobile number must be 10 digit");
    }
    else {
      axios.post('http://localhost:5000/./signup', { name, email, mno, password, position })
        .then(res => {
         console.log(res)
        })
        .catch(err => {
          console.log(err);
        }) 
    }
    window.location.href='/login'
  }
  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSignup}>
        <div className="group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Full Name" onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="group">
          <label htmlFor="mno">Mobile Number</label>
          <input type="tel" id="mno" name="mno" placeholder="Mobile Number" onChange={(e) => setMno(e.target.value)} required />
        </div>
        <div className="group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="group">
          <label htmlFor="position">Register as</label>
          <input type="text" id="position" name="position" placeholder="Enter admin or user" onChange={(e) => setPosition(e.target.value)} required />
        </div>
        <button type="submit" >Register</button>
      </form>
      <p>Already have a account</p>
      <center><button style={{ width: "10rem" }} onClick={redirectToLogin}>Login</button></center>
    </div>
  )
}

export default SignUp