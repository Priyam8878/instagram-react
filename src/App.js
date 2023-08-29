

import React from "react"; 
import "./App.css";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Signup from "./Components/Signup";




import {Routes, Route} from "react-router-dom";


const App = () => {


    return(
        <div>
            
            <Routes>

                <Route path="/" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
               



            </Routes>
        </div>
    )
}

export default App;
