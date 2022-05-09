import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//common
import Home from "./common/Home";
import NavBar from "./common/NavBar";
import Footer from "./common/Footer";
import Item from "./common/ViewItem";
import PrivateRoute from "./routes/PrivateRoute";
import PageNotFound from "./routes/PageNotFound";

//Components
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/User/Dashboard";
import MyProfile from "./components/User/MyProfile";
import AdminDashboard from "./components/Admin/Dashboard";
import ViewItem from "./components/User/ViewItem";
import EditProfile from "./components/User/EditProfile";
import Viewcart from "./components/User/ViewCart";
import ResetPassword from "./components/Login/ResetPassword";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={[<NavBar />, <Home />, <Footer />]} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/passwordreset/:resetToken"
            element={<ResetPassword />}
          />

          {/*user*/}
          <Route
            path="/user-dashboard/:username"
            element={
              <PrivateRoute>
                <NavBar />
                <Dashboard />
                <Footer />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-dashboard/:username/myProfile"
            element={
              <PrivateRoute>
                <NavBar />
                <MyProfile />
                <Footer />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-dashboard/:username/viewitem/:id"
            element={
              <PrivateRoute>
                <NavBar />
                <ViewItem />
                <Footer />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-dashboard/:username/myProfile/edit/:id"
            element={
              <PrivateRoute>
                <NavBar />
                <EditProfile />
                <Footer />
              </PrivateRoute>
            }
          />
          <Route
            path="/viewitem/:id"
            element={[<NavBar />, <Item />, <Footer />]}
          />
          <Route
            path="/user-dashboard/:username/cart"
            element={
              <PrivateRoute>
                <NavBar />
                <Viewcart />
                <Footer />
              </PrivateRoute>
            }
          />

          {/*admin*/}
          <Route
            path="/admin-dashboard/:username"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
