import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notifications from "./Components/Style/Notifications";
import AdminRoute from "./Components/privateRoutes/admin_route";
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
import ForgottenPassword from "./Components/Users/forgotten_password";
import Home from "./Components/Home/Home";
import ShowItem from "./Components/Items/show";
import Search from "./Components/Search/Search";
import "./App.css";
import SuccessPayment from "./Components/Checkout/successPayment";
import FailPayment from "./Components/Checkout/failedPayment";
import Cart from "./Components/Cart/show";
import Dashboard from "./Components/Admin/dashboard";

// Jotai
import { useSetAtom, useAtomValue } from "jotai";
import { currentUserAtom } from "./Atoms/currentuser";
import { UserIdAtom } from "./Atoms/userid";
import { loggedInAtom } from "./Atoms/loggedin";

import Favs from "./Components/Home/Favs";
import ChangePassword from "./Components/Users/change_password";
import ChangeEmail from "./Components/Users/change_email";

function App() {
  const loggedIn = useAtomValue(loggedInAtom);
  const user = useAtomValue(currentUserAtom);
  const setUser = useSetAtom(currentUserAtom);
  const setUserId = useSetAtom(UserIdAtom);
  const userid = useAtomValue(UserIdAtom);

  return (
    <BrowserRouter>
      <Navbar />
      <Notifications />

      <div
        style={{
          minHeight: "calc(100vh - 231px)",
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
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/edit-password"
              element={
                 <LoggedInRoute>
                <ChangePassword />
                 </LoggedInRoute>
              }
            />
            <Route
              path="/edit-email"
              element={
                 <LoggedInRoute>
                <ChangeEmail />
                 </LoggedInRoute>
              }
            />

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
            <Route path="/favoris" element={<LoggedInRoute><Favs /></LoggedInRoute>} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/rechercher" element={<Search />} />
            <Route path="/forgotten-password" element={<ForgottenPassword />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
