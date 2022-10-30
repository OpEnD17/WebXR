import React, { Component } from "react";
import Swiper from "../../component/swiper";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./index.css";
export default class SimpleSlider extends Component {
  state = {
    textList: [
      {
        title: "There are no minutes in the video conference",
        content:
          "A video conference of one person will not generate meeting minutes, and can not be viewed in the historical meeting.Note: Historical meeting minutes can be saved for 100 days.",
      },
      {
        title: "Is there a password for video conference",
        content:
          "A video conference has a password with a string of digits. If you want to add others to the video conference, enter the meeting number in the start meeting button and log in in advance.",
      },
      {
        title: "How many people can the meeting hold",
        content:
          "Our meetings can accommodate a large number of people and meet all the needs of a normal meeting.",
      },
    ],
  };
  render() {
    return (
      <div className="swiper-wrapper">
        <Swiper />
        <h1 style={{textAlign:'center',lineHeight:'60px'}}>Common Problem</h1>
        <div className="vr_content">
          {this.state.textList.map((v) => {
            return (
              <div className="vr_item">
                <h3 className="vr_h3">{v.title}</h3>
                <div className="vr_div">{v.content}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
