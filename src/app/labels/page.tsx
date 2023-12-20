"use client";

import {Button, Dropdown, Tabs} from "antd";
import Dashboard from "@/components/lablesAndReports/tabs/Dashboard/Dashboard";
import Templates from "@/components/lablesAndReports/tabs/Templates/Templates";
import Favourites from "@/components/lablesAndReports/tabs/Favourites/Favourites";
import History from "@/components/lablesAndReports/tabs/History/History";
import Trash from "@/components/lablesAndReports/tabs/Trash/Trash";
import MyProjects from "@/components/lablesAndReports/tabs/MyProjects/MyProjects";
import React, {ReactNode, useEffect, useState} from "react";
import {RightOutlined} from "@ant-design/icons";
import CreatingCustom from "@/components/lablesAndReports/components/CreatingCustom";
import { useDraftContext } from "../../context/draftContext";
import Link  from "next/link";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import DefaultLayout from "../page";

type iCustomTemplate = {
    label: ReactNode,
    key: string
}

const onChange = (key: string | number) => {
    console.log(key);
};

const items = [
    {
        key: '1',
        label: 'Dashboard',
        children: <Dashboard />,
    },
    {
        key: '2',
        label: 'Templates',
        children: <Templates />,
    },
    {
        key: '3',
        label: 'Favourites',
        children: <Favourites />,
    },
    {
        key: '4',
        label: 'My projects',
        children: <MyProjects />,
    },
    {
        key: '5',
        label: 'History',
        children: <History />,
    },
    {
        key: '6',
        label: 'Workflow',
        children: 'Workflow',
    },
    {
        key: '7',
        label: 'Trash',
        children: <Trash />,
    },
];

const creatingSizeList = [
    {
        label: 'Template 1 (1px x 1px)',
        value: {x: 1, y: 1},
        key: '1'
    },
    {
        label: 'Template 2 (2px x 2px)',
        value: {x: 2, y: 2},
        key: '2'
    },
    {
        label: 'Template 3 (112px x 123px)',
        value: {x: 112, y: 123},
        key: '5'
    },
    {
        label: 'Template 4 (132px x 122px)',
        value: {x: 132, y: 122},
        key: '4'
    },
]

const LablesAndReports = () => {

    const [creatingList, setCreatingList] = useState<ItemType<MenuItemType>[] | undefined>(undefined)
    const [creatingCustomSize, setCreatingCustomSize] = useState<iCustomTemplate[]>([])
    const [openDropdown, setOpenDropdown] = useState(false)
    const [showCreatingCustom, setShowCreatingCustom] = useState(false)
    const [customSizes, setCustomSizes] = useState({width: 0, height: 0, unit: 'pixels'})
    const {setDraftSize} = useDraftContext()

    useEffect(() => {
        //Render first creating dropdown
        setCreatingList([...creatingSizeList.map(item => ({
            ...item,
            label:  <div className={'p-3'} onClick={() => {
                setDraftSize(item.value)
                hideDropdown
            }}><Link href={`/template`}>{item.label}</Link></div>,
        })),
            {type: 'divider',},
            {label: <Button
                    onClick={() => setShowCreatingCustom(true)}
                    type={'text'}
                    className={'flex justify-between items-center w-full p-3 h-full'}>
                    <span className={'color-primary'}>Custom size</span>
                    <RightOutlined className={'color-primary'}/>
            </Button>}] as ItemType<MenuItemType>[])

        //Render second dropdown
        setCreatingCustomSize([{
            label: <div>
                <CreatingCustom recommendedItems={creatingSizeList} sizes={customSizes} setCustomSizes={setCustomSizes} onChooseRecommend={hideDropdown}/>
            </div>,
            key: 'custom'
        }])
    }, []);

    const hideDropdown = () => {
        setOpenDropdown(false)
        setShowCreatingCustom(false)
    }

    return (
      <DefaultLayout>
          <div style={{ padding: '8px 64px 8px 56px', maxHeight: '90vh'}}>
              <div className={'flex justify-between mb-10'}>
                  <h1 className={'page-title'}>Designer</h1>
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
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </div>
      </DefaultLayout>
    )
}

export default LablesAndReports
