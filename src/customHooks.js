import { useState, useRef, useEffect } from "react";

export function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  });
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function usePercent(initValue, step, delay) {
  const [state, setState] = useState({
    progress: 0,
    leftTransformerDegree: "Odeg",
    rightTransformerDegree: "0deg"
  });
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      const { progress: progressState } = state;
      if (progressState < initValue) {
        if (progressState >= 50) {
          setState(({ progress }) => ({
            progress: progress + step,
            rightTransformerDegree: "180deg",
            leftTransformerDegree: `${(progress - 50) * 3.6}deg`
          }));
        } else {
          setState(({ progress }) => ({
            progress: progress + step,
            rightTransformerDegree: `${progress * 3.6}deg`,
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
