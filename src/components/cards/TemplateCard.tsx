import React, {FC} from 'react';
import MockPNG from "../../assets/images/png/cover.png";
import Link from 'next/link';

type iProps = {
    size: string,
    title: string,
    category: string,
    img?: string
}

const TemplateCard: FC<iProps> = ({ size, title, category, img }) => {

    return (
        <Link href={`/template/${title}/templates`}>
        <div style={{width: 280, borderRadius: '12px', border: '1px solid #e5e7eb'}} className={'hover:shadow-2xl cursor-pointer'}>
            <div style={{height: 208, width: 280, borderBottom: '1px solid #e5e7eb'}}>
                {img
                    ? <div className={'flex justify-center items-center object-contain h-full w-full'}>
                        <img src={img} alt={title} height={140} width={140}/>
                    </div>
                    : <img src={MockPNG.src} alt={title} height={208} width={280}/>
                }
            </div>
            <div className={'flex flex-col gap-1'} style={{padding: 24}}>
                <p className={'uppercase color-purple text-12'}>{category}</p>
                <h3>{title}</h3>
                <p className={'text-tip'}>{size}</p>
            </div>
        </div></Link>
    )
}

export default TemplateCard
