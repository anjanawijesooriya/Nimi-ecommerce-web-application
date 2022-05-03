import React, { useState, useEffect } from "react";
import { Image, Button, Spin, Card, Row, Col, Form, Input } from "antd";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

import FilterCategory from "./FilterCategory";
import "antd/dist/antd.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () =>
      await axios.get("http://localhost:8070/products/").then((res) => {
        setData(res.data);
        console.log(res);
      }))();
  }, []);

  useEffect(() => {
    setTimeout(() => setLoader(!loader), 5000);
  }, []);

  const { Meta } = Card;

  const filteredData = data.filter(
    (el) => el?.productName?.toLowerCase().indexOf(query) >= 0
  );

  return (
    <>
      <section className=" bg-gray-600 block mx-auto">
        <div class="flex items-center justify-center ml-96">
          <div class="flex border-2 border-gray-200 rounded mt-20 ml-96 translate-x-3/4">
            <input
              type="text"
              className="px-4 py-2 w-80"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className=" float-right -mt-8 mr-14">
          <FilterCategory />
        </div>
        <div>
          {loader === false ? (
            <center>
              <Spin style={{ marginTop: "200px" }} />
            </center>
          ) : (
            filteredData.map((i) => (
              <div
                style={{
                  display: "inline-block",
                  padding: 40,
                  justifyItems: "center",
                  marginTop: 30,
                }}
              >
                <div className="site-card-wrapper">
                  <Card
                    hoverable
                    style={{ width: 300 }}
                    cover={<img alt="example" src={i.image} />}
                  >
                    <span style={{ fontSize: 20 }}>
                      <b>{i.productName}</b>
                    </span>{" "}
                    <br />
                    <br />
                    <p style={{ fontSize: 20 }}>
                      <b>{i.productDescrip}</b>
                    </p>{" "}
                    <br />
                    <span style={{ fontSize: 20 }}>
                      <b>Rs.{i.productPrice}</b>
                    </span>{" "}
                    <br />
                    📅 <span>
                      {moment(i.dateAdded).format("DD MMM YYYY")}
                    </span>{" "}
                    <br />
                    {i.status === "Out Of Stock" ? (
                      <span style={{ fontSize: 20 }}>
                        <b>
                          <strike>{i.status}</strike>
                        </b>
                      </span>
                    ) : (
                      <span style={{ fontSize: 20 }}>
                        <b>{i.status}</b>
                      </span>
                    )}
                    <br />
                    <br />
                    <center>
                      <Link
                        to={`/user-dashboard/${localStorage.getItem(
                          "username"
                        )}/viewitem/${i?._id}`}
                      >
                        <Button type="primary" shape="round" size="large">
                          View Item
                        </Button>
                      </Link>
                    </center>
                  </Card>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
