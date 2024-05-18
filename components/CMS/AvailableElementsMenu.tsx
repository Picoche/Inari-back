"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReactElementWithComponentType } from "@/app/page";

interface AvailableElementsMenuProps {
  showAside: boolean;
  draggables: { [key: string]: ReactElementWithComponentType };
  switchBehaviour: { mode: "swapAndKeep" | "swapAndRemove" | "swap" };
  updateSwitchBehaviour: (
    mode: "swapAndKeep" | "swapAndRemove" | "swap"
  ) => void;
}

const AvailableElementsMenu: React.FC<AvailableElementsMenuProps> = ({
  showAside,
  draggables,
  switchBehaviour,
  updateSwitchBehaviour,
}) => {
  const [openBlocks, setOpenBlocks] = useState<{ [key: string]: boolean }>({});

  const toggleBlock = (displayName: string) => {
    setOpenBlocks((prev) => ({
      ...prev,
      [displayName]: !prev[displayName],
    }));
  };

  const draggablesByDisplayName: {
    [key: string]: ReactElementWithComponentType[];
  } = {};

  Object.values(draggables).forEach((element) => {
    const displayName = element.type.displayName || "";
    if (!draggablesByDisplayName[displayName]) {
      draggablesByDisplayName[displayName] = [];
    }
    draggablesByDisplayName[displayName].push(element);
  });

  const sortedDisplayNames = Object.keys(draggablesByDisplayName).sort();

  return (
    <aside
      className={`transform transition-transform duration-300 ease-in-out h-full w-full bg-gray-800 text-white p-4 ${
        showAside ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex flex-col items-start gap-5">
        <div className="flex overflow-x-auto space-x-4">
          {sortedDisplayNames.map((displayName) => (
            <div key={displayName} className="flex-shrink-0">
              <button
                onClick={() => toggleBlock(displayName)}
                className="w-full text-left text-lg font-semibold text-orange-500"
              >
                {displayName}
              </button>
              <div className="flex flex-col mt-2">
                {openBlocks[displayName] &&
                  draggablesByDisplayName[displayName].map((element, index) => (
                    <div key={index} className="p-2 bg-gray-700 rounded-md">
                      {element}
                    </div>
                  ))}
                {!openBlocks[displayName] &&
                  draggablesByDisplayName[displayName]
                    .slice(0, 4)
                    .map((element, index) => (
                      <div
                        key={index}
                        className="scale-50 pointer-events-none p-2 bg-gray-700 rounded-md"
                      >
                        {React.cloneElement(element, { draggable: false })}
                      </div>
                    ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 w-full">
          <h2 className="text-lg font-semibold text-orange-500">Comportement</h2>
          <div className="flex flex-col gap-2 mt-2">
            <Button
              onClick={() => updateSwitchBehaviour("swapAndKeep")}
              variant={
                switchBehaviour.mode === "swapAndKeep" ? "ghost" : "default"
              }
              className="w-full"
            >
              Dupliquer
            </Button>
            <Button
              onClick={() => updateSwitchBehaviour("swapAndRemove")}
              variant={
                switchBehaviour.mode === "swapAndRemove" ? "ghost" : "default"
              }
              className="w-full"
            >
              Remplacer et supprimer
            </Button>
            <Button
              onClick={() => updateSwitchBehaviour("swap")}
              variant={switchBehaviour.mode === "swap" ? "ghost" : "default"}
              className="w-full"
            >
              Remplacer
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AvailableElementsMenu;
