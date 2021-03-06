import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Button, Spin, Card, notification } from "antd";
import axios from "axios";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import Cart from "./Cart";

const ViewItem = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () =>
      await axios
        .get(`http://localhost:8070/products/get/${id}`)
        .then((res) => {
          setData(res.data);
          console.log(res);
        }))();
  }, []);

  useEffect(() => {
    setTimeout(() => setLoader(!loader), 2000);
  }, []);

  const addToCart = async (value) => {
    const productName = value.productName;
    const productDescrip = value.productDescrip;
    const productCategory = value.productCategory;
    const productPrice = value.productPrice;
    const qty = value.qty;
    const image = value.image;
    const dateAdded = value.dateAdded;
    const status = value.status;

    const user = localStorage.getItem("username");
    try {
      Cart.set(productName, {
        productName,
        productDescrip,
        productCategory,
        productPrice,
        qty,
        image,
        dateAdded,
        status,
        user,
      });
      console.log(Cart);
      notification.info({
        message: `Notification`,
        description: "Successfully added to the cart 🛒",
        placement: "top",
      });
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement: "top",
      });
    }
  };

  return (
    <section className=" bg-gray-600 block mx-auto">
      <div>
        {loader === false ? (
          <center>
            <Spin style={{ marginTop: "200px" }} />
          </center>
        ) : (
          <center>
            <div
              style={{
                display: "inline-block",
                padding: 40,
                justifyItems: "center",
                marginTop: 50,
              }}
            >
              <center>
                <div>
                  <Card
                    hoverable
                    style={{ width: 800 }}
                    cover={
                      <div style={{ display: "flex" }}>
                        <div className=" p-4">
                          <img
                            alt="example"
                            src={data.image}
                            style={{
                              backgroundSize: "cover",
                              height: 500,
                              width: 500,
                            }}
                          />
                        </div>
                        <div className=" mt-40">
                          <span style={{ fontSize: 20 }}>
                            <b>{data.productName}</b>
                          </span>{" "}
                          <p style={{ fontSize: 20 }}>
                            <b>{data.productDescrip}</b>
                          </p>{" "}
                          <br />
                          <span style={{ fontSize: 20 }}>
                            <b>Rs.{data.productPrice}</b>
                          </span>{" "}
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📅{" "}
                          <span>
                            {moment(data.dateAdded).format("DD MMM YYYY")}
                          </span>{" "}
                          <br />
                          <br />
                          <br />
                          <div className=" mt-20">
                            {data.status === "Out Of Stock" ? (
                              <span style={{ fontSize: 20 }}>
                                <b>
                                  <strike>{data.status}</strike>
                                </b>
                              </span>
                            ) : (
                              <span style={{ fontSize: 20 }}>
                                <b>{data.status}</b>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    }
                  >
                    {" "}
                    {data.status === "Out Of Stock" ? (
                      <Button
                        type="primary"
                        shape="round"
                        danger
                        icon={<ShoppingCartOutlined />}
                        size="large"
                        disabled
                      >
                        Add to Cart
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        shape="round"
                        danger
                        icon={<ShoppingCartOutlined />}
                        size="large"
                        onClick={() => addToCart(data)}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </Card>
                </div>
              </center>
            </div>
          </center>
        )}
      </div>
    </section>
  );
};

export default ViewItem;
