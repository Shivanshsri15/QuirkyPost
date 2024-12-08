import React from "react";
import { ProgressBar } from "react-bootstrap";
const ProgressBarPro = (props) => {
  return <ProgressBar animated label={`${props.val}%`} now={props.val} variant={props.var } />;
};

export default ProgressBarPro;
