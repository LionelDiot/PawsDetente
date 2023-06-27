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
import Items from "./Components/Items/index";
import Footer from "./Components/Footer/index";
import ResetPassword from "./Components/Users/reset_password";
import Home from "./Components/Home/Home";
import ShowItem from "./Components/Items/show";
import Search from "./Components/Search/Search";
import "./App.css";
import SuccessPayment from "./Components/Checkout/successPayment";
import FailPayment from "./Components/Checkout/failedPayment";
import Cart from "./Components/Cart/show";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Notifications />

      <div
        style={{
          minHeight: "calc(100vh - 275px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profil"
              element={
                <LoggedInRoute>
                  <MyProfile />
                </LoggedInRoute>
              }
            />
            <Route
              path="/panier"
              element={
                <LoggedInRoute>
                  <Cart />
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
              path="/s'enregistrer"
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
            <Route path="/panier" element={<Cart />} />
            <Route path="/articles" element={<Items />} />
            <Route path="/item/:itemSlug" element={<ShowItem />} />
            <Route
              path="/reset_password/:tokenSlug"
              element={<ResetPassword />}
            />
            <Route path="/payment-success" element={<SuccessPayment />} />
            <Route path="/payment-fail" element={<FailPayment />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/rechercher" element={<Search />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
