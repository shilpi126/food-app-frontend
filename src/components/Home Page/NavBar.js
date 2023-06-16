import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import AuthProvider, { useAuth } from '../context/AuthProvider';
import '../Styles/nav.css'

function NavBar(props) {

const {user, logout} = useAuth();
   console.log(user);

    return (
        <nav>
            <div className="menu">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/allPlans">All Plans</Link></li>
                    {user?.userDetails?
                    
                        <>
                        
                            <li>
                                <Link to="/profile">{user?.userDetails?.name}</Link>
                            </li>
                            <li>
                                <Link to="" onClick={logout}>Logout</Link>
                            </li>
                        </>
                        :
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    }
                </ul>
            </div>
        </nav>
       
    )
}

export default NavBar