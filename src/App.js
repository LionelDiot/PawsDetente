import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notifications from "./Components/Style/Notifications";
import LoggedInRoute from "./Components/privateRoutes/loggedin_route";
import LoggedOutRoute from "./Components/privateRoutes/loggedout_route";
import PageNotFound from "./Components/PageNotFound";
import { Navigate } from "react-router-dom";
import MyProfile from "./Components/MyProfile/index";
import LogIn from "./Components/Users/login";
import Register from "./Components/Users/register";
import Navbar from "./Components/Navbar/Navbar";
import Items from "./Components/Items";
import ResetPassword from "./Components/Users/reset_password";
import Home from "./Components/Home/Home";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Notifications />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/myprofile"
            element={
              <LoggedInRoute>
                <MyProfile />
              </LoggedInRoute>
            }
          />
          {/* <Route
            path="/articles/new"
            element={
              <LoggedInRoute>
                <NewArticle />
              </LoggedInRoute>
            }
          /> */}
          <Route
            path="/register"
            element={
              <LoggedOutRoute>
                <Register />
              </LoggedOutRoute>
            }
          />
          <Route
            path="/login"
            element={
              <LoggedOutRoute>
                <LogIn />
              </LoggedOutRoute>
            }
          />
          {/* <Route path="/articles" element={<Articles />} /> */}
          {/* <Route path="/article/:articleSlug" element={<ShowArticle />} /> */}
          <Route path="/reset_password/:tokenSlug" element={<ResetPassword />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
