import {Circle, Rect, Transformer} from "react-konva";
import {FC, Fragment, useEffect, useRef} from "react";

type iProps = {
    shapeProps: any,
    isSelected: boolean,
    onSelect: () => void,
    onChange: (item: any) => void,
    elementType: string
}
//@ts-ignore
const Shapes: FC<iProps> = ({ shapeProps, isSelected, onSelect, onChange, elementType }) => {
    const shapeRef = useRef<any>();
    const trRef = useRef<any>();

    useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    const transformElement = () => {
        const node = shapeRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        let radius;

        if (elementType === 'circle') {
            radius = Math.max(5, node.radius() * scaleX);
        }

        node.scaleX(1);
        node.scaleY(1);

        switch (elementType) {
            case 'rect': onChange({
                ...shapeProps,
                x: node.x(),
                y: node.y(),
                width: Math.max(5, node.width() * scaleX),
                height: Math.max(node.height() * scaleY),
            });
            break;
            case 'circle': onChange({
                ...shapeProps,
                x: node.x(),
                y: node.y(),
                radius,
            });
        }
    }

    switch (elementType) {
        case 'rect': return <Fragment>
                <Rect
                    onClick={onSelect}
                    onTap={onSelect}
                    ref={shapeRef}
                    {...shapeProps}
                    draggable
                    fill={'black'}
                    stroke={'white'}
                    onDragEnd={(e) => {
                        onChange({
                            ...shapeProps,
                            x: e.target.x(),
                            y: e.target.y(),
                        });
                    }}
                    onTransformEnd={transformElement}
                />
                {isSelected && (
                    <Transformer
                        ref={trRef}
                        boundBoxFunc={(oldBox, newBox) => {
                            // limit resize
                            if (newBox.width < 5 || newBox.height < 5) {
                                return oldBox;
                            }
                            return newBox;
                        }}
                    />
                )}
            </Fragment>
        case 'circle': return <Fragment>
            <Circle
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                fill={'black'}
                stroke={'white'}
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={transformElement}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </Fragment>
    }
};

export default Shapes
