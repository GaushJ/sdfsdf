'use client'
import React, {ReactNode, useEffect, useState} from "react";
import { Button, Dropdown, Table} from "antd";
import {DownOutlined, RightOutlined} from "@ant-design/icons";
import CreatingCustom from "../../components/lablesAndReports/CreatingCustom";
import Filter from "../../components/ui-kit/Filter/Filter";
import {useNavigate} from "react-router";
import {iColumnTable, searchTableData} from "../../mock-data";
import {ColumnsType} from "antd/es/table";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";

type iCustomTemplate = {
    label: ReactNode,
    key: string
}

const creatingSizeList = [
    {
        label: 'Template 1 (1px x 1px)',
        key: '1'
    },
    {
        label: 'Template 2 (2px x 2px)',
        key: '2'
    },
    {
        label: 'Template 3 (112px x 123px)',
        key: '5'
    },
    {
        label: 'Template 4 (132px x 122px)',
        key: '4'
    },
]



const columns: ColumnsType<iColumnTable> = [
    {
        title: 'Title',
        dataIndex: 'title',
        sorter: (a: iColumnTable, b: iColumnTable) => b.title.localeCompare(a.title),
    },
    {
        title: 'File type',
        dataIndex: 'fileType',
        sorter: (a: iColumnTable, b: iColumnTable) => b.fileType.localeCompare(a.fileType),
    },
    {
        title: 'Document type',
        dataIndex: 'docType',
        sorter: (a: iColumnTable, b: iColumnTable) => b.docType.localeCompare(a.docType),
    },
    {
        title: 'Owner',
        dataIndex: 'owner',
        sorter: (a: iColumnTable, b: iColumnTable) => b.owner.localeCompare(a.owner),
    },
    {
        title: 'Last modified',
        dataIndex: 'lastModified',
        defaultSortOrder: 'ascend',
        sorter: (a: iColumnTable, b: iColumnTable) => b.lastModified.localeCompare(a.lastModified),
    },
    {
        title: 'Created',
        dataIndex: 'created',
        sorter: (a: iColumnTable, b: iColumnTable) => b.created.localeCompare(a.created),
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];

const allDropdownList = [
    {
        label: 'First',
        key: '1'
    },
    {
        label: 'Second',
        key: '2'
    },
    {
        label: 'Other',
        key: '5'
    },
]

const AdvancedSearch = () => {

    const navigate = useNavigate()

    const [creatingList, setCreatingList] = useState<ItemType<MenuItemType>[] | undefined>(undefined)
    const [creatingCustomSize, setCreatingCustomSize] = useState<iCustomTemplate[]>([])
    const [openDropdown, setOpenDropdown] = useState(false)

    const [showCreatingCustom, setShowCreatingCustom] = useState(false)
    const [searchWord, setSearchWord] = useState('')

    const [customSizes, setCustomSizes] = useState({width: 0, height: 0, unit: 'pixels'})

    const [dataSource, setDataSource] = useState(searchTableData)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        setCreatingList([...creatingSizeList.map(item => ({
            ...item,
            label: <div className={'p-3'} onClick={hideDropdown}>{item.label}</div>,
        })),
            {type: 'divider',},
            {label: <Button
                    onClick={() => setShowCreatingCustom(true)}
                    type={'text'}
                    className={'flex justify-between items-center w-full p-3 h-full'}>
                    <span className={'color-primary'}>Custom size</span>
                    <RightOutlined className={'color-primary'}/>
                </Button>}]as ItemType<MenuItemType>[])

        //Render second dropdown
        setCreatingCustomSize([{
            label: <div>
                <CreatingCustom recommendedItems={creatingSizeList} sizes={customSizes} setCustomSizes={setCustomSizes} onChooseRecommend={hideDropdown}/>
            </div>,
            key: 'custom'
        }])
    }, []);

    useEffect(() => {
        setDataSource(searchTableData)
    }, [])

    useEffect(() => {
        if (!searchWord) setDataSource(searchTableData)
    }, [searchWord])

    const hideDropdown = () => {
        setOpenDropdown(false)
        setShowCreatingCustom(false)
    }

    const onSearch = (e: { target: { value: string; }; }) => {
        const term = e.target.value
        setSearchWord(term)
        setDataSource(() => {
            return searchTableData.filter((item: { title: string; }) => item.title.toLowerCase().includes(term.toLowerCase()))
        })
    }

    return (
        <div style={{ padding: '8px 64px 8px 56px', maxHeight: '90vh'}}>
            <div className={'flex justify-between mb-10'}>
                <h1 className={'page-title'}>Advanced search</h1>
                <Dropdown
                    trigger={['click']}
                    placement={'bottomRight'}
                    menu={{items: showCreatingCustom ? creatingCustomSize : creatingList}}
                    open={openDropdown}
                    onOpenChange={(e) => {
                        setOpenDropdown(e)
                        setShowCreatingCustom(false)
                    }}
                >
                    <Button
                        type={openDropdown ? 'primary' : "default"}
                        style={{padding: '12px 32px', height: 44, width: 109, borderRadius: '12px', borderColor: '#3649FF'}}
                        className={openDropdown
                            ? 'color-white background-primary items-center flex'
                            : 'color-primary items-center flex'}
                    >
                        Create
                    </Button>
                </Dropdown>
            </div>
            <div className={'flex flex-col gap-9 pb-4'}>
                <Filter value={searchWord} filterList={[]} onChange={onSearch}/>
                <div className={'flex gap-3.5'}>
                    <Dropdown menu={{ items: allDropdownList }} trigger={['click']}>
                        <Button className={'flex items-center rounded-2xl bg-btn-grey py-0.5 px-4 text-12'}>All <DownOutlined /></Button>
                    </Dropdown>
                    <Dropdown menu={{ items: allDropdownList }} trigger={['click']}>
                        <Button className={'flex items-center rounded-2xl bg-btn-grey py-0.5 px-4 text-12'}>Labels <DownOutlined /></Button>
                    </Dropdown>
                    <Dropdown menu={{ items: allDropdownList }} trigger={['click']}>
                        <Button className={'flex items-center rounded-2xl bg-btn-grey py-0.5 px-4 text-12'}>Documents <DownOutlined /></Button>
                    </Dropdown>
                    <Button className={'flex items-center rounded-2xl py-0.5 px-4 text-12'} type={'dashed'}><span className={'mr-2'}>+</span>Custom</Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        pageSize: 9,
                        current: currentPage,
                        onChange: (e) => setCurrentPage(e),
                    }}
                    onRow={(record) => {
                        return {
                            onClick: () => navigate(`/project/${record.key}`)
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default AdvancedSearch
