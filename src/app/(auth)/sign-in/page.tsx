"use client";
import React, {useState} from "react";
import Link from 'next/link';
import Image from "next/image";
import CloseFilledImg from "../../../assets/images/svg/closeCircleFilled.svg";
import EyeImg from "../../../assets/images/svg/eye.svg";
import GoogleImg from "../../../assets/images/svg/google.svg";
import MicrosoftImg from "../../../assets/images/svg/microsoft.svg";
import AppleImg from "../../../assets/images/svg/apple.svg";
import TickFilledImg from "../../../assets/images/svg/tickFilled.svg";

import {validateEmail, validatePassword} from "../../../utils/helper";
import ProjectXLayout from "../../../components/layouts/ProjectXLayout/ProjectXLayout";
import { supabase } from "@/config/superbaseClient";

const SignUp = (): JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);
    const [isEmailValid, setEmailValid] = useState(false);
    const [isPasswordValid, setPasswordValid] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);

    const handleEmailChange = (e) => {
        const enteredEmail = e.target.value;
        setEmail(enteredEmail);
        setEmailValid(validateEmail(enteredEmail));
    };

    const handlePasswordChange = (e) => {
        const enteredPassword = e.target.value;
        setPassword(enteredPassword);
        setPasswordValid(validatePassword(enteredPassword));
    };

    const handleSubmit = () => {
        if(!email || !password || !isEmailValid || !isPasswordValid) {
            setShowError(true);
            return null;
        }
        setShowSuccessScreen(true);
    }

    const handleGoogleSignup = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                    redirectTo: '/weather'
                },

            })
            // localStorage.setItem("auth data",JSON.stringify())
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }
    const handleMicrosoftSignup = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'azure',
                options: {
                    scopes: 'email',
                },
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleAppleSignup = async () => {
        try {
            const { data, error } = supabase.auth.signInWithOAuth({
                provider: 'apple',
            })
        } catch (error) {
            console.log(error)
        }
    }
    const innerView = <>
        {/* sign in wrapper */}
        <div className={`w-full ${showSuccessScreen && 'hidden'}`}>
            <div className="w-full mb-[32px]">
                <div className="font-semibold text-black text-[36px] leading-[39px] mb-[16px]">
                    Welcome to Project X
                </div>
                <p className="font-normal text-black text-[16px] leading-[24px]">
                    Sign in to your account
                </p>
            </div>

            <div className={'relative w-full mb-[32px]'}>
                <input type={"email"} value={email} onChange={handleEmailChange}
                       placeholder={'your.name@company.com'}
                       className={`h-[50px] rounded-[8px] py-[4px] px-[12px] w-full outline-0 border
                        border-inputColorBorder focus:border-black text-[16px]
                         ${showError && !isEmailValid && 'focus:border-inputColorError border-inputColorError'}`} />
                <div className={`absolute right-[14px] top-[17px] cursor-pointer ${!email && 'hidden'}`}
                      onClick={() => {
                          setEmail('');
                      }}>
                    <Image src={CloseFilledImg} alt=""/>
                </div>
                {showError && !isEmailValid &&  <span className={'text-inputColorError text-[12px] leading-[12px]'}>
                    Invalid email format. Please enter a valid email address and try again.
                </span>}
            </div>
            <div className={'relative w-full mb-[32px]'}>
                <input type={showPassword ? "text" : "password"}
                       placeholder={'Password'} onChange={handlePasswordChange}
                       className={`h-[50px] rounded-[8px] py-[4px] px-[12px] w-full outline-0 border 
                        border-inputColorBorder focus:border-black text-[16px]
                        ${showError && !isPasswordValid && 'focus:border-inputColorError border-inputColorError'}`} />
                <div className="absolute right-[14px] top-[17px] cursor-pointer"
                                  onClick={() => setShowPassword(!showPassword)}>
                    <Image src={EyeImg} alt=""/>
                </div>
                {showError && !isPasswordValid && <span className={'text-inputColorError text-[12px] leading-[12px]'}>
                    Invalid password format. Please enter a valid password and try again.
                </span>}
                <div className="text-right leading-[15px]">
                    <Link href={''} className="font-medium text-[blue] text-[12px] leading-[12px] cursor-pointer">Forgot password?</Link>
                </div>
            </div>
            {/* For disabled add 'bg-mediumGray pointer-events-none' and remove 'bg-black_100 cursor-pointer' */}
            <button type="button"
                    onClick={handleSubmit}
                    className={'bg-black_100 cursor-pointer mb-[32px] text-[14px] leading-[20px] font-medium py-[12px] px-[6px] h-[50px] rounded-[8px] w-full text-white'}
            >Sign in</button>

            <div className="relative mb-[32px]">
                <div className="relative font-medium text-mediumGray_100 text-[14px] text-center leading-[24px] whitespace-nowrap">
                    <span className="block border-t absolute border-[#E7E5E2] top-[50%] w-full translate-y-[-50%]"/>
                    <span className="bg-white px-[16px] relative z-10 inline-block">or Sign in with</span>
                </div>
            </div>

            <div className="gap-[8px] w-full flex items-center relative">
                <div onClick={handleGoogleSignup} className="h-[48px] justify-center gap-[8px] px-[28px] py-[16px] flex-1 grow rounded-[8px] border border-solid border-[#e2e2e7] flex items-center relative cursor-pointer">
                    <Image
                        className="relative w-[16px] h-[16px] object-cover"
                        alt="Google g logo"
                        src={GoogleImg}
                    />
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Suisse_Intl-Regular',Helvetica] font-normal text-black text-[14px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                        Google
                    </div>
                </div>
                <div onClick={handleMicrosoftSignup} className="h-[48px] justify-center gap-[8px] px-[28px] py-[16px] flex-1 grow rounded-[8px] border border-solid border-[#e2e2e7] flex items-center relative cursor-pointer">
                    <div className="relative w-[16px] h-[16px] ml-[-3.00px]">
                        <Image
                            className="absolute w-[14px] h-[14px] top-px left-px object-cover"
                            alt="Microsoft icon"
                            src={MicrosoftImg}
                        />
                    </div>
                    <div className="relative w-fit mt-[-1.00px] mr-[-3.00px] [font-family:'Suisse_Intl-Regular',Helvetica] font-normal text-black text-[14px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                        Microsoft
                    </div>
                </div>
                <div onClick={handleAppleSignup} className="h-[48px] justify-center gap-[8px] px-[28px] py-[16px] flex-1 grow rounded-[8px] border border-solid border-[#e2e2e7] flex items-center relative cursor-pointer">
                    <Image
                        className="relative w-[16px] h-[16px]"
                        alt="Apple logo"
                        src={AppleImg}
                    />
                    <div className="relative font-normal text-black text-[14px] text-center leading-[normal] whitespace-nowrap">
                        Apple
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center w-full mt-[32px]">
                <p className="relative text-black text-[14px] leading-[26px]">
                    Already have an account?
                </p>
                <Link href={"/sign-up"}
                      className="relative font-medium text-[#3649ff] text-[14px] leading-[26px] ml-[5px]">
                    Sign up
                </Link>
            </div>
        </div>
        {/* end */}

        {/* success wrapper */}
        <div className={`w-full ${!showSuccessScreen && 'hidden'}`}>
            <div className="mb-[32px]">
                <Image src={TickFilledImg} alt="" className="w-[63px] h-[63px]"/>
            </div>
            <h2 className="text-[48px] leading-[48px] text-black font-semibold">Email validation</h2>
            <p className="mt-[14px] text-[16px] text-black leading-[22px]">Thank you for signing up! Your registration is currently pending. Once your email is verified, you'll receive a confirmation message at <span className="text-mediumGray_101">{email}</span>.</p>
            <p className="mt-[14px] text-[16px] text-black leading-[22px]">We appreciate your patience and look forward to welcoming you to our community.</p>
        </div>
        {/* end */}
    </>

    return (<ProjectXLayout innerView={innerView} />);
};

export default SignUp;
