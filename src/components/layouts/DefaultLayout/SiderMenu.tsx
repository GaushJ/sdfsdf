"use client";

import {FC} from 'react';
import {Layout} from "antd";
import PinSVG from "../../../assets/images/svg/pin.svg";
import BoxSVG from "../../../assets/images/svg/box.svg";
import BulbSVG from "../../../assets/images/svg/bulb.svg";
import PlusSVG from "../../../assets/images/svg/plus.svg";
import RecentSVG from "../../../assets/images/svg/recent.svg";
import HomeSVG from "../../../assets/images/svg/home.svg";
import ReportsSVG from "../../../assets/images/svg/reports.svg";
import FavouritesSVG from "../../../assets/images/svg/favourites.svg";
import SettingsSVG from "../../../assets/images/svg/settings.svg";
import MenuSVG from "../../../assets/images/svg/menu.svg";
import SquareCheckSVG from "../../../assets/images/svg/squareCheck.svg";
import { useRouter } from 'next/navigation';
const { Sider } = Layout;

type iProps = {
    isLargeSiderMenu: boolean,
    setDefaultMenuType: (item: boolean) => void,
    currentPage: string
}

const menuItems = [
    {
        label: 'Home',
        icon: (isActive: boolean) => <HomeSVG fill={isActive ? '#3649FF' : '#6D6E7A'}/>
    },
    {
        label: 'Favorites',
        icon: (isActive: boolean) => <FavouritesSVG fill={isActive ? '#3649FF' : '#6D6E7A'}/>
    },
    {
        label: 'Recent',
        icon: (isActive: boolean) => <RecentSVG fill={isActive ? '#3649FF' : '#6D6E7A'}/>
    },
    {
        label: 'Approvals',
        icon: (isActive: boolean) => <SquareCheckSVG stroke={isActive ? '#3649FF' : '#6D6E7A'}/>
    },
    {
        label: 'Label and reports',
        icon: (isActive: boolean) => <ReportsSVG fill={isActive ? '#3649FF' : '#6D6E7A'} />
    },
    {
        label: 'Product 2',
        icon: (isActive: boolean) => <BulbSVG fill={isActive ? '#3649FF' : '#6D6E7A'}/>
    },
]
const SiderMenu: FC<iProps> = ({isLargeSiderMenu, setDefaultMenuType, currentPage}) => {

    const router = useRouter()

    const getNewPath = (path: string) => {
        return path.toLowerCase().split(' ').join('-')
    }

    const handleRedirect = (path: string) => {
      const newPath = getNewPath(path)
        newPath === 'home' ? router.push('/') : router.push(newPath)
    }

    return (
        <Sider
            width={isLargeSiderMenu ? 280 : 112}
            style={{paddingLeft: isLargeSiderMenu ? 28 : 8, height: '100vh', position: 'fixed', zIndex: 10, paddingRight: isLargeSiderMenu ? 28 : 8}}
            className={'h-screen'}
        >
            <div className={'flex flex-col justify-between h-full'}>
                <div className={'flex flex-col gap-12'}>
                    <div className={isLargeSiderMenu ? 'flex justify-between' : 'flex justify-center'}>
                        <BoxSVG />
                        {isLargeSiderMenu &&
                            <div className={'cursor-pointer'} onClick={() => setDefaultMenuType(false)}>
                                <PinSVG />
                            </div>
                        }
                    </div>
                    <div className={isLargeSiderMenu
                        ? 'flex gap-4 pr-2.5 pl-2.5 items-center cursor-pointer'
                        : 'flex flex-col cursor-pointer items-center'
                    }>
                        {!isLargeSiderMenu &&
                            <div className={'cursor-pointer flex justify-center pt-4 pb-4'} onClick={() => setDefaultMenuType(true)}>
                                <MenuSVG />
                            </div>
                        }
                        <div className={'flex justify-center pt-4 pb-4'}>
                            <PlusSVG fill={'#3649FF'} />
                        </div>
                        {isLargeSiderMenu && <p className={'text-16 color-primary'}>New</p>}
                    </div>
                    <div className={isLargeSiderMenu ? 'flex flex-col gap-3.5' : 'flex flex-col gap-1'}>
                        {menuItems.map(({ label, icon }) => {
                            const activeTab = currentPage === getNewPath(label) || (currentPage === '' && label === 'Home')
                            return <div key={label}
                                className={isLargeSiderMenu
                                    ? 'flex gap-4 p-2.5 items-center cursor-pointer'
                                    : 'flex flex-col items-center cursor-pointer text-center p-4 gap-2.5'
                            }
                                onClick={() => handleRedirect(label)}
                            >
                                {icon(activeTab)}
                                <p className={isLargeSiderMenu
                                    ? `text-16 ${activeTab ? 'color-primary' : 'color-grey'}`
                                    : `text-12 ${activeTab ? 'color-primary' : 'color-grey'}`}
                                >
                                    {label}
                                </p>
                            </div>
                        })}
                    </div>
                </div>
                <div className={isLargeSiderMenu
                    ? 'flex gap-4 p-2.5 items-center cursor-pointer'
                    : 'flex flex-col items-center cursor-pointer text-center p-4'
                }>
                    <SettingsSVG />
                    <p className={isLargeSiderMenu ? 'text-16 color-grey' : 'text-12 color-grey'}>Settings</p>
                </div>
            </div>
        </Sider>
    )
}

export default SiderMenu
