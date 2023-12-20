"use client";
import Filter from "../../../../components/ui-kit/Filter/Filter";
import SelectedFilters from "../../../../components/ui-kit/SelectedFilters/SelectedFilters";
import React, {useState} from "react";
import {Button, Checkbox, Input} from "antd";

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

const Templates = () => {

    const [searchText, setSearchText] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([]);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

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

    const getResponse = async () => {
        const postNamespaceData = {
            values: [
                {
                    "name": "name",
                    "value": name
                },
                {
                    "name": "surname",
                    "value": surname
                },
            ],
        }

        //data for namespace
        const namespaceId = '364496671305891842'
        const moduleId = '364496706236055554'
        const apiPath = `http://localhost:18080/api/compose/namespace/${namespaceId}/module/${moduleId}/record/`

        //api for system apis
        // const apiPath = 'http://localhost:18080/api/system/auth/impersonate'

        //body for test api gateway
        // const bodyData = [{name: 'sad', surname: 'asd'}, {name: 'sad', surname: 'asdasda'}]

        const response = await fetch(apiPath, {
            method: 'POST',
            headers: {
                'Authorization': "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJRCI6IjM2Mzc1OTgyNDQxODExMTQ5MSIsImV4cCI6MTcwMDU3NTY3NSwiaWF0IjoxNzAwNTY4NDc1LCJpc3MiOiJjb3J0ZXphcHJvamVjdC5vcmciLCJqdGkiOiJPREZNTjJJM01KRVRPREVXWVMwWlpUUkxMVExKTlRHVFpHUTRZMklaT0dFM05ESEgiLCJyb2xlcyI6WyIzNjM3NTk4MTgyMjczMTg3ODciXSwic2NvcGUiOiJwcm9maWxlIGFwaSIsInN1YiI6IjM2Mzc2MDczMTgzMDYxNjA2NyJ9.Kr4VpI6ob_AQJ6tiioPObDJclnXNSS7jVJ_L542gJsyqbXHdoTsKGIjdNqMqKvLT6xINKAtxd-Y9smdcl5-qgw",
                "Content-Type": "application/json",
                "Accept": ".../json",
            },
            body: JSON.stringify(postNamespaceData)
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <div className={'pt-8'}>
            <Filter value={searchText} onChange={onChangeSearchText} filterList={filterList} hasSelectedFilters={!!selectedFilters.length}/>

            <div className={'border m-4 p-4'}>
                <h2>Create new record form</h2>
                <br/>
                <Input
                    placeholder={'Name'}
                    onChange={e => setName(e.target.value)}
                />
                <Input
                    placeholder={'Surname'}
                    onChange={e => setSurname(e.target.value)}
                />
                <Button onClick={getResponse}>Create record</Button>
            </div>
            <div className={'pt-4'}>
                <SelectedFilters onCloseFilter={onCloseFilter} selectedFilters={selectedFilters} />
            </div>
        </div>
    )
}

export default Templates
