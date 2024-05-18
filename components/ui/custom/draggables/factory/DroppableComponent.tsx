import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SketchPicker } from 'react-color';

interface DroppableProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export default function DroppableComponent(props: DroppableProps): JSX.Element {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const [size, setSize] = useState({ width: 200, height: 200 });
  const [isResizing, setIsResizing] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState("#ffffff");

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      setSize((prevSize) => ({
        width: prevSize.width + e.movementX,
        height: prevSize.height + e.movementY,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  React.useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleDrop = (event: React.DragEvent) => {
    const droppedId = event.dataTransfer.getData("text/plain");
    if (droppedId === "color-picker") {
      setShowColorPicker(true);
    }
  };

  const handleColorChange = (color: any) => {
    setColor(color.hex);
  };

  const handleCloseColorPicker = () => {
    setShowColorPicker(false);
  };

  const isEmpty = !React.Children.count(props.children) || props.children === 'Placez un élément ici !';
  const baseClasses = "m-4 p-4 min-h-[100px] transition-colors duration-1000 relative";
  const emptyClasses = "border-2 border-dashed border-gray-400 animate-pulse";
  const filledClasses = "border-2 border-solid border-gray-200";

  return (
    <div
      ref={setNodeRef}
      className={`${baseClasses} ${isEmpty ? emptyClasses : filledClasses} ${props.className}`}
      style={{ width: size.width, height: size.height, backgroundColor: color }}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {props.children}
      <div
        onMouseDown={handleMouseDown}
        className="absolute bottom-0 right-0 w-4 h-4 bg-gray-500 cursor-se-resize"
      />
      {showColorPicker && (
        <div style={{ position: "absolute", zIndex: 2 }}>
          <div
            style={{
              position: "fixed",
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            }}
            onClick={handleCloseColorPicker}
          />
          <SketchPicker color={color} onChange={handleColorChange} />
          <button
            onClick={handleCloseColorPicker}
            className="absolute top-0 right-0 m-2 p-1 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
