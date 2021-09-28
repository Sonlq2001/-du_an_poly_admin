import React from "react";
import { Link } from "react-router-dom";

import { ButtonCustom } from "./Buttons.styles";

export const Button = ({ children, color, href }) => {
  let colorButton = "";
  switch (color) {
    case "warning":
      colorButton = "#FBB837";
      break;
    case "danger":
      colorButton = "#E54B3C";
      break;
    default:
      colorButton = "#3498DB";
  }

  const isLink = href === undefined ? true : false;
  return isLink ? (
    <ButtonCustom color={colorButton}>{children}</ButtonCustom>
  ) : (
    <ButtonCustom color={colorButton}>
      <Link to={href}>{children}</Link>
    </ButtonCustom>
  );
};
