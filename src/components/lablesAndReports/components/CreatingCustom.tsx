import React, {Dispatch, FC, SetStateAction} from 'react';
import {Button, Form, InputNumber, Select} from "antd";
import {Option} from "antd/es/mentions";

type iSize = {width: number, height: number, unit: string}

type iProps = {
    setCustomSizes: Dispatch<SetStateAction<{width: number, height: number, unit: string}>>,
    sizes: iSize,
    recommendedItems: {label: string, key: string}[],
    onChooseRecommend: () => void,
}

const CreatingCustom:FC<iProps> = ({ setCustomSizes, sizes, recommendedItems, onChooseRecommend }) => {

    return (
        <div className={'flex flex-col gap-7 p-6'}>
            <div className={'flex flex-col gap-3.5'}>
                <h2 className={'text-title'}>Create custom size</h2>
                <Form className={'flex gap-2.5'}
                      name="size-form"
                >
                    <Form.Item
                        name="width"
                        noStyle
                        rules={[{ required: true }]}
                    >
                        <InputNumber
                            className={'p-1 w-28'}
                            placeholder="Enter width"
                            value={sizes.width}
                            min={1}
                            onChange={(e) => setCustomSizes((prevState) => ({...prevState, width: e as number}))}
                        />
                    </Form.Item>
                    <Form.Item
                        name="heigth"
                        noStyle
                        rules={[{ required: true }]}
                    >
                        <InputNumber
                            className={'p-1 w-28'}
                            placeholder="Enter heigth"
                            value={sizes.height}
                            min={1}
                            onChange={(e) => setCustomSizes((prevState) => ({...prevState, height: e as number}))}
                        />
                    </Form.Item>
                    <Form.Item
                        name="unit"
                        noStyle
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder="Select unit"
                            className={'h-auto w-24'}
                            style={{borderRadius: '2px'}}
                            defaultValue={'pixels'}
                            value={sizes.unit}
                            onChange={(e) => setCustomSizes((prevState) => ({...prevState, unit: e}))}
                        >
                            <Option value="pixels">Pixels</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </div>
            <Button
                type={'default'}
                className={'color-primary'}
                style={{borderColor: '#3649FF', borderRadius: '12px'}}
                size={'large'}
                onClick={onChooseRecommend}
            >
                Copy link
            </Button>
            <div className={'flex flex-col gap-3.5'}>
                <h1 className={'text-16 font-semibold'}>Recommended</h1>
                <div>
                    {!!recommendedItems?.length && recommendedItems.map(({ label }) => {
                        return <p className={'py-3.5'} key={label} onClick={onChooseRecommend}>
                            {label}
                        </p>
                    })}
                </div>
            </div>
        </div>
    )
}

export default CreatingCustom
