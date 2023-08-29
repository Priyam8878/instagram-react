import React,{useContext,useEffect,useState} from "react";
import axios from "axios";
import TokenContext from "../Context/TokenContext";
import { useNavigate } from "react-router-dom";
const MyPost = () => {

    const [postData ,setPostData] = useState([])
    
  const { token, setToken } = useContext(TokenContext);
  useEffect(() => {
    if (!token) {
      setToken(localStorage.getItem("token"));
      console.log(localStorage.getItem("token"));
    }
  }, []);

 
   
    // myPost function
function myPost(){
    console.log("my post")
    if (token) {
        axios
          .get("https://instagram-express-app.vercel.app/api/post/all-posts", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response.data.data);
          setPostData(response.data.data)
          console.log(postData)
          })
          .catch((err) => {
            console.log(err);
          });
      }
   
}

  return(<>
<button onClick={myPost}>My Post</button>
  </>
  ) 
};
export default MyPost;
