import React, { useState, useEffect } from "react";
import { Image, Button, Spin, Card, Dropdown, Space, Menu } from "antd";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

import "antd/dist/antd.css";
import { DownOutlined, FilterTwoTone } from "@ant-design/icons";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [query, setQuery] = useState("");

  let [filteredDataCategory, setFilteredDataCategory] = useState([]);

  useEffect(() => {
    (async () =>
      await axios.get("http://localhost:8070/products/").then((res) => {
        setData(res.data);
        setFilteredDataCategory(res.data);
        console.log(res);
      }))();
  }, []);

  useEffect(() => {
    setTimeout(() => setLoader(!loader), 5000);
  }, []);

  const handleFilter = (filteredValue) => {
    console.log(filteredValue);
    if (filteredValue !== "Reset") {
      filteredDataCategory = data.filter(
        (el) => el.productCategory.indexOf(filteredValue) >= 0
      );
      console.log(filteredDataCategory);
      setFilteredDataCategory(filteredDataCategory);
    } else setFilteredDataCategory(data);
  };

  console.log(filteredDataCategory);

  const { Meta } = Card;

  filteredDataCategory = filteredDataCategory.filter(
    (el) => el?.productName?.toLowerCase().indexOf(query) >= 0
  );

  const menu = (
    <Menu
      items={[
        {
          label: (
            <div>
              <option value="Fashions" onClick={() => handleFilter("Fashions")}>
                Fashions
              </option>
            </div>
          ),
        },
        {
          label: (
            <div>
              <option value="Makeups" onClick={() => handleFilter("Makeups")}>
                Makeups
              </option>
            </div>
          ),
        },
        {
          label: (
            <div>
              <option
                value="Jewelleries"
                onClick={() => handleFilter("Jewelleries")}
              >
                Jewelleries
              </option>
            </div>
          ),
        },
        {
          label: (
            <div>
              <option
                value="Electronics"
                onClick={() => handleFilter("Electronics")}
              >
                Electrics
              </option>
            </div>
          ),
        },
        {
          label: (
            <div>
              <option value="Toys" onClick={() => handleFilter("Toys")}>
                Toys
              </option>
            </div>
          ),
        },
        {
          label: (
            <div>
              <option
                value="Computers and Phones"
                onClick={() => handleFilter("Computers and Phones")}
              >
                Computers & Phones
              </option>
            </div>
          ),
        },
        {
          label: (
            <div>
              <Button onClick={() => handleFilter("Reset")}>Reset</Button>
            </div>
          ),
        },
      ]}
    />
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
          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <FilterTwoTone style={{ fontSize: 20 }} />
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
        <div>
          {loader === false ? (
            <center>
              <Spin style={{ marginTop: "200px" }} />
            </center>
          ) : filteredDataCategory.length === 0 ? (
            <center>
              <span style={{ color: "red", fontSize: "50px"}}>No Matching Results Found</span>
            </center>
          ) : (
            filteredDataCategory.map((i) => (
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
