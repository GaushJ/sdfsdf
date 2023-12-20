import {Button, Divider, Layout, Select} from "antd";
import BellSVG from "../../../assets/images/svg/bell.svg";
import SearchSVG from "../../../assets/images/svg/search.svg";
import RollbackSVG from "../../../assets/images/svg/rollback.svg";
import RollforwardSVG from "../../../assets/images/svg/rollforward.svg";
import CloudDonloadSVG from "../../../assets/images/svg/cloud_download.svg";
import Toggle from "../../ui-kit/Toggle";
import React, {FC, useState} from "react";
import { useRouter } from "next/navigation";


type iProps = {
    isTemplateHeader?: boolean,
    currentPage: string
}

const Header: FC<iProps> = ({isTemplateHeader, currentPage}) => {
    
    const router = useRouter()

    const [themeColor, setThemeColor] = useState('day')
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const handleRedirect = (path: string) => {
      router.push(path)
    }

    return (
        <Layout.Header
            className={'flex items-center justify-between background-white'}
            style={{ padding: '32px 64px 32px 56px', position: 'sticky', top: 0, zIndex: 5, height: 96}}
        >
            {isTemplateHeader &&
                <div className={'flex gap-4 items-center'}>
                    <Button type={'text'} className={'p-0 px-1 text-18'}>
                        Home
                    </Button>
                    <Button type={'text'} className={'p-0 px-1 text-18'}>
                        File
                    </Button>
                    <Divider type="vertical" className={'h-7'}/>
                    <Button type={'text'} className={'p-0'}>
                        <RollbackSVG className={'header-svg'}/>
                    </Button>
                    <Button type={'text'} className={'p-0'}>
                        <RollforwardSVG className={'header-svg'}/>
                    </Button>
                    <Divider type="vertical" className={'h-7'}/>
                    <Button type={'text'} className={'p-0 px-1'}>
                        <CloudDonloadSVG className={'header-svg'}/>
                    </Button>
                </div>
            }
            <div className={'flex justify-end gap-9 items-center  w-full'}>
                <div className={'flex gap-4 items-center'}>
                    <Button type={'text'} className={'p-0'} onClick={() => handleRedirect('advanced-search')}>
                        <SearchSVG fill={currentPage === 'advanced-search' ? '#F37748' : '#141527'} />
                    </Button>
                    <Button type={'text'} className={'p-0'}>
                        <BellSVG />
                    </Button>
                </div>
                <Select
                    defaultValue="Company 1"
                    className={'grey-select'}
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'Company 1', label: 'Company 1' },
                        { value: 'Company 2', label: 'Company 2' },
                    ]}
                />
                <div onClick={() => setThemeColor(prevState => prevState === 'day' ? 'night' : 'day')}>
                    <Toggle isActive={themeColor === 'day'} showIcons={true} />
                </div>
                <div className={'flex items-center'} style={{height: 32}}>
                    <img
                        className={'rounded-full h-full'}
                        src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg"
                        alt="avatar"
                        width={32}
                        height={32}
                    />
                </div>
            </div>
        </Layout.Header>
    )
}

export default Header
