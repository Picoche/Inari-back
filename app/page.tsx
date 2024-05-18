"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import DroppableComponent from "@/components/ui/custom/draggables/factory/DroppableComponent";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import AvailableElementsMenu from "@/components/CMS/AvailableElementsMenu";
import LayoutMenu from "@/components/CMS/LayoutMenu";
import { CardBase } from "@/components/ui/custom/CardBase";

interface SwitchElementsBehaviour {
  mode: "swapAndKeep" | "swapAndRemove" | "swap";
}

export type ReactElementWithComponentType = React.ReactElement & {
  type: React.ComponentType<any>;
};



const predefinedLayouts = {
  layout1: ["A", "B", "C"],
  layout2: ["A", "B", "C", "D"],
  layout3: ["A", "B"],
};

export default function Home() {
  const predefinedLayouts: Record<string, string[]> = {
    layout1: ["A", "B", "C"],
    layout2: ["A", "B", "C", "D"],
    layout3: ["A", "B"],
  };
  const [layout, setLayout] = useState("layout1");
  const [hoverLayout, setHoverLayout] = useState<string | null>(null);
  const containers = predefinedLayouts[layout];
  const hoverContainers = hoverLayout ? predefinedLayouts[hoverLayout] : [];
  const [showAside, setShowAside] = useState(false);
  const [switchBehaviour, setSwitchBehaviour] =
    useState<SwitchElementsBehaviour>({ mode: "swapAndKeep" });
  const [draggables, setDraggables] = useState<{
    [key: string]: ReactElementWithComponentType;
  }>({
    "0": (
      <Button variant="secondary" draggable id="0">
        Button 1
      </Button>
    ),
    "1": (
      <Button variant="destructive" draggable id="1">
        Button 2
      </Button>
    ),
    "2": <CardBase draggable id="2"></CardBase>,
    "3": (
      <Button variant="outline" draggable id="3">
        Button 3
      </Button>
    ),
    "4": (
      <Button variant="default" draggable id="4">
        Button 4
      </Button>
    ),
    "5": (
      <Button variant="ghost" draggable id="5">
        Button 5
      </Button>
    ),
    "6": (
      <Button variant="link" draggable id="6">
        Button 6
      </Button>
    ),
  });
  const [droppedElements, setDroppedElements] = useState<{
    [key: string]: React.ReactElement;
  }>({});

  const toggleAside = () => setShowAside((prev) => !prev);

  const updateSwitchBehaviour = (mode: SwitchElementsBehaviour["mode"]) =>
    setSwitchBehaviour({ mode });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const { id } = active;
    const containerId = over?.id;

    if (containerId) {
      if (droppedElements[containerId]) {
        replaceDroppedElementByCurrentlyDraggedElement(containerId, id);
      } else {
        addDroppedElement(containerId, id);
      }
    }
    switch (switchBehaviour.mode) {
      case "swapAndKeep":
        if (!over) {
          removeDroppedElement(id);
        }
        break;
      case "swapAndRemove":
        if (!over || containerId !== id) {
          removeDroppedElement(id);
        }
        break;
      case "swap":
        if (!over || containerId !== id) {
          if (containerId) {
            removeDroppedElement(containerId);
            addDroppedElement(containerId, id);
          }
        }
    }
  }

  function removeDroppedElement(id: UniqueIdentifier) {
    setDroppedElements((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  }

  function addDroppedElement(
    id: UniqueIdentifier,
    originalId: UniqueIdentifier
  ) {
    const nodeCopy = draggables[originalId]
      ? React.cloneElement(draggables[originalId], { id, key: id })
      : React.cloneElement(droppedElements[originalId], { id, key: id });
    if (React.isValidElement(draggables[originalId])) {
      console.log(
        (draggables[originalId].type as React.ComponentType<any>).displayName
      );
    }
    setDroppedElements((prev) => ({ ...prev, [id]: nodeCopy }));
  }

  function replaceDroppedElementByCurrentlyDraggedElement(
    id: UniqueIdentifier,
    originalId: UniqueIdentifier
  ) {
    if (id !== originalId) {
      const nodeCopy = draggables[originalId]
        ? React.cloneElement(draggables[originalId], { id, key: id })
        : React.cloneElement(droppedElements[originalId], { id, key: id });
      setDroppedElements((prev) => ({ ...prev, [id]: nodeCopy }));
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <AvailableElementsMenu
        showAside={showAside}
        draggables={draggables}
        switchBehaviour={switchBehaviour}
        updateSwitchBehaviour={updateSwitchBehaviour}
      />
      <Button onClick={toggleAside} className="bg-orange-500 text-white">
        {showAside ? "Fermer" : "Ouvrir"}
      </Button>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {containers.map((id, index) => (
            <DroppableComponent
              className={`col-span-1 sm:col-span-${(index % 2) + 1} lg:col-span-${
                (index % 3) + 1
              }`}
              key={id}
              id={id}
            >
              {droppedElements[id]
                ? droppedElements[id]
                : "Placez un élément ici !"}
            </DroppableComponent>
          ))}
          {hoverContainers.map((id, index) => (
            <DroppableComponent
              className={`col-span-1 sm:col-span-${(index % 2) + 1} lg:col-span-${
                (index % 3) + 1
              } opacity-50 pointer-events-none`}
              key={id}
              id={id}
            >
              {droppedElements[id]
                ? droppedElements[id]
                : "Placez un élément ici !"}
            </DroppableComponent>
          ))}
        </div>
      </div>
      <LayoutMenu setLayout={setLayout} setHoverLayout={setHoverLayout} />
    </DndContext>
  );
}
