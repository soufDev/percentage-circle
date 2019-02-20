import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import "./styles.css";

const Circle = styled.div`
  overflow: hidden;
  position: relative;
  backgroundcolor: #e3e3e3;
`;

const LeftWrap = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
`;

const Loader = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 1000;
  transform-origin: 0 50%;
`;

const SecondLoader = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 1000;
  transform-origin: 100% 50%;
`;

const InnerCirle = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.h1`
  font-size: 11;
  color: #888;
`;

function usePercent(initValue) {
  let leftTransformerDegree = "0deg";
  let rightTransformerDegree = "0deg";

  if (initValue >= 50) {
    rightTransformerDegree = "180deg";
    leftTransformerDegree = (initValue - 50) * 3.6 + "deg";
  } else {
    rightTransformerDegree = initValue * 3.6 + "deg";
    leftTransformerDegree = "0deg";
  }

  return { leftTransformerDegree, rightTransformerDegree };
}

function PercentageCircle(props) {
  const percent = props.percent;
  const { leftTransformerDegree, rightTransformerDegree } = usePercent(percent);
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

  const secondLoaderStyle = {
    left: -props.radius,
    width: props.radius,
    height: props.radius * 2,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: props.color,
    transform: "rotate(" + rightTransformerDegree + ")"
  };

  const innerCirleStyle = {
    left: props.borderWidth,
    top: props.borderWidth,
    width: (props.radius - props.borderWidth) * 2,
    height: (props.radius - props.borderWidth) * 2,
    borderRadius: props.radius - props.borderWidth,
    backgroundColor: props.innerColor
  };

  const rightWrapStyle = {
    width: props.radius,
    height: props.radius * 2,
    left: props.radius
  };

  return (
    <Circle style={circleStyle}>
      <Circle />
      <LeftWrap style={leftWrapStyle}>
        <Loader style={laoderStyle} />
      </LeftWrap>
      <LeftWrap style={rightWrapStyle}>
        <SecondLoader style={secondLoaderStyle} />
      </LeftWrap>
      <InnerCirle style={innerCirleStyle}>
        <Text>{props.percent}%</Text>
      </InnerCirle>
    </Circle>
  );
}

PercentageCircle.defaultProps = {
  color: "#000",
  radius: 20,
  percent: 0,
  borderWidth: 2,
  bgcolor: "#e3e3e3",
  innerColor: "#fff",
  disabled: false
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <PercentageCircle
    radius={200}
    borderWidth={10}
    percent={36}
    color={"#2ecc52"}
  />,
  rootElement
);
