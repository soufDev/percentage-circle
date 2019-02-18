import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function PercentageCircle(props) {
  const percent = props.percent;
  let leftTransformerDegree = "0deg";
  let rightTransformerDegree = "0deg";

  if (percent >= 50) {
    rightTransformerDegree = "180deg";
    leftTransformerDegree = (percent - 50) * 3.6 + "deg";
  } else {
    rightTransformerDegree = percent * 3.6 + "deg";
    leftTransformerDegree = "0deg";
  }

  const circleStyle = {
    width: props.radius * 2,
    height: props.radius * 2,
    borderRadius: props.radius,
    backgroundColor: props.bgcolor
  };

  const leftWrapStyle = {
    width: props.radius,
    height: props.radius * 2,
    left: 0
  };

  const laoderStyle = {
    left: props.radius,
    width: props.radius,
    height: props.radius * 2,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: props.color,
    transform: "rotate(" + leftTransformerDegree + ")"
  };

  return (
    <div className="circle" style={circleStyle}>
      <div className="left-wrap" style={leftWrapStyle}>
        <div className="loader" id="id1" style={laoderStyle} />
      </div>
      <div
        className="right-wrap"
        style={{
          width: props.radius,
          height: props.radius * 2,
          left: props.radius
        }}
      >
        <div
          className="loader2"
          id="id2"
          style={{
            left: -props.radius,
            width: props.radius,
            height: props.radius * 2,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: props.color,
            transform: "rotate(" + rightTransformerDegree + ")"
          }}
        />
      </div>
      <div
        className="inner-circle"
        style={{
          left: props.borderWidth,
          top: props.borderWidth,
          width: (props.radius - props.borderWidth) * 2,
          height: (props.radius - props.borderWidth) * 2,
          borderRadius: props.radius - props.borderWidth,
          backgroundColor: props.innerColor
        }}
      >
        {props.children ? (
          props.children
        ) : (
          <h1 className={"text " + props.textStyle}>{props.percent}%</h1>
        )}
      </div>
    </div>
  );
}

PercentageCircle.defaultProps = {
  color: "#000",
  radius: 20,
  percent: 0,
  borderWidth: 2,
  bgcolor: "#e3e3e3",
  innerColor: "#fff",
  disabled: false,
  textStyle: ""
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <PercentageCircle
    radius={60}
    borderWidth={10}
    percent={80}
    color={"#2ecc71"}
  />,
  rootElement
);
