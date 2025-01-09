import React from 'react';
import Header from "../src/components/Header";
import Home from './components/Home';
import Footer from './components/Footer';
import { Route, Routes, useLocation } from 'react-router-dom';
import Blogs from "../src/pages/Blogs"
import About from "../src/pages/About"
import Contact from "../src/pages/Contact"
import Creators from "../src/pages/Creators"
import Dashboard from "../src/pages/Dashboard"
import Login from "../src/pages/Login"
import Signup from "../src/pages/Signup"
import { useAuth } from './context/AuthProvider';
import  { Toaster } from 'react-hot-toast';
import UpdateBlog from './dashboard/UpdateBlog';
import Detail from './pages/Detail';

const App = () => {

  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/signup"].includes(location.pathname);
  const {blogs}=useAuth();
  console.log(blogs);
  
  return (
    <div >
      {/* Defining Routes */}
        {!hideNavbarFooter && <Header />}
      
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/blogs' element={<Blogs />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/creators' element={<Creators />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />

        {/* Single page route */}
        <Route exact path="/blog/:id" element={<Detail />} />

         {/* Update page route */}
         <Route exact path="/blog/update/:id" element={<UpdateBlog />} />
      </Routes>
      <Toaster />


      {!hideNavbarFooter && <Footer />}
    </div>
  )
}

export default App