import React, {FC} from 'react';
import {Button, Popover, Tag} from "antd";
import Link from 'next/link';
import {useState} from "react";

import MockPNG from "../../assets/images/png/cover.png";

import MoreSVG from "../../assets/images/svg/more.svg";
import CopySVG from "../../assets/images/svg/copy.svg";
import FavouriteSVG from "../../assets/images/svg/favourites.svg";
import DownloadSVG from "../../assets/images/svg/download.svg";
import ShareSVG from "../../assets/images/svg/share.svg";
import CopyLinkSVG from "../../assets/images/svg/copyLink.svg";
import EditSVG from "../../assets/images/svg/edit.svg";
import DeleteSVG from "../../assets/images/svg/delete.svg";

const popoverItems = [
    {
        label: 'Copy',
        icon: <CopySVG width={16} height={16}/>,
        key: 1,
    },
    {
        label: 'Add to favorite',
        icon: <FavouriteSVG width={16} height={16} fill={'#141527'}/>,
        key: 2,
    },
    {
        label: 'Download',
        icon: <DownloadSVG width={16} height={16} />,
        key: 3,
    },
    {
        label: 'Share',
        icon: <ShareSVG width={16} height={16} fill={'#141527'} />,
        key: 4,
    },
    {
        label: 'Copy link',
        icon: <CopyLinkSVG width={16} height={16} />,
        key: 5,
    },
    {
        label: 'Edit',
        icon: <EditSVG width={16} height={16} />,
        key: 6,
    },
    {
        label: 'Delete',
        icon: <DeleteSVG width={16} height={16} />,
        key: 7,
    },
]

type iProps = {
    size: string,
    title: string,
    date: string,
    status: string,
    img?: string
}

const ProjectCard: FC<iProps> = ({ size, title, date, status, img }) => {

    const [open, setOpen] = useState(false)
    const tagColor = () => {
      switch (status) {
          case 'draft': return 'blue';
          case 'approved': return 'green';
          case 'blocked': return 'red';
          case 'submited': return 'orange';
          default: return 'red';
      }
    }

    const popoverContent = <div>
        {popoverItems.map(({label, icon, key}) => {
            return <Button type={"text"} key={key} className={'flex gap-3.5 items-center w-full hover-light-blue p-3 h-10'}>
                {icon}
                <span>{label}</span>
            </Button>
        })}
    </div>

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return (
        <div style={{width: 280, borderRadius: '12px', border: '1px solid #e5e7eb'}} className={'hover:shadow-2xl cursor-pointer relative'}>
            <Link href={`/template/${title}/templates`}>
                <div style={{height: 208, width: 280, borderBottom: '1px solid #e5e7eb'}} className={'relative'}>
                    {img
                        ? <div className={'flex justify-center items-center object-contain h-full w-full'}>
                            <img src={img} alt={title} height={140} width={140}/>
                        </div>
                        : (
                            <img src={MockPNG.src} alt={title} height={208} width={280}/>
                        )
                    }
                    <p className={'text-12 color-text-grey absolute right-4 bottom-4'}>{date}</p>
                </div>
                <div className={'flex flex-col gap-1'} style={{padding: 24}}>
                    <h3>{title}</h3>
                    <div className={'flex justify-between items-center'}>
                        <p className={'text-tip'}>{size}</p>
                        <Tag color={tagColor()} className={'capitalize py-0.5 px-4 m-0 rounded-xl'}>{status}</Tag>
                    </div>
                </div>
            </Link>
            <Popover
                trigger={'click'}
                placement={'leftTop'}
                content={popoverContent}
                open={open}
                onOpenChange={handleOpenChange}
            >
                <Button type={'text'} className={'absolute top-4 right-4 p-0'}>
                    <MoreSVG/>
                </Button>
            </Popover>
        </div>
    )
}

export default ProjectCard
