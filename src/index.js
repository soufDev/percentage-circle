import React, { useEffect, useState, useRef, useMemo } from "react";
import ReactDOM from "react-dom";

import {
  Circle,
  LeftWrap,
  Loader,
  SecondLoader,
  InnerCirle,
  Text
} from "./styledComponents";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(
    () => {
      function tick() {
        savedCallback.current();
      }

      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    },
    [delay]
  );
}

function usePercent(initValue, step, delay) {
  const [state, setState] = useState({
    progress: 0,
    leftTransformerDegree: "Odeg",
    rightTransformerDegree: "0deg"
  });
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      const { progress } = state;
      if (progress < initValue) {
        if (progress >= 50) {
          setState(({ progress }) => ({
            progress: progress + step,
            rightTransformerDegree: "180deg",
            leftTransformerDegree: (progress - 50) * 3.6 + "deg"
          }));
        } else {
          setState(({ progress }) => ({
            progress: progress + step,
            rightTransformerDegree: progress * 3.6 + "deg",
            leftTransformerDegree: "0deg"
          }));
        }
      } else {
        setIsRunning(false);
        setState(({ progress }) => {
          if (progress > initValue) {
            return { progress: progress - step };
          }
          return { progress };
        });
      }
    },
    isRunning ? delay : null
  );

  return { ...state };
}

const PercentageCircle = React.memo(props => {
  const { percent, radius, bgcolor, color, borderWidth, innerColor, step, delay } = props;
  const {
    leftTransformerDegree,
    rightTransformerDegree,
    progress
  } = usePercent(percent, step, delay);
  const circleStyle = useMemo(() => ({
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    backgroundColor: bgcolor
  }), [radius, bgcolor]);

  const leftWrapStyle = useMemo(() => ({
    width: radius,
    height: radius * 2,
    left: 0
  }), [radius]);

  const laoderStyle = useMemo(() => ({
    left: radius,
    width: radius,
    height: radius * 2,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: color,
    transform: "rotate(" + leftTransformerDegree + ")"
  }), [radius, color, leftTransformerDegree]);

  const secondLoaderStyle = useMemo(() => ({
    left: -radius,
    width: radius,
    height: radius * 2,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: color,
    transform: "rotate(" + rightTransformerDegree + ")"
  }), [radius, color, rightTransformerDegree]);

  const innerCirleStyle = useMemo(() => ({
    left: borderWidth,
    top: borderWidth,
    width: (radius - borderWidth) * 2,
    height: (radius - borderWidth) * 2,
    borderRadius: radius - borderWidth,
    backgroundColor: innerColor
  }), [borderWidth, radius, innerColor]);

  const rightWrapStyle = useMemo(() => ({
    width: radius,
    height: radius * 2,
    left: radius
  }), [radius]);

  const textColor = useMemo(() => ({
    color: color
  }), [color]);

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
  delay: 1,
  disabled: false
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <PercentageCircle
    radius={100}
    borderWidth={5}
    percent={70}
    color={"#ffa7c4"}
  />,
  rootElement
);
