import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./index.css";
import home1 from "../../asserts/images/home1.jpg";
import home2 from "../../asserts/images/home2.jpg";
export default class SimpleSlider extends Component {
  render() {
    const settings = {
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="swiper-wrapper">
        <Slider {...settings}>
          <div>
            <img
              style={{ width: "1920px", height: "600px" }}
              src={home1}
              alt=""
            />
          </div>
          <div>
            <img
              style={{ width: "1920px", height: "600px" }}
              src={home2}
              alt=""
            />
          </div>
        </Slider>
      </div>
    );
  }
}
