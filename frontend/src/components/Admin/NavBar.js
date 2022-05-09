import React from "react";
import { Button } from "antd";
import { HomeTwoTone } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const history = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className=" mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-16">
      <div className="text-4xl float-left translate-x-4">
        <HomeTwoTone
          onClick={() =>
            history(
              `/admin-dashboard/${localStorage.getItem(
                "username"
              )}?_optProduct=product`
            )
          }
        />
      </div>
      <div className="pt-4 flex">
        <div className="mx-auto -translate-x-6">
          <Button
            type="primary"
            danger
            onClick={() =>
              history(
                `/admin-dashboard/${localStorage.getItem(
                  "username"
                )}?_product=addproduct`
              )
            }
          >
            Add Product
          </Button>{" "}
          <Button
            type="primary"
            danger
            onClick={() =>
              history(
                `/admin-dashboard/${localStorage.getItem(
                  "username"
                )}?_product=allproduct`
              )
            }
          >
            All Products
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
