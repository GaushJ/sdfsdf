"use client";

import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Layout } from 'antd';
import '../assets/styles/defaultLayout.scss';
import SiderMenu from "@/components/layouts/DefaultLayout/SiderMenu";
import { Outlet } from "react-router";
import Header from "../components/layouts/Header/Header";
import { redirect, usePathname } from "next/navigation";
import { supabase } from '@/config/superbaseClient';
import axios from 'axios';

const { Content } = Layout;

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {

    const [isLargeSiderMenu, setIsLargeSiderMenu] = useState<boolean>(true)

    const pathname = usePathname();
    const pathnames = pathname.split('/')
    const currentPage = pathnames[pathnames.length - 1]

    useEffect(() => {
        retrieveSession()
        const defaultMenuType = localStorage.getItem('defaultMenuLarge')
        if (defaultMenuType !== undefined) {
            setIsLargeSiderMenu(Boolean(defaultMenuType))
        } else {
            setIsLargeSiderMenu(true)
        }
    }, []);
    const retrieveSession = async () => {
        const { data, error } = await supabase.auth.getSession()
        if (!localStorage.getItem('sb-omlwmiqkdcgpzvpqsxre-auth-token')) {
            redirect('/sign-up')
        } else {
            const setCookies = await axios.post('/api/auth', {
                session: data
            })
            console.log(setCookies)
        }
        console.log(data)
    }
    const setDefaultMenuType = (value: boolean) => {
        localStorage.setItem('defaultMenuLarge', value.toString());
        setIsLargeSiderMenu(value)
    }

    return <Layout>
        <SiderMenu isLargeSiderMenu={isLargeSiderMenu} setDefaultMenuType={setDefaultMenuType} currentPage={currentPage} />
        <Layout>
            <Header currentPage={currentPage} />
            <Content className={'background-white'} style={{ marginLeft: isLargeSiderMenu ? 280 : 112 }}>
                {children}
            </Content>
        </Layout>
    </Layout>
};

export default DefaultLayout;
