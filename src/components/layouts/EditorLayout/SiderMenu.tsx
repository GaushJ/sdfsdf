"use client";

import React from 'react';
import BoxSVG from "../../../assets/images/svg/box.svg";
import TemplatesSVG from "../../../assets/images/svg/templates.svg";
import BrandingSVG from "../../../assets/images/svg/branding.svg";
import ProjectsSVG from "../../../assets/images/svg/projects.svg";
import SourcesSVG from "../../../assets/images/svg/sources.svg";
import UploadSVG from "../../../assets/images/svg/upload.svg";
import FavouritesSVG from "../../../assets/images/svg/favourites.svg";
import SettingsSVG from "../../../assets/images/svg/settings.svg";
import BackSVG from "../../../assets/images/svg/back.svg";
import {usePathname, useRouter } from 'next/navigation';

type iProps = {
    setVisibleMenu: (item: boolean) => void
}

const menuItems = [
    {
        label: 'Templates',
        icon: (isActive: boolean) => <TemplatesSVG fill={isActive ? '#141527' : '#6D6E7A'} />
    },
    {
        label: 'Elements',
        icon: (isActive: boolean) => <FavouritesSVG fill={isActive ? '#3649FF' : '#6D6E7A'} />
    },
    {
        label: 'Branding',
        icon: (isActive: boolean) => <BrandingSVG fill={isActive ? '#3649FF' : '#6D6E7A'} />
    },
    {
        label: 'Projects',
        icon: (isActive: boolean) => <ProjectsSVG fill={isActive ? '#3649FF' : '#6D6E7A'} />
    },
    {
        label: 'Sources',
        icon: (isActive: boolean) => <SourcesSVG fill={isActive ? '#3649FF' : '#6D6E7A'} />
    },
    {
        label: 'Uploads',
        icon: (isActive: boolean) => <UploadSVG fill={isActive ? '#3649FF' : '#6D6E7A'} />
    },
]
const SiderMenu:React.FC<iProps> = ({setVisibleMenu}) => {

    const router = useRouter()
    const location = usePathname()
    const pathnames = location.split('/')
    const currentPage = pathnames[pathnames.length - 1]
    const generalRoute = pathnames.filter((item) => currentPage !== item).join('/')

    type CurrentPath = string | number
    const getNewPath = (path: string) => {
        return path.toLowerCase().split(' ').join('-')
    }
    const handleRedirect = ({path, currentPath}: {path?: string, currentPath?: CurrentPath}) => {
      if (path) {
          const newPath = getNewPath(path)
          router.push(newPath)
          setVisibleMenu(true)
      } else {
          router.push(currentPath as string)
          setVisibleMenu(true)
      }
    }

    return (
        <div className={'flex flex-col justify-between h-full'}>
            <div className={'flex flex-col'}>
                <div className={'flex justify-center mb-12'} onClick={() => handleRedirect({currentPath: '/'})}>
                    <BoxSVG />
                </div>
                <div className={'flex gap-4 pt-4 pb-4 items-center justify-center cursor-pointer'} onClick={() => handleRedirect({currentPath: -1})}>
                    <BackSVG />
                </div>
                <div className={'flex flex-col gap-1'}>
                    {menuItems.map(({ label, icon }) => {
                        const activeTab = currentPage === getNewPath(label)
                        return <div key={label}
                            className={'flex flex-col gap-2.5 p-4 items-center cursor-pointer'}
                            onClick={() => handleRedirect({currentPath: `${generalRoute}/${getNewPath(label)}`})}
                        >
                            {icon(activeTab)}
                            <p className={activeTab ? 'text-12 color-black' : 'text-12 color-grey'}>{label}</p>
                        </div>
                    })}
                </div>
            </div>
            <div className={'flex flex-col gap-2.5 p-4 items-center'}>
                <SettingsSVG />
                <p className={'text-12 color-grey'}>Settings</p>
            </div>
        </div>
    )
}

export default SiderMenu
