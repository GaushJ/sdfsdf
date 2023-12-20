import React, {FC, useEffect, useState} from 'react';

type RulerProps = {
    isVertical?: boolean;
    scale: number;
    maxWidth?: number;
    maxHeight?: number;
    offsetX?: number;
    offsetY?: number;
};

//First line is the biggest, 5th is medium and other the smallest (4 - 2 - 1)
const getHeightLine = (item: number, offsetLength?: number) => {
    if (offsetLength) {
        return (offsetLength === 10 && item === 0) ? 16 : item === offsetLength - 5 ? 8 : 4
    }
    return item === 0 ? 16 : item === 5 ? 8 : 4
}

const Ruler: FC<RulerProps> = ({isVertical, scale, offsetY, offsetX, maxHeight, maxWidth}) => {
    const verticalClasses = isVertical
        ? 'w-5 text-vertical h-fit-content'
        : 'h-5 w-fit-content';

    //Calculate gap multiplier and multiplier for count of numbers on ruler
    const multiplierValue = scale > 3 ? 10 / Math.ceil(scale / 10) : 90 / scale
    const roundedMultiplier = multiplierValue % 5 === 0 ? multiplierValue : Math.floor(multiplierValue)

    //set half of multiplier to gap when scale eq 1 for avoid value * 0
    const dynamicGap = Math.max(roundedMultiplier / 2, roundedMultiplier * (scale - 1))

    const offset = maxWidth ? offsetX! / (roundedMultiplier * 10) : offsetY! / (roundedMultiplier * 10)
    const offsetLines = maxWidth ? offsetX! % (roundedMultiplier * 10) : offsetY! % (roundedMultiplier * 10);

    const renderNumbers = () => {
        const numbers = [];
        const lines = [];

        //if scale eq 1, then set half of max multiplier value for numbers for all ruler
        const count = isVertical ? maxHeight! / 20 : maxWidth! / Math.min(roundedMultiplier, 40);

        const rulerLinesArr = Array.from({length: 10}, (_, idx) => idx);
        const rulerLinesOffsetArr = Array.from({length: offsetLines / (dynamicGap / 11)}, (_, idx) => idx);

        lines.push(<div
            className={`flex ${isVertical ? 'items-end' : ''}`}
            style={{gap: dynamicGap / 11, marginRight: !isVertical ? dynamicGap / 11 : 0, marginBottom: isVertical ? dynamicGap / 11 : 0}}
        >
            {(offsetLines !== 0) && rulerLinesOffsetArr.map(item => {
                const lineSize = getHeightLine(item, rulerLinesOffsetArr.length)
                return <div key={item}
                            className={`background-grey ${isVertical ? `h-px w-${lineSize}px` : `w-px h-${lineSize}px`}`}
                ></div>
            })}
        </div>)

        for (let i = offset; i <= count; i++) {
            const value = Math.round(i * roundedMultiplier * 10) - Math.round(offsetLines);

            numbers.push(
                <p
                    key={i}
                    style={{color: '#B6B6BB', width: 0, height: 0, textAlign: 'center', zIndex: 10, marginLeft: maxWidth && i === offset ? rulerLinesOffsetArr.length * (dynamicGap / 10) : 0 ,marginTop: maxHeight && i === offset ? rulerLinesOffsetArr.length * (dynamicGap / 10) : 0,}}
                >
                    <span>{value}</span>
                </p>
            );

            lines.push(<div
                    className={`flex ${isVertical ? 'items-end' : ''}`}
                    style={{gap: dynamicGap / 11, marginRight: !isVertical ? dynamicGap / 11 : 0, marginBottom: isVertical ? dynamicGap / 11 : 0}}
                >
                    {rulerLinesArr.map(item => {
                        return <div key={item}
                                    className={`background-grey ${isVertical ? `h-px w-${getHeightLine(item)}px` : `w-px h-${getHeightLine(item)}px`}`}
                        ></div>
                    })}
                </div>
            );
        }

        return {numbers, lines};
    };

    return (
        <div
            style={{
                overflow: 'hidden',
                gap: dynamicGap,
                maxHeight: maxHeight ? maxHeight : 'auto',
                maxWidth: maxWidth ? maxWidth : 'auto',
                top: isVertical ? maxHeight! - 10: 0,
                padding: isVertical ? '0' : '0 0 0 12px'
            }}
            className={`flex sticky z-10 top-0 left-0 text-12 color-text-grey background-white ${verticalClasses}`}
        >
            {renderNumbers().numbers}
            <p className={`flex absolute ${isVertical ? 'left-0' : 'top-0'}`}>
                {renderNumbers().lines}
            </p>
        </div>
    );
};

export default Ruler;
