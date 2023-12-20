import { KonvaEventObject } from 'konva/lib/Node';
import React, {FC, useEffect, useRef, useState} from 'react';
import {Layer, Rect, Stage, Transformer} from 'react-konva';
import Ruler from "../Ruler/Ruler";
import { useDraftContext } from '../../context/draftContext';
import Konva from 'konva';
import { NodeConfig, Node } from 'konva/lib/Node';
import { GridType } from '../Workspace/Workspace';
import {renderToString} from "react-dom/server";

type iProps = {
    scale: number,
    setScale: (item: number) => void,
    width: number | undefined,
    showedGrid: boolean,
    gridSize: number,
    gridType: GridType
}

const DrawingCanvas:FC<iProps> = ({scale, setScale, width, showedGrid, gridSize, gridType}) => {

    const stageRef = useRef<HTMLDivElement>(null);
    const stageKonvaRef = useRef(null);

    const referencePoint = useRef({ x: 0, y: 0 });

    const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });
    const [viewportSize, setViewportSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    const {draftSize} = useDraftContext()
    const [isDraftSelected, setIsDraftSelected] = useState(false)
    const [backgrooundGridSize, setbackgrooundGridSize] = useState<number>(gridSize)
    const shapeRef = useRef<Konva.Rect>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const initialScale = 10

    useEffect(() => {
        const handleResize = () => {
            setViewportSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isDraftSelected) {
            trRef?.current?.nodes([shapeRef?.current as Node<NodeConfig>]);
            trRef?.current?.getLayer()?.batchDraw();
        }
    }, [isDraftSelected]);

    const checkDeselect = (e: { target: { getStage: () => unknown; }; }) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setIsDraftSelected(false);
        }
    };

    const handleWheel = (e: { evt: { preventDefault: () => void; deltaY: number; }; }) => {
        e.evt.preventDefault();
        const delta = e.evt.deltaY;

        const newScale = delta > 0 ? scale + 1 : scale - 1;
        const scaleChangeFactor = newScale / scale;
        const newViewportWidth = viewportSize.width * scaleChangeFactor;
        const newViewportHeight = viewportSize.height * scaleChangeFactor;

        setViewportSize({
            width: Math.max(newViewportWidth, width!),
            height: Math.max(newViewportHeight, 650),
        });

        setCanvasPosition({
            x: canvasPosition.x * scaleChangeFactor,
            y: canvasPosition.y * scaleChangeFactor,
        });

        setScale(newScale);
    };

    const handleDragMoveStage = (e: any) => {
        const stage = stageKonvaRef.current;
        if (stage) {
            setCanvasPosition({
                x: e.target.x() / (scale / 10),
                y: e.target.y() / (scale / 10),
            });
        }
    };

    const handleGridScaling = () => {
        if (scale > initialScale) {
            return gridSize * (1 + (scale - initialScale) / 10)
        }
        if (scale < initialScale) {
            return gridSize * ((scale) / 10)
        }
        return gridSize
    }

    useEffect(() => setbackgrooundGridSize(handleGridScaling()), [gridSize, scale])

    const svgContent = () => encodeURIComponent('<svg id="svgGrid" width="100" height="100" xmlns="http://www.w3.org/2000/svg">\n' +
        '          <defs>\n' +
        '              <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">\n' +
        '                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" stroke-width="0.5"/>\n' +
        '              </pattern>\n' +
        '              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">\n' +
        '                  <rect width="100" height="100" fill="url(#smallGrid)"/>\n' +
        '                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="1"/>\n' +
        '              </pattern>\n' +
        '          </defs>\n' +
        '\n' +
        '          <rect width="100" height="100" fill="url(#grid)" />\n' +
        '      </svg>')

    return (
        <div ref={stageRef} className={'relative'} style={{
            maxWidth: width,
            maxHeight: 580,
            overflow: "auto",
        }}>
            <Ruler scale={scale} maxWidth={2 * width!} offsetX={-canvasPosition.x}/>
            <Ruler scale={scale} isVertical maxHeight={800} offsetY={canvasPosition.y}/>
            <Stage
                ref={stageKonvaRef}
                width={stageRef?.current?.clientWidth! * 2.2}
                height={800}
                // onWheel={handleWheel}
                onClick={checkDeselect}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
                draggable
                className={'background-grid mt-5 ml-5'}
                style={{
                    backgroundImage: showedGrid ? gridType === GridType.Line ? `url("data:image/svg+xml,${svgContent()}")`: showedGrid && gridType === GridType.Dot ? 'radial-gradient(black 1px, transparent 0)' : undefined : undefined,
                    backgroundRepeat: 'repeat',
                    backgroundSize: gridType === GridType.Line ? `${backgrooundGridSize}px` : `${backgrooundGridSize}px ${backgrooundGridSize}px`,
                    backgroundPosition: gridType === GridType.Dot ? '-19px -19px' : undefined,
                    width: 'fit-content',
                    position: 'absolute',
                    top: 8,
                }}
                onDragMove={handleDragMoveStage}
            >

                <Layer scaleX={scale / 10} scaleY={scale / 10} offsetX={referencePoint.current.x} offsetY={referencePoint.current.y}>
                    {
                        draftSize &&
                        <Rect
                            ref={shapeRef}
                            onClick={() =>setIsDraftSelected(true)}
                            x={50}
                            y={50}
                            width={draftSize?.x}
                            height={draftSize?.y}
                            fill={"white"}
                            isSelected={isDraftSelected}
                            onSelect={() => {
                                setIsDraftSelected(true);
                            }}
                        />
                    }
                    {isDraftSelected && (
                        <Transformer
                            ref={trRef}
                            enabledAnchors={['bottom-right']}
                            rotateEnabled={false}
                            boundBoxFunc={(oldBox, newBox) => {
                                if (newBox.width < 5 || newBox.height < 5) {
                                    return oldBox;
                                }
                                return newBox;
                            }}
                        />
                    )
                    }
                </Layer>
            </Stage>
        </div>
    );
};

export default DrawingCanvas;
