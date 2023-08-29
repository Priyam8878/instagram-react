import React, { useState, useContext, useEffect } from "react";
import Footer from "./Footer";
import axios from "axios";
import TokenContext from '../Context/TokenContext';
// for navigation in pages

import { Link, useNavigate } from "react-router-dom";

// for icon import from react-icons
import { FaFacebookSquare } from "react-icons/fa";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  console.log(user);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  let {token, setToken} = useContext(TokenContext)
  // destructuring the user object
  const { name, email, password } = user;
//   for navigation on dasboard
const navigate = useNavigate()

  function addUser() {
    if (!name || !email || !password) {
      setError("please fill all details");
      setSuccess("successfull signUp");
    } else {
      axios
        .post(`https://instagram-express-app.vercel.app/api/auth/signup`, {
          name,
          email,
          password,
        })
        .then((response) => {
          console.log(response)
          setSuccess(response.data.message)
          setToken(response.data.data.token)
          // localStorage.setItem("token",token)
          localStorage.setItem("token",response.data.data.token)
          setError("")
          setTimeout(() => {
          navigate("/dashboard") }, 2000);
      
      
// 
        })
        .catch((err) =>{
            setError(err)
            console.log(err)
            console.log(" error occoured")
        });
    }
  }

  return (
    <>
      
        <div id="loginParent">
          <div id="login">
            <h1>Instagram</h1>
            <p>Sign up to see photos and videos from your friends.</p>
            <input
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              type="text"
              placeholder="Name"
            />
            <input
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="text"
              placeholder="email"
            />

            <input
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Password"
            />
            <p>
              People who use our service may have uploaded your contact
              information to Instagram. Learn More
            </p>
            <p>
              By signing up, you agree to our Terms , Privacy Policy and Cookies
              Policy .
            </p>
            <button onClick={addUser} id="loginButton">
              Signup
            </button>
            <h3>Or</h3>
            <a href="https://facebook.com">
              <FaFacebookSquare></FaFacebookSquare>Login with facebook
            </a>
          </div>
          <div className="have-account" id="dontHaveAccount">
            {/* <NavLink to="/Signup">Signup</NavLink> */}
            <p>
              have a account? <Link to="/login">Login</Link>
            </p>
          </div>
          <div id="getApp">
            <p>Get the app.</p>
            <div>
              {" "}
              <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" />
              <img src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" />
            </div>
          </div>
        </div>
    

      <Footer></Footer>
    </>
  );
};
export default Signup;
