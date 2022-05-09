import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import { Button } from "antd";
import {
  FundProjectionScreenOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import "antd/dist/antd.css";
import "./Dashboard.css";

import CarouselView from "./CarouselView";
import NavBar from "./NavBar";

//product components
import ProductDashboard from "./Product/ProductDashboard";
import AddProduct from "./Product/AddProduct";
import ViewProducts from "./Product/ViewProducts";
import EditProduct from "./Product/EditProduct";

import Logo from "../../assets/logo.png";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useNavigate();
  const location = useLocation();
  const search = window.location.search;

  const param = new URLSearchParams(search);

  console.log(location.pathname);

  //product
  const queryProduct = param.get("_optProduct");
  const queryAddProduct = param.get("_product");
  const queryViewProduct = param.get("_product");
  const queryEditProduct = param.get("_product");

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const date = new Date();
  const hrs = date.getHours();

  let greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs < 17) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs < 19) greet = "Good Evening";
  else greet = "Good Night";

  const setHeader = (type) => {
    switch (type) {
      case "dashboard":
        document.getElementById("header").innerHTML = "Dashboard";
        break;
      case "product":
        document.getElementById("header").innerHTML = "Product Management";
        break;
      default:
        break;
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("type");
    localStorage.setItem("authToken", null);
    history("/login");
    window.location.reload();
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        width="270px"
      >
        <div>
          <img
            src={Logo}
            alt="logo"
            onClick={() => {
              history(`/admin-dashboard/${localStorage.getItem("username")}`);
              setHeader("dashboard");
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={
            queryProduct === "product"
              ? ["1"]
              : null
          }
        >
          <Menu.Item
            key="1"
            icon={<FundProjectionScreenOutlined />}
            className="text-lg"
            onClick={() => {
              setHeader("product");
              history(
                `/admin-dashboard/${localStorage.getItem(
                  "username"
                )}?_optProduct=product`
              );
            }}
          >
            Product Management
          </Menu.Item>
        </Menu>
        {collapsed === false ? (
          <center className="my-12">
            <Button
              icon={<LogoutOutlined className="-translate-y-0.5" />}
              onClick={logoutHandler}
            >
              Sign Out
            </Button>
          </center>
        ) : (
          <center className="my-12 hover:rounded-full hover:bg-slate-500 p-4  hover:mx-4">
            <LogoutOutlined
              style={{ color: "white", cursor: "pointer" }}
              className="-translate-y-0.5"
            />
          </center>
        )}
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, textAlign: "center" }}
        >
          <h1 id="header" style={{ fontFamily: "serif", fontSize: "20px" }}>
            {queryProduct === "product" || queryAddProduct === "addproduct" || queryViewProduct === "allproduct" || queryEditProduct === "edit"
              ? "Product Management"
              : "Dashboard"}
          </h1>
        </Header>

        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{greet}</Breadcrumb.Item>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
          </Breadcrumb>
          {location.pathname ===
            `/admin-dashboard/${localStorage.getItem("username")}` &&
            !queryProduct &&
            !queryAddProduct &&
            !queryViewProduct && 
            !queryEditProduct && <CarouselView />}
          {queryProduct === "product" && [<NavBar />, <ProductDashboard />]}
          {queryAddProduct === "addproduct" && [<NavBar />, <AddProduct />]}
          {queryViewProduct === "allproduct" && [ <NavBar />, <ViewProducts />]}
          {queryEditProduct === "edit" && [<NavBar />, <EditProduct />]}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright © {date.getFullYear()} Bliss E-Commerce
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
