import React, { useState, useEffect } from 'react'
import Slide from './Slide'

const GOTO_INTERVAL = 200;

function mod(a, b) {
  return ((a % b) + b) % b;
}


export default function Carousel({
  slides,
  goToSlide,
  showNavigation,
  offsetRadius,
  animationConfig,
}) {
  const [index, setIndex] = useState(0);
  const [goToSlideState, setGoToSlideState] = useState(null);
  let [newSlide, setNewSlide] = useState(false);
  let [prevPropsGoToSlide, setPrevPropsGoToSlide] = useState(0);
  
  if (goToSlide !== prevPropsGoToSlide) {
    setPrevPropsGoToSlide(goToSlide);
    setNewSlide(true);
  }

  const modBySlidesLength = (index) => {
    return mod(index, slides.length);
  };

  useEffect(() => {
    let goToIn = null;

    const getShortestDirection = (from, to) => {
      if (from > to) {
        if (from - to > slides.length - 1 - from + to) {
          return 1;
        } else return -1;
      } else if (to > from) {
        if (to - from > from + slides.length - 1 - to) {
          return -1;
        } else return 1;
      }
      return 0;
    }

    const handleGoToSlide = () => {
      if (typeof goToSlideState !== "number") return;
      
      const goToSlide = mod(goToSlideState, slides.length)

      if (goToSlide !== index) {
        let direction = getShortestDirection(index, goToSlide);
        const isFinished = modBySlidesLength(index + direction) === goToSlide
        setIndex(modBySlidesLength(index + direction));
        setNewSlide(isFinished);
        setGoToSlideState(isFinished ? null : goToSlide)
      }
    }

    if (typeof goToSlide === "number") {
      if (newSlide) {
        handleGoToSlide()
      } else if (index !== goToSlide && typeof window !== "undefined") {
        window.clearTimeout(goToIn);
        goToIn = window.setTimeout(handleGoToSlide, GOTO_INTERVAL)
      } else if (typeof window !== undefined) {
        window.clearTimeout(goToIn)
      }
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.clearTimeout(goToIn)
      }
    }
  }, [index, goToSlide, newSlide, goToSlideState, slides.length])

  const clampOffsetRadius = (offsetRadius) => {
    const upperBound = Math.floor((slides.length - 1) / 2);

    if (offsetRadius < 0) {
      return 0;
    }
    if (offsetRadius > upperBound) {
      return upperBound;
    }

    return offsetRadius;
  }

  const getPresentableSlides = () => {
    offsetRadius = clampOffsetRadius(offsetRadius);
    const presentableSlides = [];

    for (let i = -offsetRadius; i < 1 + offsetRadius; i++) {
      presentableSlides.push(slides[modBySlidesLength(index + i)]);
    }

    return presentableSlides;
  }

  const moveSlide = (direction) => {
    setIndex(modBySlidesLength(index + direction))
    setGoToSlideState(null)
  }

  let navigationButtons = null;
    if (showNavigation) {
      navigationButtons = (
        <>
          <button
            onClick={() => moveSlide(-1)}
            style={{ marginRight: "2rem" }}
          >back</button>

          <button
            onClick={() => moveSlide(1)}
            style={{ marginLeft: "2rem" }}
          >forwards</button>
        </>
      );
    }

  return (
    <div className="wrapper">
      {getPresentableSlides().map((slide, presentableIndex) => (
        <Slide 
          key={slide.key}
          content={slide.content}
          offsetRadius={clampOffsetRadius(offsetRadius)}
          index={presentableIndex}
          animationConfig={animationConfig}
        />
      ))}
      {navigationButtons}
    </div>
  )
}
