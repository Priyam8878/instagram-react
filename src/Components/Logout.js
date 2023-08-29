import React,{useContext,useEffect} from "react";
import axios from "axios";
import TokenContext from "../Context/TokenContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { token, setToken } = useContext(TokenContext);
const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      setToken(localStorage.getItem("token"));
      console.log(localStorage.getItem("token"));
    }
  }, []);

  // logout function
  function logout() {
    console.log("logout");
    if (token) {
      axios
        .delete("https://instagram-express-app.vercel.app/api/auth/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data.data);
         navigate("/login")
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <button onClick={logout} id="logout">
        Logout
      </button>
    </>
  );
};
export default Logout;
