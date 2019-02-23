import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
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

function usePercent(initValue) {
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
            progress: progress + 1,
            rightTransformerDegree: "180deg",
            leftTransformerDegree: (progress - 50) * 3.6 + "deg"
          }));
        } else {
          setState(({ progress }) => ({
            progress: progress + 1,
            rightTransformerDegree: progress * 3.6 + "deg",
            leftTransformerDegree: "0deg"
          }));
        }
      } else {
        setIsRunning(false);
        setState(({ progress }) => {
          if (progress > initValue) {
            return { progress: progress - 1 };
          }
          return { progress };
        });
      }
    },
    isRunning ? 1 : null
  );

  return { ...state };
}

const PercentageCircle = React.memo(props => {
  const percent = props.percent;
  const {
    leftTransformerDegree,
    rightTransformerDegree,
    progress
  } = usePercent(percent);
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

  const textColor = {
    color: props.color
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
