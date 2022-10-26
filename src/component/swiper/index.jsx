import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import './index.css';

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="swiper-wrapper">
        <Slider {...settings}>
          <div>
            <img src="http://v4-upload.goalsites.com/53/image_1657869522_1%EF%BC%89360(1).jpg" alt=""/>
          </div>
          <div>
            <img src="http://v4-upload.goalsites.com/53/image_1657869572_2%EF%BC%89%E6%A1%88%E4%BE%8B1.jpg" alt="" />
          </div>
        </Slider>
      </div>
    );
  }
}