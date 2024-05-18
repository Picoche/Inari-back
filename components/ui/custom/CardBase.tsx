import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import ColorPicker from "@/components/ui/ColorPicker";

const CardBase = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ draggable = false, id }) => {
  const [headerColor, setHeaderColor] = useState("#ffffff");
  const [contentColor, setContentColor] = useState("#ffffff");
  const [footerColor, setFooterColor] = useState("#ffffff");

  return (
    <Card draggable={draggable} id={id} className="w-[350px]">
      <CardHeader style={{ backgroundColor: headerColor }}>
        <CardTitle>Créer un produit</CardTitle>
        <CardDescription>
          Ajoutez votre nouveau produit en un clic.
        </CardDescription>
        <ColorPicker color={headerColor} onChange={setHeaderColor} />
      </CardHeader>
      <CardContent style={{ backgroundColor: contentColor }}>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" placeholder="Nom de votre produit" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Catégorie</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="electronics">Électronique</SelectItem>
                  <SelectItem value="furniture">Meubles</SelectItem>
                  <SelectItem value="clothing">Vêtements</SelectItem>
                  <SelectItem value="toys">Jouets</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
        <ColorPicker color={contentColor} onChange={setContentColor} />
      </CardContent>
      <CardFooter className="flex justify-between" style={{ backgroundColor: footerColor }}>
        <Button variant="outline">Annuler</Button>
        <Button>Ajouter</Button>
        <ColorPicker color={footerColor} onChange={setFooterColor} />
      </CardFooter>
    </Card>
  );
});

CardBase.displayName = "Cartes";

export { CardBase };
