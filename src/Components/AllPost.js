import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import TokenContext from "../Context/TokenContext";
import { useNavigate } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

const AllPost = () => {
  const [postData, setPostData] = useState([]);

  const { token, setToken } = useContext(TokenContext);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!token) {
      setToken(localStorage.getItem("token"));
      console.log(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get("https://instagram-express-app.vercel.app/api/post/all-posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          //   console.log(response.data.data);
          setPostData(response.data.data);

          // console.log(postData)
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        });
    }
  }, [token]);

  return (
    <>
      {/* <h1>All Post From your Friend</h1> */}
      <div id="allPostDisplay">
        {<h3>Scroll to See all posts</h3> || error}

        {token &&
          postData.map((post) => (
            <div class="post-card">
               
              <div class="post-header">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png"
                  alt="Profile Picture"
                />
                <span class="username">{post.user}</span>
              
              </div>
              <img src={post.image} alt="Post Image" class="post-image" />
              <div class="post-footer">
                <button class="like-button"><BsHeart/>   Like:{post.likes}</button>
                <button class="comment-button"><FaRegComment/>     Comment</button>
              </div>
              <p>{post.text}</p>
             
            </div>
          ))}
      </div>
    </>
  );
};
export default AllPost;
