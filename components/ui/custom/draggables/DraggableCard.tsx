import { CardBase } from "@/components/ui/custom/CardBase";
import DraggableComponent from "./factory/DraggableComponent";

export default function DraggableCard({draggable = false, ...props}) {
    return draggable ? <DraggableComponent id={props.id || 'draggable-card'}>{<CardBase {...props} />}</DraggableComponent> : <CardBase {...props} />;
}