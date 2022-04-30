import React from "react";
import { Carousel, Image, Button } from "antd";

import "antd/dist/antd.css";
//carousel
import bg1 from "../assets/Home/bg5.jpg";
import bg2 from "../assets/Home/bg6.jpg";
import bg3 from "../assets/Home/bg7.jpg";
import bg4 from "../assets/Home/bg8.jpg";
import bg5 from "../assets/Home/bg10.jpg";

//categories
import fashions from "../assets/Home/fashion.jpg";
import jewelleries from "../assets/Home/jewellery.jpg";
import makeups from "../assets/Home/makeup.jpg";
import electronics from "../assets/Home/electronics.jpg";
import toys from "../assets/Home/toys.jpg";
import compphone from "../assets/Home/computerphone.jpg";

const Home = () => {
  return (
    <>
      <section>
        <Carousel effect="fade" autoplay>
          <div>
            <img src={bg1} alt="bg1" />
          </div>
          <div>
            <img src={bg2} alt="bg2" />
          </div>
          <div>
            <img src={bg3} alt="bg3" />
          </div>
          <div>
            <img src={bg4} alt="bg4" />
          </div>
          <div>
            <img src={bg5} alt="bg5" />
          </div>
        </Carousel>
      </section>

      <section className=" bg-gray-800 block mx-auto">
        <center>
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
                <Image
                  style={{ width: 400 }}
                  src={jewelleries}
                  preview={false}
                />
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
                <Image
                  style={{ width: 400 }}
                  src={electronics}
                  preview={false}
                />
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
        </center>
      </section>
    </>
  );
};

export default Home;
