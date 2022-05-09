import React, { useState, useEffect } from "react";
import { Carousel, Image, Button, Spin, Card } from "antd";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

import "antd/dist/antd.css";
//carousel
import bg1 from "../assets/Home/bg5.jpg";
import bg2 from "../assets/Home/bg6.jpg";
import bg3 from "../assets/Home/bg7.jpg";
import bg4 from "../assets/Home/bg8.jpg";
import bg5 from "../assets/Home/bg10.jpg";


const Home = () => {
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

  const filteredData = data.filter(
    (el) => el?.productName?.toLowerCase().indexOf(query) >= 0
  );
  return (
    <>
      <section>
        <Carousel effect="fade" autoplay>
          <div>
            <img src={bg1} alt="bg1" />
          </div>
          <div>
            <img src={bg2} alt="bg2" />
          </div>
          <div>
            <img src={bg3} alt="bg3" />
          </div>
          <div>
            <img src={bg4} alt="bg4" />
          </div>
          <div>
            <img src={bg5} alt="bg5" />
          </div>
        </Carousel>
      </section>

      <section className=" bg-gray-800 block mx-auto">
        <center>
          <div className="container">
            <div class="flex items-center justify-center ml-96">
              <div class="flex border-2 border-gray-200 rounded mt-20 ml-80 translate-x-80">
                <input
                  type="text"
                  className="px-4 py-2 w-80"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              {loader === false ? (
                <center>
                  <Spin style={{ marginTop: "200px" }} />
                </center>
              ) : filteredData.length === 0 ? (
                <center>
                  <span style={{ color: "red", fontSize: "50px" }}>
                    No Matching Results Found
                  </span>
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
                        <p style={{ fontSize: 16 }}>
                          <b>{i.productDescrip}</b>
                        </p>{" "}
                        <br />
                        <span style={{ fontSize: 20 }}>
                          <b>Rs.{i.productPrice}</b>
                        </span>{" "}
                        <br />
                        📅{" "}
                        <span>
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
                          <Link to={`/viewitem/${i._id}`}>
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
          </div>
        </center>
      </section>
    </>
  );
};

export default Home;
