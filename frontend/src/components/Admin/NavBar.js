import React from "react";
import { Button } from "antd";
import { HomeTwoTone } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const history = useNavigate();
  const search = window.location.search;
  const location = useLocation();
  console.log(location.pathname);

  const param = new URLSearchParams(search);

  //product
  const queryProduct = param.get("_optProduct");
  const queryAddProduct = param.get("_product");
  const queryViewProduct = param.get("_product");
  const queryEditProduct = param.get("_product");

  //order
  const queryOrder = param.get("_optOrder");

  return queryProduct === "product" || queryAddProduct === "addproduct" || queryViewProduct === "allproduct" || queryEditProduct === "edit" ? (
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
  ) : queryOrder === "order" (
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
                )}?_product=allproduct`
              )
            }
          >
            All Orders
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
