import * as React from "react";
import { useState } from "react";
import "./index.css";
import list1 from "../../asserts/images/list1.jpg";
import list2 from "../../asserts/images/list2.jpg";
import list3 from "../../asserts/images/list3.jpg";
const Body = () => {
  const [active, setActive] = useState(1);
  const images = [list1, list2, list3];
  return (
    <div className="func-wrapper">
      <div className="func-title">
        <h1>Our Special Features</h1>
      </div>
      <div className="func-content">
        <div className="func-content-left">
          <div
            className={`func-content-left-item ${active === 1 ? "on" : ""}`}
            onMouseEnter={() => {
              setActive(1);
            }}
          >
            The application of VR
          </div>
          <div
            className={`func-content-left-item ${active === 2 ? "on" : ""}`}
            onMouseEnter={() => {
              setActive(2);
            }}
          >
            Online meeting with multiple people simultaneously
          </div>
          <div
            className={`func-content-left-item ${active === 3 ? "on" : ""}`}
            onMouseEnter={() => {
              setActive(3);
            }}
          >
            Website has more functions
          </div>
        </div>
        <div className="func-content-right">
          <img src={`${images[active - 1]}`} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Body;
