import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";


const AppRouter = ({isLoggedIn, userObj}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Routes>

                {
                    isLoggedIn
                        ? (
                            <>
                            < Route path="/" element={<Home userObj={userObj} />} />
                            <Route path="/profile" element={<Profile userObj={userObj} />} />
                           
                         <Route path="*" element={ <Navigate replace tp="/" />} />
                        </>
                        )
                        : (<>
                            < Route path="/" element={<Auth />} />
                             <Route path="*" element={ <Navigate replace tp="/" />} />
                        </>)
                }

            </Routes>
        </Router>
    )
}
export default AppRouter;