import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from './components/AuthPage/Signup';
import Login from './components/AuthPage/Login';
import ResetPassword from './components/AuthPage/ResetPassword';
import ForgetPassword from './components/AuthPage/ForgetPassword';
import AuthProvider from './components/context/AuthProvider';
import Contact from './components/Home Page/Contact';
import Review from "./components/Home Page/Review";
import Plans from "./components/Home Page/Plans";
import Footer from "./components/Home Page/Footer";
import Home from "./components/Home Page/Home";
import NavBar from "./components/Home Page/NavBar";
import AllPlans from "./components/Plan Page/AllPlans";
import Profile from "./components/ProfilePage/Profile";
import PlanDetail from "./components/PlanDetail Page/PlanDetail";




function App() {
  return (
  <>
  <BrowserRouter>
  <AuthProvider>
  <NavBar/>
  <Routes>
    <Route path='/signup' element={<Signup/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path="/forgetpassword" element={<ForgetPassword/>}/>
  <Route path='/resetpassword' element={<ResetPassword/>}/>
  <Route path='/plans' element={<Plans/>}/>
  <Route path="/allPlans" element={<AllPlans/>}/>
  <Route path='/profile' element={<Profile/>}/>
  <Route path='/planDetail/:id' element={<PlanDetail/>}/>
  <Route path='/' element={<Home/>}/>
  </Routes>
  <Footer/>
  </AuthProvider>
  </BrowserRouter>

     
    
  </>
  );
}

export default App;
