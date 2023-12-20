"use client";
import React, {useState} from "react";
import Image from "next/image";
import CloseFilledImg from "../../../assets/images/svg/closeCircleFilled.svg";
import TickFilledImg from "../../../assets/images/svg/tickFilled.svg";
import ProjectXLayout from "../../../components/layouts/ProjectXLayout/ProjectXLayout";
import {Select} from "antd";
import {validateEmail} from "../../../utils/helper";

const teamsList = [
    {
        value: 'XcelPros 1',
        label: 'XcelPros 1',
    },
    {
        value: 'XcelPros 2',
        label: 'XcelPros 2',
    },
    {
        value: 'XcelPros 3',
        label: 'XcelPros 3',
    }
]

const OnBoarding: React.FC = (): JSX.Element=> {

    const [email, setEmail] = useState('');
    const [isEmailValid, setEmailValid] = useState(false);
    const [showTeamScreen, setShowTeamScreen] = useState(false);
    const [isReqSent, setReqSent] = useState(false);
    const [showError, setShowError] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<{label: string, value: string}>(teamsList[0]);

    const handleEmailChange = (e) => {
        const enteredEmail = e.target.value;
        setEmail(enteredEmail);
        setEmailValid(validateEmail(enteredEmail));
    };

    const onChange = (value: string) => {
        setSelectedTeam(teamsList.find(t => t.value === value) as {label: string, value: string});
    };

    const handleSubmit = () => {
        if(!email || !isEmailValid ) {
            setShowError(true);
            return null;
        } else {
            if(!showTeamScreen) {
                setShowTeamScreen(true);
                setShowError(false);
            } else {
                setReqSent(true);
                setShowError(false);
            }
        }
    }

    const innerView  = <>
        {/* on boarding wrapper */}
        <div className={`w-full ${isReqSent && 'hidden'}`}>
            <div className="w-full mb-[32px]">
                <div className="font-semibold text-black text-[36px] leading-[39px] mb-[16px]">
                    Join an organization
                </div>
                <p className="font-normal text-black text-[16px] leading-[24px]">
                    {!showTeamScreen ? 'Enter the field to join an organization' : 'Choose team to join an organization' }
                </p>
            </div>

            {!showTeamScreen ?
                <div className={'relative w-full mb-[32px]'}>
                    <input type={"email"} value={email}
                           onChange={handleEmailChange}
                           placeholder={'Enter your email'}
                           className={`h-[50px] rounded-[8px] py-[4px] px-[12px] w-full outline-0 border
                            border-inputColorBorder focus:border-black text-[16px]
                            ${showError && !isEmailValid && 'focus:border-inputColorError border-inputColorError'}`}/>
                    <div className={`absolute right-[14px] top-[17px] cursor-pointer ${!email && 'hidden'}`}
                         onClick={() => setEmail('')}>
                        <Image src={CloseFilledImg} alt=""/>
                    </div>
                    {showError && !isEmailValid && <span className={'text-inputColorError text-[12px] leading-[12px]'}>
                        Invalid email format. Please enter a valid email address and try again.
                    </span>}
                </div> :
                <div className={'mb-[32px]'}>
                    <Select
                        placeholder="Select a team"
                        onChange={onChange}
                        value={selectedTeam}
                        options={teamsList}
                    />
                </div>
            }
            {/* For disabled add 'bg-mediumGray pointer-events-none' and remove 'bg-black_100 cursor-pointer' */}
            <button type="button"
                    className="mb-[32px] text-[14px] leading-[20px] font-medium py-[12px] px-[6px] h-[50px] rounded-[8px] w-full bg-black_100 cursor-pointer text-white"
                    onClick={handleSubmit}>
                {!showTeamScreen ? 'Join' : 'Submit to join'}
            </button>
        </div>
        {/* end */}

        {/* success wrapper */}
        <div className={`w-full ${!isReqSent && 'hidden'}`}>
            <div className="mb-[32px]">
                <Image src={TickFilledImg} alt="" className="w-[63px] h-[63px]"/>
            </div>
            <h2 className="text-[48px] leading-[48px] text-black font-semibold">Request sent</h2>
            <p className="mt-[14px] text-[16px] text-black leading-[22px]">Your request to join the <span className="text-mediumGray_101">{selectedTeam && selectedTeam.label}</span> team has been sent.
                Upon approval, a confirmation message will be sent to <span className="text-mediumGray_101">{email}</span>, containing a temporary password that you can later modify for security.</p>
            <p className="mt-[14px] text-[16px] text-black leading-[22px]">Thank you for your interest, and we look forward to welcoming you on board.</p>
        </div>
        {/* end */}
    </>

    return ( <ProjectXLayout innerView={innerView} /> )
};

export default OnBoarding;
