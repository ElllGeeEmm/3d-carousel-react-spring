import React from 'react'
import { useSpring, animated } from "react-spring";

const style = {
  position: "absolute",
  height: "100%",
  top: "50%",
  display: "flex",
  alignItems: "center",
justifyContent: "center",
transformOrigin: "50% 50%",
}

export default function Slide({
  content,
  offsetRadius,
  index,
  animationConfig
}) {
  const offsetFromCenter = index - offsetRadius;
  const totalPresentables = 2 * offsetRadius + 1;
  const distanceFactor = 1 - Math.abs(offsetFromCenter / (offsetRadius + 1));

  const translateXoffset =
    50 * (Math.abs(offsetFromCenter) / (offsetRadius + 1));
  let translateX = -50;

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateX = 0;
    } else if (index === totalPresentables - 1) {
      translateX = -100;
    }
  }

  if (offsetFromCenter > 0) {
    translateX += translateXoffset;
  } else if (offsetFromCenter < 0) {
    translateX -= translateXoffset;
  }

  const animatedStyleProps = useSpring({ 
    to: {
      transform: `translateY(-50%) translateX(${translateX}%) scale(${distanceFactor})`,
      left: `${
        offsetRadius === 0 ? 50 : 50 + (offsetFromCenter * 50) / offsetRadius
        }%`,
      opacity: distanceFactor * distanceFactor
    },
    config: animationConfig
  })

  return (
    <animated.div style={{ ...style, ...animatedStyleProps, zIndex: Math.abs(Math.abs(offsetFromCenter) - 2)}}>
      <div className="slide-container"
        style={{  }}
      >
        {content}
      </div>
    </animated.div>
  );
}
