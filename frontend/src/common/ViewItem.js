import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { Button, Spin, Card } from "antd";
import axios from "axios";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

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
                    <Link to={"/login"}>
                      <span style={{ color: "blue" }}>
                        Make Sure to Login First
                      </span>{" "}
                    </Link>
                    <Button
                      type="primary"
                      shape="round"
                      danger
                      icon={<ShoppingCartOutlined />}
                      size="large"
                      disabled
                      className=" ml-5"
                    >
                      Add to Cart
                    </Button>
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
