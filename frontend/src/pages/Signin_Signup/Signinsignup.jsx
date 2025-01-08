import React, { useState } from 'react';
import './Signinsignup.css'
import axios from 'axios';

const Signinsignup = () => {
    const backendURL = "22-pwbcs-0913-wp-fall24-assignment2.vercel.app";

    const [action, setAction] = useState("Sign Up");
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [protectedMessage, setProtectedMessage] = useState('');

    const handleUsername = (event) => { 
        setUsername(event.target.value);
    };
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    // login logic
    const handleLogin = async () => {
        try {
            const response = await axios.post(`${backendURL}/api/signin`, {
                email, // Changed from username to email
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            
            if (response.status === 200) {
                // Store the token // exactly like sessions
                localStorage.setItem('token', response.data.token);
                alert('Login successful!');
            }
        } catch (error) {
            alert(error.response?.data?.message || "Login failed. Please try again.");
        }
    };   

    const handleSubmit = async () => {
        if(!username.trim()) {
            alert("Username is required");
            return;
        }
        if(!email.trim()) {
            alert("Email is required");
            return;
        }
        if(!password.trim()) {
            alert("Password is required");
            return;
        }

        try {
            const response = await axios.post(`${backendURL}/api/signup`, {
                username,
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                alert('Signup successful! Please sign in.');
                setAction("Sign In");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Signup failed. Please try again.");
        }
    };

    const handleProtectedRequest = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please login first to access protected route');
                return;
            }

            const response = await axios.get(`${backendURL}/api/protected`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                setProtectedMessage(response.data);
                alert('Protected route accessed successfully!');
            }
        } catch (error) {
            alert(error.response?.data?.message || "Failed to access protected route");
        }
    };

    return ( 
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <h4>Username</h4>
                    <input type="text" placeholder='Name...' onChange={handleUsername} required/>
                </div>
                
                {action === "Sign In" ? null : (
                    <div className="input">
                        <h4>Email</h4>
                        <input type="email" placeholder='Email...'  onChange={handleEmail} required/>
                    </div>
                )}
                <div className="input">
                    <h4>Password</h4>
                    <input type="password" placeholder='Password...' onChange={handlePassword} required/>
                </div>
            </div>
            <div className="submit-container">
                <div className="submit_form" onClick={action === "Sign In" ? handleLogin : handleSubmit}>Submit</div>
            </div>
            <div className="submit-container">
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>Sign Up</div>
                <div className={action === "Sign In" ? "submit gray" : "submit"} onClick={() => setAction("Sign In")}>Sign In</div>
            </div>

            <div className="protected-section">
                <button 
                    className="protected-button"
                    onClick={handleProtectedRequest}
                    style={{
                        padding: '10px 20px',
                        margin: '20px 0',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Access Protected Route
                </button>
                {protectedMessage && (
                    <div className="protected-message" style={{ margin: '10px 0' }}>
                        Protected Route Response: {protectedMessage}
                    </div>
                )}
            </div>
        </div>
        
    );
}

export default Signinsignup;