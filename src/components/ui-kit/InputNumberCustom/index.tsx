import React, {FC, FocusEventHandler} from 'react';
import {Button, Input, Space} from "antd";
import PlusSVG from "../../../assets/images/svg/plus.svg";
import MinusSVG from "../../../assets/images/svg/minus.svg";

type iProps = {value: number | string, setValue: (value: number | string) => void}

const InputNumberCustom: FC<iProps> = ({value, setValue}) => {
    const onBlur: FocusEventHandler<HTMLInputElement> = (e) => {
      const number = Number(e.target.value) as number | string

        if (Number(number) <= 72 && Number(number) >= 6) {
            setValue(number)
        } else if (Number(number) > 72) {
            setValue(72)
        } else if (Number(number) < 6) {
            setValue(6)
        }
    }

    return (
        <Space.Compact className={'p-0.5 rounded-xl background-white relative border-default items-center'} style={{height:36}}>
            <Button
                type={'text'}
                className={'background-white p-0 px-1'}
                onClick={() => setValue(Number(value) <= 6 ? 6 : Number(value) - 1)}
            >
                <MinusSVG fill={'#141527'} />
            </Button>
            <Input
                type={'number'}
                min={0}
                max={72}
                rootClassName={'z-10 border-y-0'}
                value={value}
                onBlur={onBlur}
                onChange={(e) => setValue(e.target.value)}
            />
            <Button
                type={'text'}
                onClick={() => setValue(Number(value) >= 72 ? 72 : Number(value) + 1)}
                className={'background-white p-0 px-1'}
            >
                <PlusSVG fill={'#141527'} />
            </Button>
        </Space.Compact>
    )
}

export default InputNumberCustom
