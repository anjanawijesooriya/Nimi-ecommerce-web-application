import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import "antd/dist/antd.css";
import { ShoppingCartOutlined } from "@ant-design/icons";

import Cart from "../components/User/Cart";

const NavBar = () => {
  let Links = [
    { name: "HOME", link: "/" },
    { name: "ABOUT", link: "/about" },
    { name: "SERVICES", link: "/services" },
    { name: "CONTACT", link: "/contact" },
  ];

  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState([]);

  const location = useLocation();
  const { pathname } = location;
  const { username } = useParams();
  const history = useNavigate();

  console.log(location);

  useEffect(() => {
    setInitialData([...Cart.values()]);
  });

  const logoutHandler = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.setItem("authToken", null);
    localStorage.removeItem("type");
    history("/login");
  };

  return (
    <>
      <div className="shadow-md w-full fixed top-0 left-0 z-10">
        <div className="md:flex items-center justify-between bg-whitepy-2 md:px-10 px-7">
          <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-sky-600">
            {localStorage.getItem("username") !== null ? (
              <>
                <NavLink
                  to={`/user-dashboard/${localStorage.getItem("username")}`}
                >
                  <img
                    src={Logo}
                    alt="logo"
                    className="  w-12 h-12 rounded-full bg-white p-2"
                  />
                </NavLink>
                <span class="ml-3 text-base pl-1 text-orange-700">
                  Bliss E-Commerce
                </span>
              </>
            ) : (
              <NavLink to={"/"}>
                <img
                  src={Logo}
                  alt="logo"
                  className="  w-12 h-12 rounded-full bg-white p-2 ml-8"
                />
                <span class="ml-3 text-sm pl-1 text-orange-700">
                  Bliss E-Commerce
                </span>
              </NavLink>
            )}
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu-sharp"}></ion-icon>
          </div>
          {localStorage.getItem("username") === null ? (
            <>
              <ul
                className={`md:flex md:items-center font-semibold md:pb-0  pb-0 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-10 transition-all duration-500 ease-in ${
                  open ? "top-21 opacity-100" : "top-[-490px]"
                } md:opacity-100`}
              >
                <div className=" flex space-x-6 ml-96 translate-x-80">
                  {Links.map((Link) => (
                    <li
                      key={Link.name}
                      className="md:ml-2 text-base md:my-0 my-7"
                    >
                      <a
                        href={Link.link}
                        className=" text-white hover:text-orange-300 bg-gray-400 rounded-full py-2 hover:py-2 px-4 hover:px-4 hover:rounded-full  duration-500"
                      >
                        {Link.name}
                      </a>
                    </li>
                  ))}
                </div>
              </ul>
              <div className="flex space-x-6">
                <Link to="/login">
                  <button className="inline-flex items-center bg-red-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-black rounded-full text-base mt-4 md:mt-0 translate-x-6">
                    Login
                    <ion-icon name="log-in"></ion-icon>
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className=" ml-96 translate-x-96">
                <NavLink
                  to={`/user-dashboard/${localStorage.getItem(
                    "username"
                  )}/myProfile`}
                >
                  <button
                    type="button"
                    class="bg-orange-500 h-10 w-10 mt-1 ml-56 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    title={"Hello " + username + "❤️"}
                  >
                    <center>
                      <p className=" p-3 mr-4 ml-1 text-white">
                        {username?.substring(0, 1)}
                      </p>
                    </center>
                  </button>
                </NavLink>
              </div>
              <NavLink
                to={`/user-dashboard/${localStorage.getItem("username")}/cart`}
              >
                <div className="bg-red-200 w-28 rounded-3xl flex justify-between items-center p-1 cursor-pointer translate-x-56">
                  <ShoppingCartOutlined className=" text-3xl translate-x-1" />

                  <div className=" rounded-full text-lg  border-4 -translate-x-2 border-red-400 px-1 text-slate-900 ">
                    {initialData.length}
                  </div>
                </div>
              </NavLink>
              <button
                className="inline-flex items-center bg-sky-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-black rounded-full text-base mt-4 md:mt-0 translate-x-4"
                onClick={logoutHandler}
              >
                Logout
                <ion-icon name="log-in"></ion-icon>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
