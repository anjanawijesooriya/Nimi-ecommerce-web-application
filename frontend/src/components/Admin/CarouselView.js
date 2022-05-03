import React, { useState, useEffect } from "react";
import { Carousel, Spin } from "antd";
import CarouselImg1 from "../../assets/Admin/Dashboard/bg1.jpg";
import CarouselImg2 from "../../assets/Admin/Dashboard/bg2.jpg";
import CarouselImg3 from "../../assets/Admin/Dashboard/bg3.jpg";
import "antd/dist/antd.css";

const contentStyle = {
  height: "570px",
  width: "100%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const CarouselView = () => {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 5000);
  }, []);
  return (
    <>
      <div className=" mt-24">
        <Carousel autoplay effect="fade">
          {loader === false && <Spin />}

          <div>
            <img src={CarouselImg1} style={contentStyle} />
          </div>
          <div>
            <img src={CarouselImg2} style={contentStyle} />
          </div>
          <div>
            <img src={CarouselImg3} style={contentStyle} />
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default CarouselView;
