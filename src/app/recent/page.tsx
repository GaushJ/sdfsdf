"use client";
import {FC, ReactNode, useEffect, useState} from "react";
import {Button, Dropdown} from "antd";
import {RightOutlined} from "@ant-design/icons";

import CreatingCustom from "../../components/lablesAndReports/CreatingCustom";
import ProjectCard from "../../components/cards/ProjectCard";
import TemplateCard from "../../components/cards/TemplateCard";

import Project1TypePNG from '../../assets/images/png/projectCard1.png';
import Project2TypePNG from '../../assets/images/png/projectCard2.png';
import DefaultLayout from "../page";

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

const recentTemplates = [
    {
        title: 'Hazard',
        size: 'Size 1px x 1px',
        date: '12 Oct, 2023',
        status: 'draft',
        img: Project1TypePNG,
    },
    {
        title: 'Safety Data Sheet',
        size: 'Size 1px x 1px',
        date: '12 Oct, 2023',
        status: 'submited',
        img: Project2TypePNG,
    },
    {
        title: 'Compliance',
        size: 'Size 1px x 1px',
        date: '12 Oct, 2023',
        status: 'approved',
        img: Project1TypePNG,
    },
    {
        title: 'Batch Number',
        size: 'Size 1px x 1px',
        date: '12 Oct, 2023',
        status: 'blocked',
        img: Project2TypePNG,
    },
]

const recent30DaysTemplates = [
    {
        title: 'Card title',
        category: 'Sales order acknowledgement',
        size: 'Size 1px x 1px',
        img: Project2TypePNG,
    },
    {
        title: 'Card title',
        category: 'Sales order acknowledgement',
        size: 'Size 1px x 1px',
        img: Project1TypePNG,
    },
    {
        title: 'Card title',
        category: 'Sales order acknowledgement',
        size: 'Size 1px x 1px',
        img: Project2TypePNG,
    },
    {
        title: 'Card title',
        category: 'Sales order acknowledgement',
        size: 'Size 1px x 1px',
        img: Project1TypePNG,
    },
]

type iCreatingCustomSize= {label: ReactNode, key: string}

type iCustomSizes= {width: number, height: number, unit: string}

const Recent:FC = () => {

    const [creatingList, setCreatingList] = useState<Array<any>>([])
    const [creatingCustomSize, setCreatingCustomSize] = useState<Array<iCreatingCustomSize>>([])
    const [openDropdown, setOpenDropdown] = useState<boolean>(false)
    const [showCreatingCustom, setShowCreatingCustom] = useState<boolean>(false)
    const [customSizes, setCustomSizes] = useState<iCustomSizes>({width: 0, height: 0, unit: 'pixels'})

    useEffect(() => {
        //Render first creating dropdown
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
                </Button>}])

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
                  <h1 className={'page-title'}>Recent</h1>
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
              <div className={'flex flex-col gap-11 pb-4'}>
                  <div className={'flex flex-col gap-6'}>
                      <h3 className={'list-title'}>Edited this week</h3>
                      <div className={'flex flex-wrap gap-9'}>
                          {recentTemplates.map(({title, date, size, status, img}) => {
                              return <div key={title}>
                                  <ProjectCard title={title} size={size} date={date} status={status} img={img.src}/>
                              </div>
                          })}
                      </div>
                  </div>
                  <div className={'flex flex-col gap-6'}>
                      <h3 className={'list-title'}>Edited in last 30 days</h3>
                      <div className={'flex flex-wrap gap-9'}>
                          {recent30DaysTemplates.map(({title, category, size, img}) => {
                              return <div key={title}>
                                  <TemplateCard title={title} size={size} category={category} img={img.src}/>
                              </div>
                          })}
                      </div>
                  </div>
              </div>
          </div>
      </DefaultLayout>
    )
}

export default Recent;
