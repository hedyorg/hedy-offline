import { useState, useEffect } from "react";
import { RefObject } from "react";

function useResizePanel(containerRef: RefObject<HTMLDivElement>, resizeHandelerRef: RefObject<HTMLDivElement>, horizontal = false) {
  const [distribution, setDistribution] = useState(0.5);
  const [isMouseDown, setMouseDown] = useState(false);

  //Resize
  useEffect(() => {
    const rect = containerRef.current!.getBoundingClientRect();

    function onResize(e: MouseEvent) {
      if (isMouseDown) {
        var position = 0;
        if (horizontal) {
          const x = e.clientX - rect.left;
          position = x / rect.width;
        } else {
          const y = e.clientY - rect.top;
          position = y / rect.height;
        }

        if (position < 0.005) {
          position = 0;
        }

        if (position > 0.995) {
          position = 1;
        }
        setDistribution(position);
      }
    }

    function onResizeTouch(e: TouchEvent) {
      if (isMouseDown) {
        var position = 0;
        if (horizontal) {
          const x = e.touches[0].clientX - rect.left;
          position = x / rect.width;
        } else {
          const y = e.touches[0].clientY - rect.top;
          position = y / rect.height;
        }

        if (position < 0.005) {
          position = 0;
        }

        if (position > 0.995) {
          position = 1;
        }
        setDistribution(position);
      }
    }

    window.addEventListener("mousemove", onResize);
    window.addEventListener("touchmove", onResizeTouch);

    return () => {
      window.removeEventListener("mousemove", onResize);
      window.removeEventListener("touchmove", onResizeTouch);
    };
  }, [isMouseDown, containerRef, horizontal]);

  //Mouse Up
  useEffect(() => {
    function onUp(e: MouseEvent | TouchEvent) {
      setMouseDown(false);
    }

    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [setMouseDown]);

  //Mouse Down
  useEffect(() => {
    function onDown(e: MouseEvent | TouchEvent) {
      setMouseDown(true);
    }

    resizeHandelerRef.current?.addEventListener("mousedown", onDown);
    resizeHandelerRef.current?.addEventListener("touchstart", onDown);
  }, [resizeHandelerRef, setMouseDown]);

  return { distribution, isMouseDown };
}

export default useResizePanel;
