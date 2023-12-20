import {Button, Dropdown, Input} from "antd";
import  FilterSVG from "../../../assets/images/svg/filter.svg";
import React, {FC, ReactNode, useState} from "react";
import SearchSVG from "../../../assets/images/svg/search.svg";
import CloseSVG from "../../../assets/images/svg/close.svg";

type iPropsFilterButton = {
    hasSelectedFilters?: boolean,
    items: {label: ReactNode | string, key: string}[]
}

type iPropsFilter = {
    value: string,
    onChange: (e: any) => void,
    filterList: {label: ReactNode | string, key: string}[],
    hasSelectedFilters?: boolean
}

const FilterButton:FC<iPropsFilterButton> = ({items, hasSelectedFilters}) => {

    const [open, setOpen] = useState(false)

    return (
        <Dropdown
            menu={{ items }}
            trigger={['click']}
            onOpenChange={(e) => setOpen(e)}
            open={open}
            placement={'bottomRight'}
        >
            <Button type={'text'} className={'flex gap-2 items-center background-white'}>
                <FilterSVG fill={!hasSelectedFilters ? '#141527' : '#F37748'}/>
                <span style={{color: !hasSelectedFilters ? '#141527' : '#F37748'}}>Filter</span>
            </Button>
        </Dropdown>
    )
}

const Filter:FC<iPropsFilter> = ({ value, onChange, filterList, hasSelectedFilters }) => {

    return (
        <Input
            size="large"
            placeholder="Search"
            addonAfter={<FilterButton items={filterList} hasSelectedFilters={hasSelectedFilters} />}
            value={value}
            onChange={onChange}
            prefix={<SearchSVG width={16} height={16} fill={'#C0C0C5'}/>}
            allowClear={{clearIcon: <CloseSVG fill={'#141527'}/>}}
        />
    )
}
export default Filter
