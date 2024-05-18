import React, { useState } from "react";
import { SketchPicker } from "react-color";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: any) => {
    onChange(color.hex);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        style={{
          backgroundColor: color,
          width: "36px",
          height: "14px",
          borderRadius: "2px",
          cursor: "pointer",
        }}
      />
      {displayColorPicker ? (
        <div style={{ position: "absolute", zIndex: 2 }}>
          <div
            style={{ position: "fixed", top: "0px", right: "0px", bottom: "0px", left: "0px" }}
            onClick={handleClose}
          />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
