import {
  useLayoutEffect,
  useState
} from 'react';

export const getColNumber = (width, filter) => {
  let a;
  if (width >= 1024) {
    if (!filter) {
      a = Math.round((width - 70) / 340);
    } else {
      a = Math.round((width - 300) / 340)
    }
  } else {
    if (!filter) {
      a = Math.round((width) / 340);
    } else {
      a = Math.round((width) / 340);
    }
  }

  return a
}

const getWidthCard = (width, filter) => {
  let widthPercent; // return percent postcard
  if (width >= 1024) {
    if (!filter) {
      let widthOne = Math.floor(((width - 70) - (18 * (getColNumber(width, filter) - 1))) / getColNumber(width, filter));
      widthPercent = Math.round((widthOne / (width - 70)) * 10000) / 100;
    } else {
      let widthOne = Math.floor(((width - 300) - (18 * (getColNumber(width, filter) - 1))) / getColNumber(width, filter));
      widthPercent = Math.round((widthOne / (width - 300)) * 10000) / 100;
    }
  } else if (width < 1024 && width >= 640) {
    widthPercent = Math.round(((width - 18) / width / 2) * 10000) / 100;
  } else {
    // ở đây là 1 card
    widthPercent = 100;
  }

  return widthPercent;
}

export const useWidthCard = (filter) => {
  const [widthCard, setWidthCard] = useState(0);
  useLayoutEffect(() => {
    function updateWidth() {
      setWidthCard(getWidthCard(window.innerWidth, filter));
    }
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, [filter]);
  return widthCard;
}

export const useNumberCard = filter => {
  const [numCard, setNumCard] = useState(0);
  useLayoutEffect(() => {
    function update() {
      setNumCard(getColNumber(window.innerWidth, filter));
    }

    window.addEventListener('resize', update);
    update();

    return () => window.removeEventListener('resize', update);
  }, [filter]);

  return numCard;
}