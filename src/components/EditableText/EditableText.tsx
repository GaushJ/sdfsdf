import React, {FC} from "react";
import ResizableText from "../ResizableText/ResizableText";
import EditableTextInput from "../EditableTextInput/EditableTextInput";
import {iObjResize} from "../ContextMenu/ContextMenu";

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

type iProps = {
    x: number,
    y: number,
    isEditing: boolean,
    isTransforming: boolean,
    onToggleEdit: (e: boolean) => void,
    onToggleTransform: () => void,
    onChange: (e: string) => void,
    text: string,
    width: number,
    height: number,
    onChangePosition: () => void,
    textProps: any,
    onResize: (item: iObjResize) => void,
    onTextClick: (item?: boolean) => void,
}

const EditableText:FC<iProps> = ({
     x,
     y,
     isEditing,
     isTransforming,
     onToggleEdit,
     onToggleTransform,
     onChange,
     text,
     width,
     height,
    onChangePosition,
    textProps,
    onResize,
     onTextClick,
     // onSave
 }) => {
    function handleEscapeKeys(e: any) {
        if ((e.keyCode === RETURN_KEY && !e.shiftKey) || e.keyCode === ESCAPE_KEY) {
            onToggleEdit(e);
        }
    }

    function handleTextChange(e: any) {
        onChange(e.currentTarget.value);
    }

    return (
        <>
            {isEditing &&
                <EditableTextInput
                    {...textProps}
                    value={text}
                    onChange={handleTextChange}
                    onKeyDown={handleEscapeKeys}
                    // onSave={onSave}
                />
            }
            <ResizableText
                x={x}
                y={y}
                isSelected={isTransforming}
                onClick={onToggleTransform}
                onTextClick={onTextClick}
                onDoubleClick={onToggleEdit}
                text={text}
                width={width}
                height={height}
                textProps={textProps}
                onResize={onResize}
                visible={!isEditing}
            />
        </>
    );
}

export default EditableText
