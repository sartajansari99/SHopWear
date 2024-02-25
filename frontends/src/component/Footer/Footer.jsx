import React from "react";
import logo from "../assets/logo.png";
import Instagram from "../assets/instagram_icon.png";
import pintrest from "../assets/pintester_icon.png";
import whatsapp from "../assets/whatsapp_icon.png";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={logo} alt="" />
        <p>SHopWear</p>
      </div>
      <ul className="footer-link">
        <li>Company</li>
        <li>Office</li>
        <li>Product</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <div className="footer-social-icon">
        <div className="footer-icon-container">
          <img src={Instagram} alt="" />
        </div>
        <div className="footer-icon-container">
          <img src={pintrest} alt="" />
        </div>
        <div className="footer-icon-container">
          <img src={whatsapp} alt="" />
        </div>
      </div>
      <div className="footer-copyrigth">
        <hr />
        {/* <p>Copyright @ 2024 - All Rigth Reserver.</p> */}
      </div>
    </div>
  );
}

export default Footer;
