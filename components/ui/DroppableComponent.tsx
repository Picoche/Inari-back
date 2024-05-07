import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import {motion} from 'framer-motion';

interface DroppableProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export default function DroppableComponent(props: DroppableProps): JSX.Element {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });

  const isEmpty = !React.Children.count(props.children) || props.children === 'Placez un élément ici !';
  const baseClasses = "m-4 p-4 min-h-[100px] transition-colors duration-1000";
  const emptyClasses = "border-2 border-dashed border-gray-400 animate-pulse";
  const filledClasses = "border-2 border-solid border-gray-200";

  return (
    <motion.div 
      ref={setNodeRef} 
      className={`${baseClasses} ${isEmpty ? emptyClasses : filledClasses} ${props.className}`}
    >
      {props.children}
    </motion.div>
  );
}