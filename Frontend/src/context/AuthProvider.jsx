// AuthProvider.jsx

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const token = Cookies.get("jwt");
        const token = localStorage.getItem("token")
        console.log("token", token)
        // const parsedToken = token?JSON.parse(token):undefined;

        if (token) {
          const { data } = await axios.get(
            "http://localhost:4001/api/users/my-profile",
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );
          console.log("Profile API Response:", data.user); // Add this
          setProfile(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("Error fetching profile:", error.response || error.message);
      }
    };


    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/blogs/all-blogs",
          {
            withCredentials: true,
          }
        );
        console.log("Blogs data:", data);
        setBlogs(data);
      } catch (error) {
        console.log("Error fetching blogs:", error.response || error.message);
      }
    };

    fetchProfile();
    fetchBlogs();
  }, []);

  return (
    <AuthContext.Provider value={{ blogs, profile,setProfile, isAuthenticated,setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
