import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Button,
  Spin,
  Tooltip,
  notification,
  Select,
  DatePicker,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
  FileDoneOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";

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

const { Option } = Select;

const EditProduct = () => {
  const [loader, setLoader] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescrip, setProductDescrip] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [qty, setQty] = useState("");
  const [image, setImage] = useState("");
  const [dateAdded, setDateAdded] = useState("");
  const [status, setStatus] = useState("");

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("_id");
  const history = useNavigate();

  const [loading, setLoading] = useState(false); //additional
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 5000);
    (async () => {
      await axios
        .get(`/products/get/${id}`)
        .then((res) => {
          form.setFieldsValue({
            productName: res.data.productName,
            productDescrip: res.data.productDescrip,
            productCategory: res.data.productCategory,
            productPrice: res.data.productPrice,
            qty: res.data.qty,
            image: res.data.image,
            dateAdded: res.data.dateAdded,
            status: res.data.status,
          });
          setProductName(res.data.productName);
          setProductDescrip(res.data.productDescrip);
          setProductCategory(res.data.productCategory);
          setProductPrice(res.data.productPrice);
          setQty(res.data.qty);
          setImage(res.data.image);
          setDateAdded(res.data.dateAdded);
          setStatus(res.data.status);
        })
        .catch(() => null);
    })();
  }, []);

  const productHandlerUpdate = async (placement) => {
    // create handler for saving data to the db
    setLoading(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(
        //use axios API
        `/products/update/${id}`,
        {
          productName,
          productDescrip,
          productCategory,
          productPrice,
          qty,
          image,
          dateAdded,
          status,
        },
        config
      );
      setTimeout(() => {
        //set a time out
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Successfully updated the product details ????",
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
      setLoading(false);
    }
  };

  const [form] = Form.useForm();

  const onChangeDate = (type) => {
    setDateAdded(type);
  };

  return (
    <>
      {loader === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : (
        <div className=" mt-10">
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={() => productHandlerUpdate("top")}
          >
            <center>
              {error && <span style={{ color: "red" }}>{error}</span>}
            </center>
            <Form.Item
              name="productName"
              label="Product Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                style={{ width: "50%" }}
                placeholder="enter your product name"
                prefix={<FileDoneOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="Enter Product Name ex: T-shirt">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
                showCount
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="productDescrip"
              label="Product Description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea
                style={{ width: "50%" }}
                placeholder="enter your product description"
                prefix={<FileDoneOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="Please provide product description">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
                showCount
                maxLength={100}
                value={productDescrip}
                onChange={(e) => setProductDescrip(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="productCatergory"
              label="Product Catergory"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select Product Catregory"
                style={{ width: "50%" }}
                onChange={(e) => setProductCategory(e)}
                defaultValue={productCategory}
              >
                <Option value="Fashions">Fashions</Option>
                <Option value="Makeups">Makeups</Option>
                <Option value="Jewelleries">Jewelleries</Option>
                <Option value="Electronics">Electronics</Option>
                <Option value="Toys">Toys</Option>
                <Option value="Computers and Phones">
                  Computers and Phones
                </Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="productPrice"
              label="Product Price"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                style={{ width: "50%" }}
                placeholder="enter product price"
                prefix={<FileDoneOutlined className="site-form-item-icon" />}
                suffix={[
                  <Tooltip title="Enter Product price ex: Rs.10000">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>,
                ]}
                showCount
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                type="number"
              />
            </Form.Item>

            <Form.Item
              name="qty"
              label="Quantity"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                style={{ width: "50%" }}
                placeholder="enter product quantity"
                prefix={<FileDoneOutlined className="site-form-item-icon" />}
                showCount
                required
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                type="number"
              />
            </Form.Item>

            <Form.Item
              name="image"
              label="Product Image"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                style={{ width: "50%" }}
                placeholder="enter product image"
                prefix={<FileDoneOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="Enter Product Image">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
                showCount
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Product date added"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                defaultValue={moment(Date(dateAdded))}
                style={{ width: 200 }}
                onChange={onChangeDate}
                required
              />
            </Form.Item>

            <Form.Item
              name="status"
              label="Product Status"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select Product Status"
                style={{ width: "50%" }}
                onChange={(e) => setStatus(e)}
              >
                <Option value="In Stock">In Stock</Option>
                <Option value="Out Of Stock">Out Of Stock</Option>
              </Select>
            </Form.Item>

            <Form.Item {...tailLayout}>
              &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;
              <Button type="primary" htmlType="submit">
                {loading ? (
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
    </>
  );
};

export default EditProduct;
