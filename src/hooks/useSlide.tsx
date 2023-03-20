import { useEffect, useState } from "react";
import { ProductData } from "../types/data-type";

const useSlide = ({
  list,
  classes,
}: {
  list: { id: number; img: string }[] | ProductData[];
  classes: string[];
}) => {
  const [slideCount, setSlideCount] = useState<number>(1);
  const [translateX, setTranslateX] = useState<string>("");
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const countUp = () => {
    setSlideCount(prev => (prev += 1));
    setIsMoving(true);
  };

  const countDown = () => {
    setSlideCount(prev => (prev -= 1));
    setIsMoving(true);
  };

  const transitionEnd = () => {
    if (slideCount === list.length + 1) {
      setIsMoving(false);
      setSlideCount(1);
    } else if (slideCount === 0) {
      setIsMoving(false);
      setSlideCount(list.length);
    }
  };

  useEffect(() => {
    const translate = classes[slideCount];
    setTranslateX(translate);
  }, [slideCount]);

  return {
    next: countUp,
    prev: countDown,
    transitionEnd,
    translateX,
    isMoving,
    slideNum: slideCount,
  };
};

export default useSlide;
