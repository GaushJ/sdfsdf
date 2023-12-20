import React, {useRef, useEffect, FC} from "react";
import {Group, Rect, Text, Transformer} from "react-konva";
import ContextMenu from "../ContextMenu/ContextMenu";
import {iObjResize} from "../ContextMenu/ContextMenu";
// import Konva from "konva";

function hasTextCutOff(tnode: any) {
    const tokens = tnode.attrs.text.split(/[\s\n]+/).reduce((a: any, n: any) => {
        n.length && a.push(n)
        return a
    }, [])

    return tnode.textArr.map((el: any) => el.text).join("").length < tokens.join("").length
}

function hasExcessSpace(tnode: any) {
    return (tnode.textArr.length * tnode.textHeight) < (tnode.height() - tnode.fontSize())
}

type iProps = {
    x: number,
    y: number,
    text: string,
    isSelected: boolean,
    width: number,
    height: number,
    onClick: () => void,
    onDoubleClick:(e: boolean) => void,
    onTextClick: (item?: boolean) => void,
    textProps: any,
    onResize: (item: iObjResize) => void,
    visible: boolean,
}

const ResizableText:FC<iProps> = ({
  x,
  y,
  text,
  isSelected,
  width,
  height,
  onClick,
  onDoubleClick,
  onTextClick,
  textProps,
  onResize,
  visible,
                              }) => {
    const textRef = useRef<any>(null);
    const transformerRef = useRef<any>(null);

    useEffect(() => {
        if (isSelected) {
            transformerRef.current?.nodes([textRef.current]);
            transformerRef.current?.getLayer().batchDraw();
        }
    }, [isSelected]);

    useEffect(() => {
        handleResize({updatedHeight: height, updatedWidth: width})
    }, [text]);
    function handleResize({updatedWidth, updatedHeight}: {updatedWidth: number, updatedHeight: number}) {
        if (textRef.current !== null) {
            const textNode = textRef.current;
            const newWidth = updatedWidth ?? Math.round((textNode.width() as number) * (textNode.scaleX() as number));
            const newHeight = updatedHeight ?? Math.round((textNode.height() as number) * (textNode.scaleY() as number));

            textNode.scaleX(1) as number;
            textNode.scaleY(1) as number;

            textNode.setAttrs({
                x: textNode.x(),
                y: textNode.y(),
                width: newWidth,
                scaleX: 1
            });

            if ( hasTextCutOff(textNode) ) {
                while (hasTextCutOff(textNode)) {
                    textNode.fontSize(textNode.fontSize() - 1) // DOM update
                }
            }

            if (hasExcessSpace(textNode)) {
                while (hasExcessSpace(textNode) && (hasTextCutOff(textNode) === false)) {
                    console.log(textNode.fontSize())
                    if (textProps.fontSizeMin || textProps.fontSizeMax) {
                        textNode.fontSize(Math.max(textProps.fontSizeMin, Math.min(textNode.fontSize(), textProps.fontSizeMax)))
                    } else {
                        textNode.fontSize(textNode.fontSize() + 1) // DOM update again
                    }
                }
            }

            const resultFontSize = textNode.fontSize() // can put this one to state iguess

            if (!!textProps.fontSizeMin || !!textProps.fontSizeMax) {
                onResize({newWidth, newHeight,
                    fontSize: Math.max(textProps.fontSizeMin, Math.min(resultFontSize, textProps.fontSizeMax)),
                    x: textNode.x(), y: textNode.y()});
            } else {
                onResize({newWidth, newHeight,
                    fontSize: resultFontSize,
                    x: textNode.x(), y: textNode.y()});
            }
        }
    }

    // function processText(text) {
    //     const fragments = [];
    //     // let currentIndex = 0;
    //
    //     function addFragment(fontStyle, textDecoration, content) {
    //         fragments.push({ fontStyle, textDecoration, content });
    //     }
    //
    //     text.replace(/<([biu])>(.*?)<\/\1>|([^<]*)/g, (match, tag, content, nonTagContent) => {
    //         if (nonTagContent) {
    //             addFragment("normal", 'none', nonTagContent);
    //             // not used
    //             // currentIndex += nonTagContent.length;
    //         }
    //
    //         if (tag) {
    //             if (tag === "i") {
    //                 addFragment("italic", 'none', content);
    //             } else if (tag === "b") {
    //                 addFragment("bold", 'none', content);
    //             } else if (tag === "u") {
    //                 addFragment('normal', "underline", content);
    //             }
    //         }
    //     });
    //
    //     return fragments;
    // }

    // function getTextWidth(text, textProps) {
    //     const tempLayer = new Konva.Layer();
    {/*    const tempText = new Konva.Text({*/}
    {/*        text,*/}
    //         fill: textProps.color,
    //         align: textProps.textAlign,
    //         fontFamily: "sans-serif",
    //         letterSpacing: textProps.letterSpacing,
    //         lineHeight: textProps.lineHeight,
    //         fontSize: textProps.fontSize,
    //     });
    //
    //     tempLayer.add(tempText);
    //     Konva.stage = new Konva.Stage({
    //         container: "tempContainer",
    //         width: 1,
    //         height: 1,
    //         layers: [tempLayer],
    //     });
    //
    //     const textWidth = tempText.width();
    //
    //     tempLayer.destroy();
    //     Konva.stage.destroy();
    //
    //     return textWidth;
    // }

    // const processedText = processText(text);
    return (
        <Group
            key={textProps.id}
            x={x}
            y={y}
            width={width}
            height={height}
            draggable
        >
            <Rect
                visible={visible}
                width={width}
                height={height}
                stroke={'black'}
                x={x}
                y={y}
            />
            <Text
                visible={visible}
                ref={textRef}
                fill={textProps.color}
                align={textProps.textAlign}
                fontFamily="sans-serif"
                letterSpacing={textProps.letterSpacing}
                lineHeight={textProps.lineHeight}
                fontStyle={textProps.fontStyle}
                textDecoration={textProps.textDecoration}
                wrap={'word'}
                onClick={onClick}
                onTap={onClick}
                onDblClick={onDoubleClick}
                onDblTap={onDoubleClick}
                onContextMenu={(e) => {
                    e.evt.preventDefault()
                    onTextClick()
                }}
                width={width}
                height={height}
                {...textProps}
                onTransform={handleResize}
            />
            {/*<Html>*/}
            {/*    <div*/}
            {/*        dangerouslySetInnerHTML={{__html: text}}*/}
            {/*        style={{width: width - 20, height: height - 20, position: 'absolute', top: y, left: x, zIndex: -10}}*/}
            {/*    />*/}
            {/*</Html>*/}
            {/*{processedText.map((item, index) => {*/}
            {/*    let xPosition = x;*/}
            {/*    if (index > 0) {*/}
            {/*        const previousItem = processedText[index - 1];*/}
            {/*        const previousItemWidth = getTextWidth(previousItem.content, textProps);*/}
            {/*        xPosition += previousItemWidth;*/}
            {/*    }*/}
            {/*    return <Text*/}
            {/*        y={y}*/}
            {/*        x={xPosition}*/}
            {/*        text={item.content}*/}
            {/*            fill={textProps.color}*/}
            {/*            align={textProps.textAlign}*/}
            {/*            fontFamily="sans-serif"*/}
            {/*            letterSpacing={textProps.letterSpacing}*/}
            {/*            lineHeight={textProps.lineHeight}*/}
            {/*            fontStyle={item.fontStyle}*/}
            {/*            textDecoration={item.textDecoration}*/}
            {/*    />*/}

            {/*})}*/}
            {isSelected && (
                <>
                    <Transformer
                        visible={visible}
                        ref={transformerRef}
                        boundBoxFunc={(oldBox, newBox) => {
                            // limit resize
                            if (newBox.width < 5 || newBox.height < 5) {
                                return oldBox;
                            }
                            return newBox;
                        }}
                    />
                    <ContextMenu
                        visible={visible}
                        x={x}
                        y={y}
                        width={width}
                        onResize={onResize}
                        handleResize={handleResize}
                        {...textProps}
                    />
                </>
            )}
        </Group>
    );
}

export default ResizableText
