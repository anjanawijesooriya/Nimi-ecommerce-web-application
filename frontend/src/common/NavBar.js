import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import "antd/dist/antd.css";

const NavBar = () => {
  let Links = [
    { name: "HOME", link: "/" },
    { name: "ABOUT", link: "/about" },
    { name: "SERVICES", link: "/services" },
    { name: "CONTACT", link: "/contact" },
  ];

  const [open, setOpen] = useState(false);

  const location = useLocation();
  const { pathname } = location;
  const { username } = useParams();

  console.log(location);

  return (
    <>
      <div className="shadow-md w-full fixed top-0 left-0 z-10">
        <div className="md:flex items-center justify-between bg-whitepy-2 md:px-10 px-7">
          <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-sky-600">
            <img
              src={Logo}
              alt="logo"
              className="  w-14 h-14 rounded-full bg-white p-2"
            />
            <span class="ml-3 text-xl pl-1 text-orange-700">
              Bliss E-Commerce
            </span>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu-sharp"}></ion-icon>
          </div>

          <ul
            className={`md:flex md:items-center font-semibold md:pb-0  pb-0 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-10 transition-all duration-500 ease-in ${
              open ? "top-21 opacity-100" : "top-[-490px]"
            } md:opacity-100`}
          >
            {Links.map((Link) => (
              <li key={Link.name} className="md:ml-2 text-base md:my-0 my-7">
                <a
                  href={Link.link}
                  className=" text-white hover:text-orange-500 py-2 hover:py-2 px-4 hover:px-4 hover:rounded-full  duration-500"
                >
                  {Link.name}
                </a>
              </li>
            ))}
            <div className="flex space-x-6">
              {pathname === "/" ||
              pathname === "/contact" ||
              pathname === "/services" ||
              pathname === "/about" ? (
                <Link to="/login">
                  <button className="inline-flex items-center bg-red-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-black rounded-full text-base mt-4 md:mt-0 translate-x-6">
                    Login
                    <ion-icon name="log-in"></ion-icon>
                  </button>
                </Link>
              ) : (
                <>
                  <div>
                    <NavLink
                      to={`/user-dashboard/${localStorage.getItem(
                        "username"
                      )}/myProfile`}
                    >
                      <button
                        type="button"
                        class="bg-gray-400 h-10 w-10 mt-1 ml-8 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        title={"Hello " + username + "❤️"}
                      >
                        <center>
                          <p className=" p-3 mr-4 ml-1 text-white">
                            {username.substring(0, 1)}
                          </p>
                        </center>
                      </button>
                    </NavLink>
                  </div>
                  <button className="inline-flex items-center bg-sky-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-black rounded-full text-base mt-4 md:mt-0 translate-x-4">
                    Logout
                    <ion-icon name="log-in"></ion-icon>
                  </button>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
