import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const predefinedLayouts = {
  layout1: ["A", "B", "C"],
  layout2: ["A", "B", "C", "D"],
  layout3: ["A", "B"],
};

interface LayoutMenuProps {
  setLayout: (layout: string) => void;
  setHoverLayout: (layout: string | null) => void;
}

const LayoutMenu: React.FC<LayoutMenuProps> = ({ setLayout, setHoverLayout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className={`fixed bottom-0 right-0 p-4 ${isOpen ? "w-64" : "w-16"} transition-all duration-300`}>
      <Button onClick={toggleMenu} className="bg-orange-500 text-white">
        {isOpen ? "Close" : "Layouts"}
      </Button>
      {isOpen && (
        <div className="mt-4 flex flex-col space-y-2">
          {Object.keys(predefinedLayouts).map((layout) => (
            <Button
              key={layout}
              onClick={() => setLayout(layout)}
              onMouseEnter={() => setHoverLayout(layout)}
              onMouseLeave={() => setHoverLayout(null)}
              className="bg-orange-500 text-white"
            >
              {layout}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LayoutMenu;
