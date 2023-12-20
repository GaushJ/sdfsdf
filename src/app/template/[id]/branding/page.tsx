import Filter from "../../../../components/ui-kit/Filter/Filter";
import SelectedFilters from "../../../../components/ui-kit/SelectedFilters/SelectedFilters";
import React, {FC, useState} from "react";
import {Checkbox} from "antd";

// Commented as it is unused
// const trashItems = [
//     {
//         title: 'Olivia Bennett deleted project “S” 15 minutes ago.  ',
//     },
//     {
//         title: 'Liam Anderson deleted project “B”.  ',
//     },
//     {
//         title: 'Ethan Rodriguez deleted project “M” 1 day ago.  ',
//     },
//     {
//         title: 'Ava Thompson deleted project “B” 2 days ago.  ',
//     },
//     {
//         title: 'Sophia Mitchell deleted project “K”  1 week ago.  ',
//     },
//     {
//         title: 'Noah Martinez deleted project “A” 2 weeks ago.  ',
//     },
// ]

const checkboxOptions = [
    { label: 'Category 1', value: 'Category 1' },
    { label: 'Category 2', value: 'Category 2' },
    { label: 'Category 3', value: 'Category 3' },
    { label: 'Category 4', value: 'Category 4' },
    { label: 'Category 5', value: 'Category 5' },
]

const Branding:FC = () => {

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
        <div className={'pt-8'}>
            <Filter value={searchText} onChange={onChangeSearchText} filterList={filterList} hasSelectedFilters={!!selectedFilters.length}/>
            <div className={'pt-4'}>
                <SelectedFilters onCloseFilter={onCloseFilter} selectedFilters={selectedFilters} />
            </div>
        </div>
    )
}

export default Branding
