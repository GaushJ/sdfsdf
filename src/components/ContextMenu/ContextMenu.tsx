import {Html} from "react-konva-utils";
import {FC, useState} from "react";
import {Button, ColorPicker, Dropdown, InputNumber, Row} from "antd";
import {
    AlignCenterOutlined,
    AlignLeftOutlined,
    AlignRightOutlined, BoldOutlined, ColumnHeightOutlined, ColumnWidthOutlined,
    DownOutlined, FontSizeOutlined,
    FullscreenExitOutlined, ItalicOutlined, MenuOutlined, UnderlineOutlined
} from "@ant-design/icons";
import {Color} from "antd/lib/color-picker";

const fontSizeList = [6, 8, 10, 12, 14, 16, 18 ,20, 22, 24, 36, 47, 54];
const fontStyleList = [
    {
        style: 'normal',
        decoration: 'none',
        icon: 'A',
    },
    {
        style: 'bold',
        decoration: 'none',
        icon: <BoldOutlined />
    },
    {
        style: 'italic',
        decoration: 'none',
        icon: <ItalicOutlined />
    },
    {
        style: 'normal',
        decoration: 'underline',
        icon: <UnderlineOutlined />
    },
];
const letterSpacingList = [0, 1, 2, 3, 4, 6, 8, 10];
const lineHeightList = [1, 2, 3, 4, 6, 8, 10];

const textAlignList = [
    {
        align: 'justify',
        icon:  <MenuOutlined />
    },
    {
        align: 'left',
        icon: <AlignLeftOutlined />
    },
    {
        align: 'center',
        icon: <AlignCenterOutlined />
    },
    {
        align: 'right',
        icon: <AlignRightOutlined />
    },
];

const resizeTypes = ['auto', 'manually']

export type iObjResize = {
    newWidth?: number,
    newHeight?: number,
    x?: number,
    y?: number,
    updatedWidth?: number,
    updatedHeight?: number,
    fontSize?: number,
    resizeType?: string,
    textDecoration?: string,
    fontStyle?: string,
    textAlign?: string,
    color?: string,
    letterSpacing?: number,
    lineHeight?: number,
    fontSizeMin?: number,
    fontSizeMax?: number,
}

type iProps = {
    x: number,
    y: number,
    width: number,
    height: number,
    onResize: (item: iObjResize) => void,
    color: string,
    fontSizeMax: number,
    fontSizeMin: number,
    resizeType: string,
    handleResize: (item: iObjResize) => void,
    visible: boolean
}

