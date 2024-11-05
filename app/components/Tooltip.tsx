import React, { useEffect } from "react";

interface TooltipProps {
  x: number;
  y: number;
  onClose: () => void;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ x, y, onClose, children }) => {
  useEffect(() => {
    const handleClickOutside = () => {
      onClose();
    };

    // Close the tooltip when clicking anywhere else
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className="fixed bg-secondary border-4 border-slate-900 shadow-md p-2 rounded z-50"
      style={{ top: y, left: x }}
    >
      {children}
    </div>
  );
};

export default Tooltip;
