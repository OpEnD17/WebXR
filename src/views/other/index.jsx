import React, { Component } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./index.css";
import Swiper from "../../component/swiper";
export default class SimpleSlider extends Component {
  state = {
    navList: [
      { id: 1, name: "To join the meeting" },
      { id: 2, name: "voice" },
      { id: 3, name: "video" },
      { id: 4, name: "Sharing and annotation" },
      { id: 5, name: "Meeting management" },
      { id: 6, name: "Other problems" },
    ],
  };
  render() {
    return (
      <div className="swiper-wrapper">
        <Swiper />
        <h1 style={{textAlign:'center',lineHeight:'60px'}}>Our Special Features</h1>
        <div className="other_content">
          <div className="c_left">
            <h4 style={{ marginBottom: "30px" }}>About us</h4>
            {this.state.navList.map((v) => {
              return <div key={v.id}>&gt;&nbsp;{v.name}</div>;
            })}
          </div>
          <div className="c_right">
            <h1 style={{ marginBottom: "30px" }}>
              vr video conferencing solution
            </h1>
            <p>
              vr video conferencing solution full-time cloud conferencing
              enterprise one-stop intelligent conferencing solution.
            </p>
            <p>
              1. Audio and video high-definition lossless, cross-platform SVC,
              suitable for multiple networks, double stream video and hardware
              perfect interconnection, super anti-packet loss perfect sound
              restoration
            </p>
            <p>
              2. Stable and reliable performance, standard security standards of
              banks and large financial institutions, multi-cloud and
              multi-center deployment of business and infrastructure
            </p>
            <p>
              3. Easy to use, unlimited use, online purchase, rapid deployment,
              unified login, through all the traditional hardware video devices
            </p>
            <p>
              4. High standard encryption, self-built security firewall, defense
              against DDOS, XSS, SQL injection attacks
            </p>
            <p>
              5. Powerful conference functions,
              desktop/application/document/mobile phone, comprehensive sharing,
              easy management and control of large conferences, support 10,000
              people to watch live at the same time
            </p>
            <p>
              6. Intimate service guarantee, 7x24 hours manual service,
              one-on-one exclusive customer service, to help you hold every
              meeting
            </p>
          </div>
        </div>
      </div>
    );
  }
}
