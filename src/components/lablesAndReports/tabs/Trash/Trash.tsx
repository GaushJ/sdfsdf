import React from 'react';
import {Button, Checkbox} from "antd";
// import { ReactComponent as RefreshSVG } from "../../../../assets/images/svg/refresh.svg";
import RefreshSVG from "../../../../assets/images/svg/refresh.svg";
import Filter from "../../../../components/ui-kit/Filter/Filter";
import {useState} from "react";
import SelectedFilters from "../../../../components/ui-kit/SelectedFilters/SelectedFilters";

const trashItems = [
    {
        title: 'Olivia Bennett deleted project “S” 15 minutes ago.  ',
    },
    {
        title: 'Liam Anderson deleted project “B”.  ',
    },
    {
        title: 'Ethan Rodriguez deleted project “M” 1 day ago.  ',
    },
    {
        title: 'Ava Thompson deleted project “B” 2 days ago.  ',
    },
    {
        title: 'Sophia Mitchell deleted project “K”  1 week ago.  ',
    },
    {
        title: 'Noah Martinez deleted project “A” 2 weeks ago.  ',
    },
]

const checkboxOptions = [
    { label: 'Category 1', value: 'Category 1' },
    { label: 'Category 2', value: 'Category 2' },
    { label: 'Category 3', value: 'Category 3' },
    { label: 'Category 4', value: 'Category 4' },
    { label: 'Category 5', value: 'Category 5' },
]
const Trash = () => {

    const [searchText, setSearchText] = useState<string>('');
    const [selectedFilters, setSelectedFilters] = useState<any[]>([]);

    const onChangeSearchText = (e: any) => {
        setSearchText(e.target.value)
    }

    const onChangeSelectedFilters = (e: any) => {

        setSelectedFilters(e)
    }

    const onCloseFilter = (tag: string) => {
        setSelectedFilters(prevState => prevState.filter(item => item !== tag))
    }

    const filterList = [
        {
            label: <Checkbox.Group className={'flex flex-col'} value={selectedFilters} options={checkboxOptions} onChange={onChangeSelectedFilters}/>,
            key: '0',
        }
    ];
    return (
        <div>
            <div className={'flex justify-center'} style={{width: 440, margin: '40px auto 24px'}}>
                <Filter value={searchText} onChange={onChangeSearchText} filterList={filterList} hasSelectedFilters={!!selectedFilters.length}/>
            </div>
            <SelectedFilters onCloseFilter={onCloseFilter} selectedFilters={selectedFilters} />
            <div className={'flex flex-col gap-4 w-full'}>
                {trashItems.map(({ title }) => {
                    return <div className={'flex justify-between p-7 background-light-grey items-center'} style={{borderRadius: '12px'}} key={title}>
                        <p className={'text-16'}>{title}</p>
                        <Button type={'text'} className={'p-0 h-full'}>
                            <RefreshSVG />
                        </Button>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Trash
