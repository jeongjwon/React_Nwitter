import React from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import {Navigate} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
    console.log(isLoggedIn);
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <div
                style={{
                    maxWidth: 890,
                    width: "100%",
                    margin: "0 auto",
                    marginTop: 80,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                
            <Routes>
                {isLoggedIn ? (
                   
                    <>
                        
                    
                                <Route
                                    path="/" 
                                    element={<Home userObj={userObj} />} />
                                <Route
                                    path="/profile"
                                    element={
                                            <Profile userObj={userObj} refreshUser = {refreshUser } />}/>

                                <Route path="*" element={<Navigate replace tp = "/" />}/>
                                 
                                
                        </>
                       
                        )
                        : (
                            <> < Route path = "/" element = {
                                <Auth/>
                            } /> <Route path="*" element={<Navigate replace tp = "/" />}/>
                        </>
                        )
                }

                </Routes>
                
            </div>
        </Router>
    )
}
export default AppRouter;