"use client";

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { validateEmail } from "../../../utils/helper";
import Image from "next/image";
import CloseFilledImg from "../../../assets/images/svg/closeCircleFilled.svg";
import GoogleImg from "../../../assets/images/svg/google.svg";
import MicrosoftImg from "../../../assets/images/svg/microsoft.svg";
import AppleImg from "../../../assets/images/svg/apple.svg";
import TickFilledImg from "../../../assets/images/svg/tickFilled.svg";
import ProjectXLayout from "../../../components/layouts/ProjectXLayout/ProjectXLayout";
import { supabase } from "../../../config/superbaseClient";
import axios from "axios";

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isValid, setValid] = useState(false);
    const [showError, setShowError] = useState(false);
    const [requestSent, setRequestSent] = useState(false);

    useEffect(() => {
        retrieveSession()
        return () => {
            setShowError(false);
            setValid(false);
            setRequestSent(false);
        }
    }, [])
    const retrieveSession = async () => {
        const { data, error } = await supabase.auth.getSession()
        console.log(data)
    }
    const handleEmailChange = (e) => {
        const enteredEmail = e.target.value;
        setEmail(enteredEmail);
        setValid(validateEmail(enteredEmail));
    };

    // const signInWithAzure = async () => {
    // const { user, error } = await supabase.auth.signInWithOAuth({
    //     provider: 'azure'
    // }, {
    //     scopes: 'email',
    // });

    // if (error) {
    //     console.error('Error signing in with Azure:', JSON.stringify(error));
    // } else if (user) {
    //     console.log('Successfully signed in with Azure:', user);
    //     // router.push('/sign-in'); // Redirect to dashboard or another page
    // } else {
    //     // Handle other cases
    // }
    // };

    const clearInput = () => {
        setEmail('');
        setValid(false);
    }

    const handleSubmit = () => {
        if (!email || !isValid) {
            setShowError(true);
            return null;
        }
        setRequestSent(true);
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
                    redirectTo: 'http://localhost:3000/'
                },

            })




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
                    redirectTo: 'http://localhost:3000/'
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
                options: {
                    redirectTo: 'http://localhost:3000/'
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    const innerView = <>
        {/* sign up wrapper */}
        <div className={`w-full ${requestSent && 'hidden'}`}>
            <div className="w-full mb-[32px]">
                <div className="font-semibold text-black text-[36px] leading-[39px] mb-[16px]">
                    Welcome to Project X
                </div>
                <p className="font-normal text-black text-[16px] leading-[24px]">
                    Sign up to your account
                </p>
            </div>

            <div className={'relative w-full mb-[32px]'}>
                <input type={"email"} value={email} onChange={handleEmailChange}
                    placeholder={'Enter your email'}
                    className={`h-[50px] rounded-[8px] py-[4px] px-[12px] w-full outline-0 border border-inputColorBorder focus:border-black text-[16px] ${showError && !isValid && 'focus:border-inputColorError border-inputColorError'}`} />
                <div className={`absolute right-[14px] top-[17px] cursor-pointer ${!email && 'hidden'}`}
                    onClick={clearInput}>
                    <Image src={CloseFilledImg} alt="" />
                </div>
                {showError && !isValid && (<span className={'text-inputColorError text-[12px] leading-[12px]'}>
                    Invalid email format. Please enter a valid email address and try again.
                </span>)}
            </div>

            {/* For disabled add 'bg-mediumGray pointer-events-none' and remove 'bg-black_100 cursor-pointer'  text-white*/}
            <button type="button"
                onClick={handleSubmit}
                className={`mb-[32px] text-[14px] leading-[20px] font-medium py-[12px] px-[6px] h-[50px] rounded-[8px] w-full bg-black_100 cursor-pointer text-white`}>Sign up</button>

            <div className="relative mb-[32px]">
                <div className="relative font-medium text-mediumGray_100 text-[14px] text-center leading-[24px] whitespace-nowrap">
                    <span className="block border-t absolute border-[#E7E5E2] top-[50%] w-full translate-y-[-50%]" />
                    <span className="bg-white px-[16px] relative z-10 inline-block">or Sign up with</span>
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
                <Link href={"/sign-in"}
                    className="relative font-medium text-[#3649ff] text-[14px] leading-[26px] ml-[5px]">
                    Sign in
                </Link>
            </div>
        </div>
        {/* end */}

        {/* success wrapper */}
        <div className={`w-full ${!requestSent && 'hidden'}`}>
            <div className="mb-[32px]">
                <Image src={TickFilledImg} alt="" className="w-[63px] h-[63px]" />
            </div>
            <h2 className="text-[48px] leading-[48px] text-black font-semibold">Email validation</h2>
            <p className="mt-[14px] text-[16px] text-black leading-[22px]">Thank you for signing up! Your registration is currently pending. Once your email is verified, you'll receive a confirmation message at <span className="text-mediumGray_101">[name@gmail.com]</span>.</p>
            <p className="mt-[14px] text-[16px] text-black leading-[22px]">We appreciate your patience and look forward to welcoming you to our community.</p>
        </div>
        {/* end */}
    </>

    return (
        <ProjectXLayout innerView={innerView} />
    );
};

export default SignUp;
