import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { TooltipProps } from "./types";

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = () => {
    if (triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: triggerRect.top - tooltipRef.current.offsetHeight - 8,
        left: triggerRect.left + (triggerRect.width - tooltipRef.current.offsetWidth) / 2,
      });
    }
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
    }
  }, [isVisible]);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      ref={triggerRef}
    >
      {children}
      {isVisible && createPortal(
        <div
          ref={tooltipRef}
          className="absolute z-50 px-2 py-1 bg-background backdrop-blur-lg text-foreground text-xs text-nowrap rounded shadow-lg"
          style={{ top: position.top, left: position.left }}
        >
          <p>{content}</p>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Tooltip;
