import React, { useState, useEffect, useContext } from "react";

import { BsInstagram } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { BiSolidSearch } from "react-icons/bi";
import { MdExplore } from "react-icons/md";
import { BsCameraReelsFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { BsMessenger } from "react-icons/bs";
import { LuPlusSquare } from "react-icons/lu";

import Footer from "./Footer";
import axios from "axios";
import TokenContext from "../Context/TokenContext";
import { useNavigate } from "react-router-dom";
import Upload from "./Upload";
import MyPost from "./MyPost";
import Logout from "./Logout";
import AllPost from "./AllPost";
const Dashboard = () => {
  const { token, setToken } = useContext(TokenContext);
  const [name, setName] = useState("");
  const [zuku, setZuku] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setToken(localStorage.getItem("token"));
      console.log(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get("https://instagram-express-app.vercel.app/api/auth/zuku", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          console.log(response.data.data.user.name, response.data.data.message);
          setName(response.data.data.user.name);
          setZuku(response.data.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  return (
    <>
      {/*  */}
      <nav class="topnav">
        <div id="leftNav">
          <Upload></Upload>
        </div>
        <div id="middleNav">
          <p>Welcome:{name}</p>
        </div>
        <div id="rightNav">
          <MyPost></MyPost>
          <Logout></Logout>
        </div>
      </nav>
      <div id="navbar" class="sidebar">
        <AiOutlineHome className="icon"></AiOutlineHome>
        <BsInstagram className="icon"></BsInstagram>

        <BiSolidSearch className="icon"> </BiSolidSearch>
        <MdExplore className="icon"></MdExplore>
        <BsCameraReelsFill className="icon"></BsCameraReelsFill>
        <BsMessenger className="icon"></BsMessenger>
        <BsHeart className="icon"></BsHeart>
        <LuPlusSquare className="icon"></LuPlusSquare>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" alt="Profile Picture"/>
      </div>

      <div class="content">
        <AllPost></AllPost>
        <p>{name}</p>
        <p>{zuku}</p>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Dashboard;
