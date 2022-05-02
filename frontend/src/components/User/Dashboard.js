import React, { useState, useEffect } from "react";
import { Image, Button, Spin, Card, Row, Col } from "antd";
import axios from "axios";

//categories
// import fashions from "../../assets/Home/fashion.jpg";
// import jewelleries from "../../assets/Home/jewellery.jpg";
// import makeups from "../../assets/Home/makeup.jpg";
// import electronics from "../../assets/Home/electronics.jpg";
// import toys from "../../assets/Home/toys.jpg";
// import compphone from "../../assets/Home/computerphone.jpg";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () =>
      await axios
        .get("http://localhost:8070/products/")
        .then((res) => {setData(res.data); console.log(res)}))();
  }, []);

  useEffect(() => {
    setTimeout(() => setLoader(!loader), 5000);
  }, []);

  const { Meta } = Card;

  // const filteredData = data.filter(
  //   (el) => el?.productCategory?.toLowerCase().indexOf(query) >= 0
  // );

  return (
    <section className=" bg-gray-600 block mx-auto">
      {/* <center>
        <div className="container">
          <div className=" inline-block columns-2  my-20 gap-24">
            <div>
              <Image style={{ width: 400 }} src={fashions} preview={false} />
              <div className="top-1/2 w-full text-center text-4xl">
                <Button type="primary" danger size="large" block>
                  <div className=" font-semibold text-xl">Fashions</div>
                </Button>
              </div>
            </div>
            <br />
            <br />
            <div>
              <Image style={{ width: 400 }} src={jewelleries} preview={false} />
              <div className="top-1/2 w-full text-center text-4xl">
                <Button type="primary" danger size="large" block>
                  <div className=" font-semibold text-xl">Jewelleries</div>
                </Button>
              </div>
            </div>
            <br />
            <br />
            <div>
              <Image style={{ width: 400 }} src={makeups} preview={false} />
              <div className="top-1/2 w-full text-center text-4xl">
                <Button type="primary" danger size="large" block>
                  <div className=" font-semibold text-xl">Makeups</div>
                </Button>
              </div>
            </div>
            <br />
            <br />
            <div>
              <Image style={{ width: 400 }} src={electronics} preview={false} />
              <div className="top-1/2 w-full text-center text-4xl">
                <Button type="primary" danger size="large" block>
                  <div className=" font-semibold text-xl">Electronics</div>
                </Button>
              </div>
            </div>
            <br />
            <br />
            <div>
              <Image style={{ width: 400 }} src={toys} preview={false} />
              <div className="top-1/2 w-full text-center text-4xl">
                <Button type="primary" danger size="large" block>
                  <div className=" font-semibold text-xl">Toys</div>
                </Button>
              </div>
            </div>
            <br />
            <br />
            <div>
              <Image style={{ width: 400 }} src={compphone} preview={false} />
              <div className="top-1/2 w-full text-center text-4xl">
                <Button type="primary" danger size="large" block>
                  <div className=" font-semibold text-xl">
                    Computers and Phones
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </center> */}
      <div>
        {loader === false ? (
          <center>
            <Spin style={{ marginTop: "200px" }} />
          </center>
        ) : (
          data.map((i) => (
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
                  {/* <span style={{ fontSize: 20 }}>
                    <b>Items Left: {i.qty}</b>
                  </span>{" "}
                  <br /> */}
                  📅 <span>{moment(i.dateAdded).format("DD MMM YYYY")}</span>{" "}
                  <br />
                  <span style={{ fontSize: 20 }}>
                    <b>{i.status}</b>
                  </span>{" "}
                  <br />
                  <br />
                  {loader === false ? (
                    <center>
                      <Button
                        type="primary"
                        shape="round"
                        size="large"
                        icon={<Spin indicator={<LoadingOutlined />} />}
                      >
                        Item View in Progress...
                      </Button>
                    </center>
                  ) : (
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
                  )}
                </Card>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Dashboard;
