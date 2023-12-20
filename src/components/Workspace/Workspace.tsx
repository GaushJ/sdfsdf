"use client";

import {Button, InputNumber, Select, Slider} from "antd";
import MessageSVG from "../../assets/images/svg/message.svg";
import FileSVG from "../../assets/images/svg/file.svg";
import PrintSVG from "../../assets/images/svg/print.svg";
import ShareSVG from "../../assets/images/svg/share.svg";
import EditorMenu from "../EditorMenu";
import DrawingCanvas from "../DrawingCanvas/DrawingCanvas";
import React, {LegacyRef, useState} from "react";
import Toggle from "../ui-kit/Toggle";

type iProps = {
    scale: number,
    editorRef: LegacyRef<HTMLDivElement>,
    editorWidth: number | undefined,
    scaleChangeHandler: (item: number | null) => void,
}

export enum GridType {
    'Line' = 'line',
    'Dot' = 'dot'
}

const Workspace: React.FC<iProps> = ({scale, editorRef, editorWidth, scaleChangeHandler}) => {

    const [showedGrid, setShowedGrid] = useState<boolean>(true)
    const [gridSize, setGridWidth] = useState<number>(50)
    const [gridType, setGridType] = useState<GridType>(GridType.Line)

    const handleChangeGridSize = (e: number | null) => {
        setGridWidth(e as number)
    }
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onChangeGridType = (item: GridType) => {
        setGridType(item)
    }

    return (
        <div className={'relative h-full'}>
            <div className={'flex justify-between mb-8 px-8 py-4'}>
                <div className={'flex gap-3.5'}>
                    <p className={'text-20'}>Untitled design doc</p>
                    <Select
                        defaultValue="Workflow"
                        className={'grey-select'}
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 'workflow', label: 'Workflow' },
                            { value: 'other', label: 'Other' },
                        ]}
                    />
                </div>
                <div className={'flex gap-3.5'}>
                    <Button type={'text'} className={'flex gap-1 p-0 px-1 items-center'}>
                        <MessageSVG fill={'#141527'} />
                        <p className={'text-16'}>Notes</p>
                    </Button>
                    <Button type={'text'} className={'flex gap-1 p-0 px-1 items-center'}>
                        <FileSVG fill={'#141527'} />
                        <p className={'text-16'}>Info</p>
                    </Button>
                    <Button type={'text'} className={'flex gap-1 p-0 px-1 items-center'}>
                        <PrintSVG fill={'#141527'} />
                        <p className={'text-16'}>Print</p>
                    </Button>
                    <Button type={'text'} className={'flex gap-1 p-0 px-1 items-center'}>
                        <ShareSVG fill={'#141527'} />
                        <p className={'text-16'}>Share</p>
                    </Button>
                </div>
            </div>
            <div
                className={'p-9 rounded-3xl flex flex-col gap-11'}
                ref={editorRef}
            >
                <EditorMenu
                    setShowedGrid={setShowedGrid}
                    isShowedGrid={showedGrid}
                    onChangeGridSize={handleChangeGridSize}
                    gridSize={gridSize}
                    gridType={gridType}
                    onChangeGridType={onChangeGridType}
                />
                <DrawingCanvas
                    scale={scale}
                    setScale={scaleChangeHandler}
                    width={editorWidth}
                    showedGrid={showedGrid}
                    gridSize={gridSize}
                    gridType={gridType}
                />
                <div className={'flex justify-between border-t absolute bottom-0 left-0 w-full items-center py-8 px-9 z-10 background-white'}>
                    <div className={'flex gap-7 items-center'}>
                        <div>
                            <Slider
                                min={1}
                                max={100}
                                defaultValue={30}
                                value={scale}
                                step={1}
                                onChange={scaleChangeHandler}
                                className={'w-64'}
                            />
                        </div>
                        <div className={'flex gap-1'}>
                            <InputNumber
                                value={scale}
                                onChange={scaleChangeHandler}
                                min={1}
                                max={100}
                                className={'w-20'}
                            />
                        </div>
                        <Toggle
                            isActive={showedGrid}
                            onClick={() => setShowedGrid((prev) => !prev)}
                        />
                    </div>
                    <div>
                        <Button
                            size={"large"}
                            type={'primary'}
                            ghost
                            style={{padding: '12px 32px'}}
                            className={'flex items-center h-auto'}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workspace
