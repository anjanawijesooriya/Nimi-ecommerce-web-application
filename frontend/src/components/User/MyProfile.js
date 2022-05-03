import React, { useState, useEffect } from "react";
import { Spin, Card, Button, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import UserImg from "../../assets/user.jpg";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const MyProfile = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);

  const history = useNavigate();

  useEffect(() => {
    (async () => {
      await axios
        .get("/api/auth/get")
        .then((res) => {
          setData(res?.data);
          console.log(res);
        })
        .catch((error) => alert(error));
    })();
  }, []);

  useEffect(() => {
    setTimeout(() => setLoader(!loader), 5000);
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/api/auth/delete/${id}`);
      notification.info({
        title: "Delete Form",
        message: "Successfully Deleted your Account",
        placement: "top",
      });
      localStorage.setItem("authToken", null);
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      window.location.reload();
      history("/register");
    } catch (error) {
      alert(error);
    }
  };

  const filteredData = data.filter(
    (el) => el.email === localStorage.getItem("email")
  );
  console.log(filteredData);

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
                marginTop: 30,
              }}
            >
              <div className="site-card-wrapper">
                <Card
                  hoverable
                  style={{ width: 300, marginTop: 20 }}
                  cover={<img alt="example" src={UserImg} />}
                >
                  <span style={{ fontSize: 20 }}>
                    <b>🤵 UserName:- {filteredData?.[0]?.username}</b>
                  </span>{" "}
                  <br />
                  <br />
                  <span style={{ fontSize: 15 }}>
                    <b>📧 Email:- {filteredData?.[0]?.email}</b>
                  </span>{" "}
                  <br />
                  <br />
                  <div className=" flex p-5 gap-2">
                    <div>
                      <Button
                        type="primary"
                        shape="round"
                        size="large"
                        onClick={() =>
                          history(
                            `/user-dashboard/${localStorage.getItem(
                              "username"
                            )}/myProfile/edit/${filteredData?.[0]?._id}`
                          )
                        }
                      >
                        <EditOutlined />
                        Edit
                      </Button>
                    </div>
                    <div>
                      <Button
                        type="primary"
                        danger
                        shape="round"
                        size="large"
                        onClick={() => deleteHandler(filteredData?.[0]?._id)}
                      >
                        <DeleteOutlined />
                        Delete{" "}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </center>
        )}
      </div>
    </section>
  );
};

export default MyProfile;
