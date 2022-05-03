import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Space, Radio, Input } from "antd";
import { DownOutlined, SmileOutlined, FilterTwoTone } from "@ant-design/icons";

import "antd/dist/antd.css";
import axios from "axios";

const FilterCategory = () => {
  const [state, setState] = useState(null);
  const [data, setData] = useState([]);
  const [filteredDataCategory, setFilteredDataCategory] = useState([]);

  useEffect(() => {
    (async () =>
      await axios.get("http://localhost:8070/products/").then((res) => {
        setData(res.data);
        console.log(res);
      }))();
  }, []);

  const handleChange = (e) => {
    setState(e.target.value);
  };

  const filteredData = data.filter(
    (el) => el?.productCategory.toLowerCase().indexOf >= 0
  );

  const menu = (
    <Menu
      items={[
        {
          label: (
            <Radio.Group onChange={handleChange} value={state}>
              <Space direction="vertical">
                <Radio value={1}>Fashions</Radio>
                <Radio value={2}>Makeups</Radio>
                <Radio value={3}>Jewelleries</Radio>
                <Radio value={4}>Electrics</Radio>
                <Radio value={5}>Toys</Radio>
                <Radio value={6}>Computers and Phones</Radio>
              </Space>
            </Radio.Group>
          ),
        },
        // {
        //   label: (
        //     <a
        //       target="_blank"
        //       rel="noopener noreferrer"
        //       href="https://www.aliyun.com"
        //     >
        //       2nd menu item (disabled)
        //     </a>
        //   ),
        //   icon: <SmileOutlined />,
        //   disabled: true,
        // },
        // {
        //   label: (
        //     <a
        //       target="_blank"
        //       rel="noopener noreferrer"
        //       href="https://www.luohanacademy.com"
        //     >
        //       3rd menu item (disabled)
        //     </a>
        //   ),
        //   disabled: true,
        // },
        // {
        //   danger: true,
        //   label: "a danger item",
        // },
      ]}
    />
  );
  return (
    <Dropdown overlay={menu}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <FilterTwoTone style={{ fontSize: 20 }} />
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default FilterCategory;
