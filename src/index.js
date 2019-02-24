import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import propTypes from "prop-types";
import {
  Circle,
  LeftWrap,
  Loader,
  SecondLoader,
  InnerCirle,
  Text
} from "./styledComponents";

import { usePercent } from "./customHooks";

const PercentageCircle = React.memo(props => {
  const {
    percent,
    radius,
    bgcolor,
    color,
    borderWidth,
    innerColor,
    step,
    delay
  } = props;
  const {
    leftTransformerDegree,
    rightTransformerDegree,
    progress
  } = usePercent(percent, step, delay);

  const circleStyle = useMemo(
    () => ({
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      backgroundColor: bgcolor
    }),
    [radius, bgcolor]
  );

  const leftWrapStyle = useMemo(
    () => ({
      width: radius,
      height: radius * 2,
      left: 0
    }),
    [radius]
  );

  const laoderStyle = useMemo(
    () => ({
      left: radius,
      width: radius,
      height: radius * 2,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      backgroundColor: color,
      transform: `rotate(${leftTransformerDegree})`
    }),
    [radius, color, leftTransformerDegree]
  );

  const secondLoaderStyle = useMemo(
    () => ({
      left: -radius,
      width: radius,
      height: radius * 2,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: color,
      transform: `rotate(${rightTransformerDegree})`
    }),
    [radius, color, rightTransformerDegree]
  );

  const innerCirleStyle = useMemo(
    () => ({
      left: borderWidth,
      top: borderWidth,
      width: (radius - borderWidth) * 2,
      height: (radius - borderWidth) * 2,
      borderRadius: radius - borderWidth,
      backgroundColor: innerColor
    }),
    [borderWidth, radius, innerColor]
  );

  const rightWrapStyle = useMemo(
    () => ({
      width: radius,
      height: radius * 2,
      left: radius
    }),
    [radius]
  );

  const textColor = useMemo(
    () => ({
      color
    }),
    [color]
  );

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
        <Text style={textColor}>{progress}%</Text>
      </InnerCirle>
    </Circle>
  );
});

PercentageCircle.defaultProps = {
  color: "#000",
  radius: 20,
  percent: 0,
  borderWidth: 2,
  bgcolor: "#e3e3e3",
  innerColor: "#fff",
  step: 1,
  delay: 1
};

PercentageCircle.propTypes = {
  color: propTypes.string,
  radius: propTypes.number,
  percent: propTypes.number,
  borderWidth: propTypes.number,
  bgcolor: propTypes.string,
  innerColor: propTypes.string,
  step: propTypes.number,
  delay: propTypes.number
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <PercentageCircle
    radius={100}
    borderWidth={5}
    percent={70}
    color="#ffa7c4"
  />,
  rootElement
);
