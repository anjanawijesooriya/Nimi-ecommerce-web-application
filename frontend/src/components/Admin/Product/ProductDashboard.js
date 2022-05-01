import React, { useState, useEffect } from "react";
import { Spin } from "antd";

import "antd/dist/antd.css";

const ProductDashboard = () => {
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSpin(true);
    }, 5000);
  }, []);

  return (
    <div>
      <center>
        {spin === false ? (
          <div className=" my-56">
            <Spin size="large" />
          </div>
        ) : (
          <div>
            <>
              <img
                src="https://i.ibb.co/b5fNRG4/28-C-Product-Management.png"
                alt="product"
                className="w-full h-full"
              />
            </>
          </div>
        )}
      </center>
    </div>
  );
};

export default ProductDashboard;
