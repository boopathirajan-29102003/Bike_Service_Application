import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/login.css';
import { redirectToSignup } from './handlers/redirect';
import { validEmail, validMobileNo, validPassword } from './handlers/regex';
import axios from 'axios';



const Login = props => {

    const [identity, setIdentity] = useState("");
    const [password, setPassword] = useState("");
    const [position, setPosition] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validEmail.test(identity) && !validMobileNo.test(identity)) {
            alert("Enter valid mobile no / Email");
        }
        else if (!validPassword.test(password)) {
            alert("Enter valid password");
        }
        else {
            var key;
            if (validEmail.test(identity)) {
                key = "email";
            }
            else if (validMobileNo.test(identity)) {
                key = "mno"
            }
            axios.post('http://localhost:5000/./login', { identity, password, key, position })
                .then(res => {
                    if (res.data.Auth === true) {
                        const data = {
                            name: res.data.name,
                            email: res.data.email,
                            position: res.data.pos,
                            Auth: true
                        }
                        navigate({ state: data })
                        if (data.position === 'admin')
                            navigate("/ordersadmin", { state: data })
                        else
                            navigate("/service", { state: data })
                    }
                }).catch(err => {
                    console.log(err);
                })
        }
    }
    return (
        <div class="container">
            <br />
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div class="group">
                    <label htmlFor="email">Email/Mobile No</label>
                    <input type="text" id="email" name="email" placeholder="Email/Mobile" onChange={(e) => { setIdentity(e.target.value) }} required />
                    <p></p>
                </div>
                <div class="group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} required />
                </div>
                <div className="group">
                    <label htmlFor="position">Register as</label>
                    <input type="text" id="position" name="position" placeholder="Enter admin or user" onChange={(e) => setPosition(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
            <br />
            <p>Don't have account</p>
            <center><button style={{ width: "10rem" }} onClick={redirectToSignup}>Register</button></center>
        </div>
    )
}

export default Login