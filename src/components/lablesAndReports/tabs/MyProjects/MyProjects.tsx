import React, {FC} from 'react';
import {Checkbox} from "antd";
import Filter from "../../../../components/ui-kit/Filter/Filter";
import ProjectCard from "../../../../components/cards/ProjectCard";
import {useState} from "react";
import SelectedFilters from "../../../../components/ui-kit/SelectedFilters/SelectedFilters";

const templates = [
    {
        title: 'Card title',
        size: 'Size 1px x 1px',
        date: '12 Oct, 2023',
        status: 'approved'
    },
    {
        title: 'Card title',
        size: 'Size 1px x 1px',
        date: '12 Oct, 2023',
        status: 'submited',
    },
    {
        title: 'Card title',
        size: 'Size 1px x 1px',
        date: '12 Oct, 2023',
        status: 'approved'
    },
    {
        title: 'Card title',
        size: 'Size 1px x 1px',
        date: '12 Oct, 2023',
        status: 'blocked'
    },
]

const checkboxOptions = [
    { label: 'Category 1', value: 'Category 1' },
    { label: 'Category 2', value: 'Category 2' },
    { label: 'Category 3', value: 'Category 3' },
    { label: 'Category 4', value: 'Category 4' },
    { label: 'Category 5', value: 'Category 5' },
]
const MyProjects:FC = () => {
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
            <div className={'flex flex-col gap-11'}>
                <div className={'flex flex-col gap-6'}>
                    <h3 className={'list-title'}>My projects</h3>
                    <div className={'flex flex-wrap gap-9'}>
                        {templates.map(({title, date, size, status}) => {
                            return <div key={title}>
                                <ProjectCard title={title} size={size} date={date} status={status} />
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProjects
