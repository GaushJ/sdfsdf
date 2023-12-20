import React from "react";
import Link from 'next/link';
import Image from "next/image";
import CloseImg from "../../../assets/images/svg/close.svg";
import ProjectXLogoImg from "../../../assets/images/svg/projectXLogo.svg";

interface IProps {
    innerView: JSX.Element
}

const ProjectXLayout: React.FC<IProps> = ({innerView}): JSX.Element => {

    return (
        <>
            <div className="flex items-center justify-between py-[40px] px-[60px]">
                <div className="flex items-center">
                    <Image className="relative w-[32px] h-[32px]" alt="Logo" src={ProjectXLogoImg} />
                    <div className="ml-[12px] font-semibold text-[#2e2e3a] text-[20px] leading-[22px] whitespace-nowrap">
                        Project X
                    </div>
                </div>
                <div className="ml-[10px]">
                    <Image className="w-[24px] h-[24px]"  alt="" src={CloseImg} />
                </div>
            </div>
            <div className="max-w-[425px] mx-auto mt-[20px] flex flex-col justify-between auth-height-wrapper">
                {innerView}
                <div className="text-center mb-[48px] mt-[20px]">
                    <Link className="font-medium text-[#3649ff] text-[14px] leading-[26px]" href={"/sign-up"} >
                        Need help?
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ProjectXLayout;
