'use client'
import React from 'react';
//@ts-ignore
import {useNavigate} from "react-router";
import {Button, Tabs} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import ProjectOverview from "../../../components/project/tabs/ProjectOverview";
import ProjectDistribution from "../../../components/project/tabs/ProjectDistribution";

const tabs = [
    {
        label: `Overview`,
        key: '1',
        children: <ProjectOverview />,
    },
    {
        label: `Distribution`,
        key: '2',
        children: <ProjectDistribution />,
    },
]

const Project = () => {

    const navigate = useNavigate()

    return (
        <div className={'p-16'}>
            <Button
                type={'text'}
                onClick={() => navigate(-1)}
                className={'flex gap-3.5 items-center text-16'}
            >
                <ArrowLeftOutlined />
                <p>Back</p>
            </Button>
            <div className={'mt-20 flex justify-center project'}>
                <Tabs
                    tabPosition={'left'}
                    items={tabs}
                    indicatorSize={0}
                    tabBarStyle={{border: 'none'}}
                />
            </div>
        </div>
    )
}

export default Project
