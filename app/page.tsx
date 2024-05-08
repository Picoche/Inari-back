"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import DroppableComponent from '@/components/ui/DroppableComponent';
import {DndContext, DragEndEvent, DragStartEvent, UniqueIdentifier} from '@dnd-kit/core';

// Définition de l'interface pour les éléments déposés
interface DroppedElement {
  id: UniqueIdentifier;
  originalId: UniqueIdentifier; // Ajout de la propriété originalId
  node: React.ReactElement;
}
export default function Home() {
  const containers = ['A', 'B', 'C'];
  const [showAside, setShowAside] = useState(false);
  const [draggables, setDraggables] = useState<{[key: string]: React.ReactElement}>({
    '0': <Button variant="secondary" draggable id='0'>Button 2</Button>,
    '1': <Button variant="destructive" draggable id='1'>Button 3</Button>
  });
  const [droppedElements, setDroppedElements] = useState<DroppedElement[]>([]);

  const toggleAside = () => setShowAside(prev => !prev);

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    const {id} = active
    const containerId = over?.id;

    if (containerId) {
      if (droppedElements.find(el => el.id === containerId)) {
        replaceDroppedElementByCurrentlyDraggedElement(containerId);
      } else {
        addDroppedElement(containerId, id);
      }
    }
  }

  function addDroppedElement(id: UniqueIdentifier, originalId: UniqueIdentifier) {
    const nodeCopy = draggables[originalId] ? React.cloneElement(draggables[originalId], {id, key: id}) : React.cloneElement(draggables[originalId], {id, key: id});
    setDroppedElements(prev => [...prev, {id, originalId, node: nodeCopy}]);
  }

  function replaceDroppedElementByCurrentlyDraggedElement(id: UniqueIdentifier) {
    setDroppedElements(prev => {
      const index = prev.findIndex(el => el.id === id);
      const {originalId} = prev[index];
      const nodeCopy = draggables[originalId] ? React.cloneElement(draggables[originalId], {id, key: id}) : React.cloneElement(draggables[index], {id, key: id});

      return [...prev.slice(0, index), {id, originalId, node: nodeCopy}, ...prev.slice(index + 1)];
    });
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