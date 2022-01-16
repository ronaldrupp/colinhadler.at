import { useState, useEffect } from "react";

export default function useWindowSize() {
  const [windowSize, setwindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  function handleWindowResize() {
    setwindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return windowSize;
}
