import React, {FC} from 'react';
import {Badge} from "antd";
import mockPNG from '../../../assets/images/png/projectCard1.png'

const mockData = [
    {
        label: 'Owner:',
        value: 'Michael Davis'
    },
    {
        label: 'File type:',
        value: 'DOC'
    },
    {
        label: 'Size:',
        value: '2 x 4 inch'
    },
    {
        label: 'Status:',
        value: <Badge color={'green'} text={'Approved'}/>
    },
    {
        label: 'Last modified:',
        value: '19 Oct, 2023'
    },
    {
        label: 'Created:',
        value: '02 Sep, 2023'
    },
    {
        label: 'Form name:',
        value: 'OMLegalEntity'
    },
    {
        label: 'Control name:',
        value: 'LogoImage'
    },
    {
        label: 'Shared with:',
        value: 'Need to upd'
    },
    {
        label: 'Description:',
        value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisl vel libero aliquam facilisis. Nullam luctus, odio a laoreet ultrices, sem nisi dapibus nisl, eu bibendum urna sapien ac quam. Vivamus vel dui non elit lacinia tristique ac nec sapien. Phasellus nec congue metus. Maecenas interdum euismod massa, vel feugiat justo. Fusce viverra libero a lorem tincidunt, nec tempus eros varius.'
    },
]

const ProjectOverview:FC = () => {

    return (
        <div className={'flex gap-16'}>
            <div className={'flex flex-col gap-7'}>
                <div className={'flex items-center gap-4'}>
                    <h1 className={'text-28'}>Transportation Label</h1>
                </div>
                {mockData.map(({label, value}) => {
                    return <div className={'flex gap-9 text-16 max-w-screen-sm'} key={label}>
                        <p className={'color-text-grey min-w-104'}>{label}</p>
                        <p className={'max-w-512'}>{value}</p>
                    </div>
                })}
            </div>
            <div className={'flex items-center justify-center background-light-grey rounded-2xl p-7 max-h-270 border'}>
                <img src={mockPNG as any} alt="example" width={218} height={218}/>
            </div>
        </div>
    )
}

export default ProjectOverview
