// import React, { useContext, useState, useEffect } from "react";
// import Footer from "./Footer";
// import axios from "axios";
// // import TokenContext from "../Context/TokenContext";
// // for navigation in pages
// import { Link, useNavigate } from "react-router-dom";

// // for icon import from react-icons
// import { FaFacebookSquare } from "react-icons/fa";

// const Login = () => {
//   const [detail, setDetail] = useState({
//     email: "",
//     password: "",
//   });
//   // destructuring detail
//   const { email, password } = detail;

//   const [error, setError] = useState("");
//   const [succes, setSucces] = useState("");

//   // const{ token ,setToken}=useContext(TokenContext)
//   const navigate = useNavigate();

//   function LoginUser() {
   
//     if (!email || !password) {
//       setError("Please fill all details");
//       setSucces("");
//     } else {
//       axios
//         .post(`https://instagram-express-app.vercel.app/api/auth/login`, {
//           email,
//           password,
//         })
//         .then((response) => {
//           console.log(response.data.data.token);
//           // setToken(response.data.data.token)
//           // localStorage.setItem("token",response.data.data.token)
//           setSucces("Successfully LogedIn");
//           navigate("/dashboard");
//         })
//         .catch((err) => {
//           setError(err);
//         });
//     }
//   }

//   return (
//     <>
//       <div id="loginParent">
//         <div id="login">
//           <h3>Instagram</h3>
//           <input
//             value={email}
//             onChange={(e) => setDetail({ ...detail, email: e.target.value })}
//             type="text"
//             placeholder="Phone number, username, or email"
//           />
//           <input
//             value={password}
//             onChange={(e) => setDetail({ ...detail, password: e.target.value })}
//             type="password"
//             placeholder="Password"
//           />
//           <button id="loginButton" onClick={LoginUser}>
//             Login
//           </button>
//           <h3>Or {succes || error}</h3>
//           <a href="https://facebook.com">
//             <FaFacebookSquare></FaFacebookSquare>Login with facebook
//           </a>
//         </div>
//         <div id="dontHaveAccount">
//           {/* <NavLink to="/Signup">Signup</NavLink> */}
//           <p>
//             Dont have account? <Link to="/">Signup</Link>
//           </p>
//         </div>
//         <div id="getApp">
//           <p>Get the app.</p>
//           <div>
            
//             <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" />
//             <img src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" />
//           </div>
//         </div>
//       </div>
//       <Footer></Footer>
//     </>
//   );
// };
// export default Login;




import React, {useState, useContext} from 'react';
import Footer from './Footer';
import { FaFacebookSquare } from "react-icons/fa";
import TokenContext from '../Context/TokenContext';
 import axios from "axios";
import {Link, useNavigate } from 'react-router-dom';



const Login = () => {
   const [user,setUser] = useState({
         email:"", password:""
   })


   // check if token is stored in Localstorage if it ti sthere redirect user to dashboard

   let [error,setError] = useState()
   let [success,setSuccess] = useState()

   let {token, setToken} = useContext(TokenContext)

   let {email,password} = user;

    const navigate = useNavigate();


   console.log("Token from context: ",token)

   function addUser(e){
         e.preventDefault();

         // validations: 

         if( !email || !password ){
            setError("Please fill all the details")
            setSuccess("")
            return
         }

         

        axios.post("https://instagram-express-app.vercel.app/api/auth/login", 
        {
         email, password
        }
        )
        .then(response => {
            setSuccess(response.data.message)
            setToken(response.data.data.token)
            // localStorage.setItem("token",token)
            localStorage.setItem("token",response.data.data.token)
            setError("")
            setTimeout(() => {
            navigate("/dashboard") }, 2000);
        
        })
        .catch(err =>{
            setError(err.response.data.message)
            setSuccess("")
        })

            
          


         // api:
       
   }



    return(

      <>
      <div id="loginParent">
        <div id="login">
          <h3>Instagram</h3>
    
          <input
            value={email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="text"
            placeholder="Phone number, username, or email"
          />
          <input
            value={password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="Password"
          />
          <h3>{success || error}</h3>
          <button id="loginButton" onClick={addUser}>
            Login
          </button>
          <h3>Or </h3>
          <a href="https://facebook.com">
            <FaFacebookSquare></FaFacebookSquare>Login with facebook
          </a>
        </div>
        <div id="dontHaveAccount">
          {/* <NavLink to="/Signup">Signup</NavLink> */}
          <p>
            Dont have account? <Link to="/">Signup</Link>
          </p>
        </div>
        <div id="getApp">
          <p>Get the app.</p>
          <div id='get-app-img'>
            
            <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" />
            <img src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
    
    )
}

export default Login;

