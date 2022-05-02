import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Button, Spin, Card, Row, Col } from "antd";
import axios from "axios";

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
    setTimeout(() => setLoader(!loader), 5000);
  }, []);

  return (
    <section className=" bg-gray-600 block mx-auto">
      <div>
        {loader === false ? (
          <center>
            <Spin style={{ marginTop: "200px" }} />
          </center>
        ) : (
          <div
            style={{
              display: "inline-block",
              padding: 40,
              justifyItems: "center",
              marginTop: 30,
            }}
          >
            <center>
              <div className="site-card-wrapper">
                <Card
                  hoverable
                  style={{ width: 300 }}
                  cover={<img alt="example" src={data.image} />}
                >
                  <span style={{ fontSize: 20 }}>
                    <b>{data.productName}</b>
                  </span>{" "}
                  <br />
                  <br />
                  <p style={{ fontSize: 20 }}>
                    <b>{data.productDescrip}</b>
                  </p>{" "}
                  <br />
                  <span style={{ fontSize: 20 }}>
                    <b>Rs.{data.productPrice}</b>
                  </span>{" "}
                  <br />
                  {/* <span style={{ fontSize: 20 }}>
                    <b>Items Left: {i.qty}</b>
                  </span>{" "}
                  <br /> */}
                  📅 <span>{moment(data.dateAdded).format("DD MMM YYYY")}</span>{" "}
                  <br />
                  <span style={{ fontSize: 20 }}>
                    <b>{data.status}</b>
                  </span>{" "}
                  <br />
                  <br />
                </Card>
              </div>
            </center>
          </div>
        )}
      </div>
    </section>
  );
};

export default ViewItem;
