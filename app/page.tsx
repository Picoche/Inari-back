"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import DroppableComponent from '@/components/ui/DroppableComponent';
import {DndContext, DragEndEvent, UniqueIdentifier} from '@dnd-kit/core';

interface DroppedElement {
  id: UniqueIdentifier;
  node: React.ReactElement;
}

export default function Home() {
  const containers = ['A', 'B', 'C'];
  const [showAside, setShowAside] = useState(false);
  const [draggables, setDraggables] = useState<{[key: string]: React.ReactElement}>({
    '2': <Button variant="secondary" draggable id='2'>Button 2</Button>,
    '3': <Button variant="destructive" draggable id='3'>Button 3</Button>
  });
  const [droppedElements, setDroppedElements] = useState<DroppedElement[]>([]);

  const toggleAside = () => {
    setShowAside(!showAside);
  };

  function handleDragEnd(event: DragEndEvent) {
    const {over, active} = event;
  
    if (over) {
      const newId = `${active.id}-${over.id}`;
      const nodeCopy = React.cloneElement(draggables[active.id], {id: newId, key: newId});
  
      setDroppedElements(prev => {
        const filtered = prev.filter(el => el.node.key !== active.id);
  
        const index = filtered.findIndex(el => el.id === over.id);
  
        if (index === -1) {
          return [...filtered, {id: over.id, node: nodeCopy}];
        } else {
          return [...filtered.slice(0, index), {id: over.id, node: nodeCopy}, ...filtered.slice(index + 1)];
        }
      });
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='flex'>
        <aside
          className={`flex flex-col gap-5 transform transition-transform duration-300 ease-in-out h-full w-64 bg-gray-200 p-4 ${showAside ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <Button onClick={toggleAside}>{showAside ? "Fermer" : "Ouvrir"}</Button>
          {Object.values(draggables)}
        </aside>

        <Button onClick={toggleAside}>{showAside ? "Fermer" : "Ouvrir"}</Button>
        <div className="grid grid-cols-3 gap-4">
          {containers.map((id, index) => (
            <DroppableComponent className={`col-span-${index % 2 + 1} row-span-${index % 3 + 1}`} key={id} id={id}>
              {droppedElements.find(el => el.id === id)?.node || 'Placez un élément ici !'}
            </DroppableComponent>
          ))}
        </div>
      </div>
    </DndContext>
  );
}