import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//common
import Home from "./common/Home";
import NavBar from "./common/NavBar";
import Footer from "./common/Footer";
import PrivateRoute from "./routes/PrivateRoute";

//Components
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/User/Dashboard";
import MyProfile from "./components/User/MyProfile";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={[<NavBar />, <Home />, <Footer />]} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
        </Routes>
      </Router>
    </div>
  );
};

export default App;
