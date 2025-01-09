import React, { useState } from 'react'
import { useAuth } from "../context/AuthProvider"
import Sidebar from '../dashboard/Sidebar';
import MyProfile from '../dashboard/MyProfile';
import CreateBlogs from '../dashboard/CreateBlogs';
import UpdateBlog from '../dashboard/UpdateBlog';
import MyBlogs from '../dashboard/MyBlogs';
import { Navigate } from 'react-router-dom';
function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [ component, setComponent ] = useState("My Blogs")
  console.log(profile);
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={'/'} />;
  }


  return (
    <div>
      <div>
        <Sidebar component={component} setComponent={setComponent} />
        {component === "My Profile" ?
          (< MyProfile />

          ) :
          component === "Create Blog" ?
            (<CreateBlogs />

            ) : component === "UpdateBlog" ?
              (<UpdateBlog />

              ) : (<MyBlogs />)}
      </div>
    </div>
  )
}

export default Dashboard;
