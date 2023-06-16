import React, { useEffect } from 'react'
import { useState ,useContext } from 'react';
import { AuthContext } from "../context/AuthProvider";

import '../Styles/login.css';

import { useNavigate} from 'react-router-dom';

function Signup() {

    const navigate = useNavigate()
    const [name, nameSet] = useState("");
    const [password, passwordSet] = useState("");
    const [email, emailSet] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {signUp, user} = useContext(AuthContext);
    
    

    const handleSignup = async () => {
        try {
            await signUp(name,email,password,confirmPassword);
            
        }
        catch (err) {
            console.log(err.message);
        }
    }

  return (
    <div className="container-grey">
    <div className="form-container">
        <div className='h1Box'>
            <h1 className='h1'>SIGN UP</h1>
            <div className="line"></div>
        </div>
        <div className="loginBox">
            <div className="entryBox">
                <div className="entryText">Name</div>
                <input className="name input" type="text" name="Name" placeholder="Your Name" required="" onChange={(e) => nameSet(e.target.value)} />
            </div>
            <div className="entryBox">
                <div className="entryText">Email</div>
                <input className="email input" type="email" name="Email" placeholder="Your Email" required="" onChange={(e) => emailSet(e.target.value)} />
            </div>
            <div className="entryBox">
                <div className="entryText">Password</div>
                <input className="password input" type="password" name="Password" placeholder="**********" onChange={(e) => passwordSet(e.target.value)} />
            </div>
            <div className="entryBox">
                <div className="entryText">Confirm  Password</div>
                <input className="confirmPassword input" type="password" name="ConfirmPassword" placeholder="**********" onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button className="loginBtn  form-button" type="submit" onClick={handleSignup}>
                Sign Up
            </button>

        </div>
    </div>
</div>

  )
}

export default Signup