import React, {CSSProperties, FC} from "react";
import { Html } from "react-konva-utils";

type iProps = {
    x: number,
    y: number,
    width: number,
    height: number,
    fontSize: number,
    value: string,
    onChange: (e: any) => void,
    onKeyDown: (e: any) => void,
    color: string,
    textAlign: string,
    letterSpacing: number,
    lineHeight: number,
    fontSizeMin: number,
    fontSizeMax: number,
}

function getStyle(width: number, height: number, fontSize: number, color: string, textAlign: string, letterSpacing: number, lineHeight: number, fontSizeMin: number, fontSizeMax: number) {
    const baseStyle = {
        width: `${width}px`,
        height: `${height}px`,
        color: `${color}`,
        textAlign,
        border: "1px solid black",
        padding: "0px",
        margin: "-2px",
        background: "none",
        fontFamily: "sans-serif",
        outline: "none",
        resize: "none",
        fontSize: (!!fontSizeMin && !!fontSizeMax) ? Math.min(Math.max(fontSize, fontSizeMax), fontSizeMin) : fontSize,
        letterSpacing,
        lineHeight: `${lineHeight}em`,
    };
    return {
        ...baseStyle,
    };
}

const EditableTextInput:FC<iProps> = ({
  x,
  y,
  width,
  height,
    fontSize,
  value,
  onChange,
  onKeyDown,
    color,
    textAlign,
    letterSpacing,
    lineHeight,
    fontSizeMin,
    fontSizeMax,
    // onSave
}) => {
    const style = getStyle(width, height, fontSize, color, textAlign, letterSpacing, lineHeight, fontSizeMin, fontSizeMax);

    return (
        <Html groupProps={{ x: 2*x, y: 2*y }} divProps={{ style: { opacity: 1 } }}>
          <textarea
              value={value}
              onChange={onChange}
              onKeyDown={onKeyDown}
              style={style as CSSProperties}
          />
        </Html>
    );
}

export default EditableTextInput