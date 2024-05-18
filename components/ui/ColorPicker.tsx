import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { useDraggable } from "@dnd-kit/core";
import { FiCircle } from "react-icons/fi";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  id: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, id }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: any) => {
    onChange(color.hex);
  };

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <FiCircle
        onClick={handleClick}
        style={{
          color: color,
          width: "24px",
          height: "24px",
          cursor: "pointer",
        }}
      />
      {displayColorPicker ? (
        <div style={{ position: "absolute", zIndex: 2 }}>
          <div
            style={{
              position: "fixed",
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            }}
            onClick={handleClose}
          />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
