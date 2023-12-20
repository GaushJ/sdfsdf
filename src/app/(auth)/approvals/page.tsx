import React from "react";
import Image from "next/image";
import SortImg from "../../../assets/images/svg/sort.svg";
import EditImg from "../../../assets/images/svg/edit.svg";
import TableImg from "../../../assets/images/svg/table.svg";
import SearchImg from "../../../assets/images/svg/searchBlack.svg";
import DefaultLayout from "../../page";

const Approvals = (): JSX.Element => {
    return (
        <DefaultLayout>
            <div style={{ padding: '8px 64px 8px 56px', maxHeight: '90vh'}}>
                <div className="mb-[12px]">
                    <ul className="flex">
                        <li className="px-[4px] text-[14px] leading-[22px]"><span className="text-breadcrumbColorDim">Approvals</span></li>
                        <li className="px-[4px] text-[14px] leading-[22px]"><span className="text-breadcrumbColorDim">/</span></li>
                        <li className="px-[4px] text-[14px] leading-[22px]"><span className="text-breadcrumbColorActive">Liam Anderson</span></li>
                    </ul>
                </div>
                <div className="flex items-center justify-between mb-[36px]">
                    <div className="">
                        <h2 className="text-[38px] font-semibold leading-[38px] text-black mb-[5px]">Liam Anderson</h2>
                        <p className="text-[14px] leading-[20px] text-mediumGray_102">8 projects waiting for approval</p>
                    </div>
                    <button type="button" className="bg-[#2E2E3A] rounded-[8px] text-[14px] leading-[18px] text-white p-[16px] min-w-[110px]">Create</button>
                </div>

                <div className="flex justify-end">
                    <ul className="flex mx-[-12px] items-center">
                        <li className="px-[12px]">

                            <div className="relative input-search-wrapper">
                                <Image alt="" src={SearchImg} className="absolute top-[10px] left-[16px]"/>
                                <input type="text" placeholder="Search" className="py-[8px] px-[0px] text-black text-[16px] outline-0" />
                            </div>

                        </li>
                        <li className="px-[12px]">
                            <ul className="flex mx-[-4px]">
                                <li className="px-[4px] flex items-center"><Image alt="" src={EditImg} /></li>
                                <li className="px-[4px] flex items-center"><Image alt="" src={TableImg} /></li>
                            </ul>
                        </li>
                        <li className="px-[12px]"><span className="cursor-pointer text-[16px] text-black flex items-center"><Image alt="" src={SortImg} className="mr-[8px]"/> Sort</span></li>
                    </ul>
                </div>

                <>
                    <div className="p-[24px] bg-[#FAFAFA] rounded-[12px] mt-[10px]">
                        <p className="text-black text-[16px] leading-[22px]">Olivia Bennett <span className="text-mediumGray_102">send</span> project “Strategic Selling” to Liam Anderson for approval <span className="text-mediumGray_102">15 minutes ago.</span></p>
                    </div>
                    <div className="p-[24px] bg-[#FAFAFA] rounded-[12px] mt-[10px]">
                        <p className="text-black text-[16px] leading-[22px]">Olivia Bennett <span className="text-mediumGray_102">send</span> project “Strategic Selling” to Liam Anderson for approval <span className="text-mediumGray_102">15 minutes ago.</span></p>
                    </div>
                    <div className="p-[24px] bg-[#FAFAFA] rounded-[12px] mt-[10px]">
                        <p className="text-black text-[16px] leading-[22px]">Olivia Bennett <span className="text-mediumGray_102">send</span> project “Strategic Selling” to Liam Anderson for approval <span className="text-mediumGray_102">15 minutes ago.</span></p>
                    </div>
                    <div className="p-[24px] bg-[#FAFAFA] rounded-[12px] mt-[10px]">
                        <p className="text-black text-[16px] leading-[22px]">Olivia Bennett <span className="text-mediumGray_102">send</span> project “Strategic Selling” to Liam Anderson for approval <span className="text-mediumGray_102">15 minutes ago.</span></p>
                    </div>
                    <div className="p-[24px] bg-[#FAFAFA] rounded-[12px] mt-[10px]">
                        <p className="text-black text-[16px] leading-[22px]">Olivia Bennett <span className="text-mediumGray_102">send</span> project “Strategic Selling” to Liam Anderson for approval <span className="text-mediumGray_102">15 minutes ago.</span></p>
                    </div>
                </>
            </div>
        </DefaultLayout>

    )
};

export default Approvals;
