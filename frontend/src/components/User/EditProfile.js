import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Spin,
  Tooltip,
  notification,
  Checkbox,
  Card,
} from "antd";
import {
  FileDoneOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import axios from "axios";

import "antd/dist/antd.css";
import UserImg from "../../assets/user.jpg";
import { useParams } from "react-router-dom";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const EditProfile = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { id } = useParams();

  const [form] = Form.useForm();

  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 5000);
    (async () => {
      await axios
        .get(`/api/auth/get/${id}`)
        .then((res) => {
          form.setFieldsValue({
            username: res.data.username,
            email: res.data.email,
            password: res.data.password,
            confirmPassword: res.data.confirmPassword,
          });
          setUsername(res.data.username);
          setEmail(res.data.email);
          setPassword(res.data.password);
          setConfirmPassword(res.data.confirmPassword);
        })
        .catch(() => null);
    })();
  }, []);

  const userHandlerUpdate = async (placement) => {
    // create handler for saving data to the db
    setLoader(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      //method for cheking the password an confirm password
      setPassword("");
      setConfirmPassword("");
      setLoader(false);
      setIsError(true);
      setTimeout(() => {
        setError("");
      }, 5000);

      return setError("Password did not match");
    }

    try {
      await axios.put(
        //use axios API
        `/api/auth/update/${id}`,
        {
          username,
          email,
          password,
        },
        config
      );
      setTimeout(() => {
        //set a time out
        setLoader(false);
        notification.info({
          message: `Notification`,
          description: "Successfully updated the user details 😘",
          placement,
        });
        form.resetFields();
      }, 5000); //5seconds timeout
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement,
      });
      setError(true);
      form.resetFields();
      setLoader(false);
    }
  };

  const showPassword = () => {
    //show password method when checkbox is enabled
    var x = document.getElementById("password");
    var y = document.getElementById("password1");
    if (x.type === "password" && y.type === "password") {
      x.type = "text";
      y.type = "text";
    } else {
      x.type = "password";
      y.type = "password";
    }
  };
  return (
    <>
      {/* <section className=" bg-gray-600 block mx-auto">
        {loader === false ? (
          <center>
            <Spin style={{ marginTop: "200px" }} />
          </center>
        ) : (
          <div className=" mt-52">
            <Form
              {...layout}
              form={form}
              name="control-hooks"
              onFinish={() => userHandlerUpdate("top")}
            >
              <center>
                {error && <span style={{ color: "red" }}>{error}</span>}
              </center>
              <Form.Item
                name="username"
                label="UserName"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  style={{ width: "50%" }}
                  placeholder="enter your username"
                  prefix={<FileDoneOutlined className="site-form-item-icon" />}
                  suffix={
                    <Tooltip title="Enter Username ex: John">
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  }
                  showCount
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  style={{ width: "50%" }}
                  placeholder="enter your email"
                  prefix={<FileDoneOutlined className="site-form-item-icon" />}
                  suffix={
                    <Tooltip title="Enter Email ex: John@gmail.com">
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  }
                  showCount
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  style={{ width: "50%" }}
                  placeholder="enter your password"
                  prefix={<FileDoneOutlined className="site-form-item-icon" />}
                  suffix={
                    <Tooltip title="Enter Password ex: *******">
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  }
                  showCount
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                />
              </Form.Item>
              <Form.Item
                name="repassword"
                label="Re-Enter Password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  style={{ width: "50%" }}
                  placeholder="enter your password again"
                  prefix={<FileDoneOutlined className="site-form-item-icon" />}
                  suffix={
                    <Tooltip title="Enter Password ex: *******">
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  }
                  showCount
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  id="password1"
                />
              </Form.Item>
              <div className=" ml-96 translate-x-60">
                <Form.Item>
                  <Checkbox onClick={showPassword}>Show Password</Checkbox>
                </Form.Item>
              </div>
              {isError && (
                <small style={{ color: "red" }}>
                  Something went wrong. Please try again later.
                </small>
              )}
              <Form.Item {...tailLayout}>
                &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;
                <Button type="primary" htmlType="submit">
                  {loader === false ? (
                    <>
                      <Spin indicator={<LoadingOutlined />} /> Updating in
                      Progess...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>{" "}
                &nbsp;&nbsp; &nbsp;&nbsp;
              </Form.Item>
            </Form>
          </div>
        )}
      </section> */}
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
                <div>
                  <Card
                    hoverable
                    style={{ width: 600 }}
                    cover={<img alt="user" src={UserImg} style={{height: 300, width:300}}/>}
                  >
                    <Form
                      {...layout}
                      form={form}
                      name="control-hooks"
                      onFinish={() => userHandlerUpdate("top")}
                    >
                      <center>
                        {error && <span style={{ color: "red" }}>{error}</span>}
                      </center>
                      <Form.Item
                        name="username"
                        label="UserName"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          style={{ width: "65%" }}
                          placeholder="enter your username"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Enter Username ex: John">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          showCount
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          type="text"
                        />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          style={{ width: "65%" }}
                          placeholder="enter your email"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Enter Email ex: John@gmail.com">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          showCount
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                        />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          style={{ width: "65%" }}
                          placeholder="enter your password"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Enter Password ex: *******">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          showCount
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          id="password"
                        />
                      </Form.Item>
                      <Form.Item
                        name="repassword"
                        label="Re-Enter Password"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          style={{ width: "65%" }}
                          placeholder="enter your password again"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Enter Password ex: *******">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          showCount
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          type="password"
                          id="password1"
                        />
                      </Form.Item>
                      <div className=" ml-28">
                        <Form.Item>
                          <Checkbox onClick={showPassword}>
                            Show Password
                          </Checkbox>
                        </Form.Item>
                      </div>
                      {isError && (
                        <small style={{ color: "red" }}>
                          Something went wrong. Please try again later.
                        </small>
                      )}
                      <Form.Item {...tailLayout}>
                        <div className=" mr-10">
                          <Button type="primary" htmlType="submit">
                            {loader === false ? (
                              <>
                                <Spin indicator={<LoadingOutlined />} />{" "}
                                Updating in Progess...
                              </>
                            ) : (
                              "Submit"
                            )}
                          </Button>{" "}
                        </div>
                        &nbsp;&nbsp; &nbsp;&nbsp;
                      </Form.Item>
                    </Form>
                  </Card>
                </div>
              </div>
            </center>
          )}
        </div>
      </section>
    </>
  );
};

export default EditProfile;
