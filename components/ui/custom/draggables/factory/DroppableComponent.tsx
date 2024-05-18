import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';

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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      setSize({
        width: e.clientX - e.currentTarget.getBoundingClientRect().left,
        height: e.clientY - e.currentTarget.getBoundingClientRect().top,
      });
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

  const isEmpty = !React.Children.count(props.children) || props.children === 'Placez un élément ici !';
  const baseClasses = "m-4 p-4 min-h-[100px] transition-colors duration-1000 relative"
  const emptyClasses = "border-2 border-dashed border-gray-400 animate-pulse";
  const filledClasses = "border-2 border-solid border-gray-200";

  return (
    <div
      ref={setNodeRef}
      className={`${baseClasses} ${isEmpty ? emptyClasses : filledClasses} ${props.className}`}
      style={{ width: size.width, height: size.height }}
    >
      {props.children}
      <div
        onMouseDown={handleMouseDown}
        className="absolute bottom-0 right-0 w-4 h-4 bg-gray-500 cursor-se-resize"
      />
    </div>
  );
}

