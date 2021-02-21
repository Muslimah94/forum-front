import React from "react";
import { Heart } from "react-feather";
import classnames from "classnames";

const Footer = (props) => {
  let footerTypeArr = ["sticky", "static", "hidden"];
  return (
    <footer
      className={classnames("footer footer-light", {
        "footer-static":
          props.footerType === "static" ||
          !footerTypeArr.includes(props.footerType),
        "d-none": props.footerType === "hidden",
      })}
    >
      <p className="mb-0 clearfix">
        <span className="float-md-left d-block d-md-inline-block mt-25">
          COPYRIGHT © {new Date().getFullYear()}
          <a href="/" target="_self" rel="noopener noreferrer">
            Alibek,
          </a>
          <a href="/" target="_self" rel="noopener noreferrer">
            Maral,
          </a>
          <a href="/" target="_self" rel="noopener noreferrer">
            Berik,
          </a>
          <a href="/" target="_self" rel="noopener noreferrer">
            Serik,
          </a>
          <a href="/" target="_self" rel="noopener noreferrer">
            Kobylan{" "}
          </a>
          All rights reserved
        </span>
        <span className="float-md-right d-none d-md-block">
          <span className="align-middle">Hand-crafted & Made with</span>{" "}
          <Heart className="text-danger" size={15} />
        </span>
      </p>
    </footer>
  );
};

export default Footer;
