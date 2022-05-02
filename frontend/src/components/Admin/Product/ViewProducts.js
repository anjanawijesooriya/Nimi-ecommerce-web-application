import React, { useState, useEffect } from "react";
import { Button, notification, Spin, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import axios from "axios";
import moment from "moment";

const ViewProducts = () => {
  const history = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("_id");

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () =>
      await axios.get("http://localhost:8070/products/").then((res) => {
        setData(res.data);
        
      }))();
  }, []);

  console.log(data);

  useEffect(() => {
    setTimeout(() => setLoader(true), 5000);
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/products/delete/${id}`);
      notification.info({
        title: "Delete Form",
        message: "Successfully Delete The Product",
        placement: "top",
      });
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
    },
    {
      title: "Product Description",
      dataIndex: "productDescrip",
    },
    {
      title: "Product Category",
      dataIndex: "productCategory",
    },
    {
      title: "Product Price",
      render: (record) => <>{"Rs." + record.productPrice}</>,
    },
    {
      title: "Quantity",
      dataIndex: "qty",
    },
    {
      title: "Product Image",
      render: (record) => (
        <img src={record.image} style={{ height: "50px", width: "50px" }} />
      ),
    },
    {
      title: "Date Added",
      render: (record) => <>{moment(record.dateAdded).format("DD MMM YYYY")}</>,
    },
    {
      title: "Product Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      render: (record) => (
        <div className="flex">
          <div className=" mr-2">
            <Button
              style={{
                background: "blue",
                color: "white",
                display: "inline-block",
              }}
              onClick={() =>
                history(
                  `/admin-dashboard/${localStorage.getItem(
                    "username"
                  )}?_product=edit&_id=${record._id}`
                )
              }
            >
              Edit
            </Button>
          </div>
          <div>
            <Button
              style={{ background: "red", color: "white" }}
              onClick={() => deleteHandler(record._id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ),
      width: 120,
    },
  ];

  return (
    <>
      {loader === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : (
        <div className=" mt-10">
          <Table columns={columns} dataSource={data} />
        </div>
      )}
    </>
  );
};

export default ViewProducts;
