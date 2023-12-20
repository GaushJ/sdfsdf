import React, {useState, useEffect, FC} from "react";
import { Group } from "react-konva";
import EditableText from "../EditableText/EditableText";
import {iObjResize} from "../ContextMenu/ContextMenu";

type iProps = {
    text: string,
    x: number,
    y: number,
    width: number,
    height: number,
    onResize: (item: iObjResize) => void,
    onTextChange: (item: string) => void,
    selected: boolean,
    onTextClick: (item?: boolean) => void,
    onChange: () => void,
    textProps: any
}

export const StickyNote: FC<iProps> = ({
   // colour = 'black',
   text,
   x,
   y,
   width,
   height,
   // onClick,
    onResize,
   onTextChange,
   selected,
   onTextClick,
    onChange,
    // onSave,
    textProps
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);

    useEffect(() => {
        if (!selected && isEditing) {
            setIsEditing(false);
        } else if (!selected && isTransforming) {
            setIsTransforming(false);
        }
    }, [selected, isEditing, isTransforming]);

    function toggleEdit() {
        setIsEditing(!isEditing);
        onTextClick(!isEditing);
    }

    function toggleTransforming() {
        setIsTransforming(!isTransforming);
        onTextClick(!isTransforming);
    }

    return (
        <Group x={x} y={y}>
            <EditableText
                x={x}
                y={y}
                text={text}
                width={width}
                height={height}
                isEditing={isEditing}
                isTransforming={isTransforming}
                onToggleEdit={toggleEdit}
                onTextClick={onTextClick}
                onToggleTransform={toggleTransforming}
                onChange={onTextChange}
                onResize={onResize}
                onChangePosition={onChange}
                textProps={textProps}
                // onSave={onSave}
            />
        </Group>
    );
}