const ContextMenu:FC<iProps> = ({x, y, width, height, onResize, color, fontSizeMax, fontSizeMin, resizeType, handleResize, visible}) => {

    const [isOpenColorPicker, setIsOpenColorPicker] = useState(false);

    const fontSizeDropdownItems = fontSizeList.map(item => {
        return {
            key: item,
            label: <div onClick={() => onResize({ fontSize: item, resizeType: 'manually' })}>
                {item}
            </div>
        }
    })
    const fontStyleDropdownItems = fontStyleList.map(({ style, decoration, icon }) => {
        return {
            key: `${style + decoration}`,
            label: <div onClick={() => onResize({textDecoration: decoration, fontStyle: style})}>
                {icon}
            </div>
        }
    })
    const letterSpacingDropdownItems = letterSpacingList.map(item => {
        return {
            key: item,
            label: <div onClick={() => onResize({ letterSpacing: item, resizeType: 'manually' })}>
                {item}
            </div>
        }
    })
    const lineHeightDropdownItems = lineHeightList.map(item => {
        return {
            key: item,
            label: <div onClick={() => onResize({ lineHeight: item, resizeType: 'manually' })}>
                {item}
            </div>
        }
    })
    const textAlignDropdownItems = textAlignList.map(({align, icon}) => {
        return {
            key: align,
            label: <div onClick={() => onResize({ textAlign: align })}>
                {icon}&nbsp;{align}
            </div>
        }
    })
    const resizeTypeDropdownItems = resizeTypes.map(item => {
        return {
            key: item,
            label: <div className={'capitalize'} onClick={() => onResize({ resizeType: item })}>
                {item}
            </div>
        }
    })

    return (
        <Html groupProps={{ x, y }} divProps={{style:
                {
                    opacity: 1,
                    position: "absolute",
                    left: `${width}px`,
                    background: '#ffffffaa',
                    display: visible ? 'block' : 'none'
                } }}>
            <div className="w-14 flex flex-col space-y-2">
                <Row justify={"center"} align={"middle"}>
                    <InputNumber
                        min={10}
                        value={Math.ceil(width)}
                        onChange={(e) => handleResize({ updatedWidth: e!})}
                    />
                    <p> x </p>
                    <InputNumber
                        min={10}
                        value={Math.ceil(height)}
                        onChange={(e) => handleResize({ updatedHeight: e! })}
                    />
                </Row>
                <Dropdown
                    menu={{ items: fontSizeDropdownItems}}
                    disabled={!!((fontSizeMin || fontSizeMax) && resizeType === 'auto')}
                    overlayStyle={{maxHeight: '60px', overflow: 'auto'}}
                    placement="bottom"
                    arrow={{ pointAtCenter: true }}
                >
                    <Button><FontSizeOutlined /></Button>
                </Dropdown>
                <Dropdown
                    menu={{ items: letterSpacingDropdownItems}}
                    overlayStyle={{maxHeight: '60px', overflow: 'auto'}}
                    placement="bottom"
                    arrow={{ pointAtCenter: true }}
                >
                    <Button><ColumnWidthOutlined /></Button>
                </Dropdown>
                <Row>
                    <p>Font min</p>
                    <InputNumber
                        min={0}
                        max={100}
                        value={fontSizeMin}
                        onChange={(e) => {
                            if (fontSizeMax <= fontSizeMin) {
                               return  onResize({fontSizeMin: e!, fontSizeMax: e!})
                            } else {
                                return onResize({fontSizeMin: e!})
                        }}}
                    />
                </Row>
                <Row>
                    <p>Font max</p>
                    <InputNumber
                        min={0}
                        max={100}
                        value={fontSizeMax}
                        onChange={(e) => onResize({ fontSizeMax: e! })}
                    />
                </Row>
                <Dropdown
                    menu={{ items: lineHeightDropdownItems}}
                    overlayStyle={{maxHeight: '60px', overflow: 'auto'}}
                    placement="bottom"
                    arrow={{ pointAtCenter: true }}
                >
                    <Button><ColumnHeightOutlined /></Button>
                </Dropdown>
                <Dropdown
                    menu={{ items: textAlignDropdownItems}}
                    overlayStyle={{maxHeight: '60px', overflow: 'auto'}}
                    placement="bottom"
                    arrow={{ pointAtCenter: true }}
                >
                    <Button><AlignLeftOutlined /></Button>
                </Dropdown>
                <Dropdown
                    menu={{ items: fontStyleDropdownItems}}
                    overlayStyle={{maxHeight: '60px', overflow: 'auto'}}
                    placement="bottom"
                    arrow={{ pointAtCenter: true }}
                >
                    <Button><ItalicOutlined /></Button>
                </Dropdown>
                <Dropdown className={'w-14'} menu={{ items: resizeTypeDropdownItems }} overlayStyle={{maxHeight: '60px', overflow: 'auto'}} placement="bottom" arrow={{ pointAtCenter: true }}>
                    <Button className={"mx-auto my-auto"}><FullscreenExitOutlined /></Button>
                </Dropdown>
                <ColorPicker
                    open={isOpenColorPicker}
                    onChange={(value: Color) => onResize({ color: `rgba(${value.toRgb().r}, ${value.toRgb().g}, ${value.toRgb().b}, ${value.toRgb().a})`})}
                    onOpenChange={() => setIsOpenColorPicker(prevState => !prevState)}
                    value={color}
                    showText={() => (
                        <DownOutlined
                            rotate={isOpenColorPicker ? 180 : 0}
                            style={{
                                color: 'rgba(0, 0, 0, 0.25)',
                            }}
                        />
                    )}
                />
            </div>
        </Html>
    )
}

export default ContextMenu
