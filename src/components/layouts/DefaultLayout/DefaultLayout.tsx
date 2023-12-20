import React, {FC, useEffect, useState} from 'react';
import { Layout } from 'antd';
import './DefaultLayout.scss'
import SiderMenu from "./SiderMenu";
import {Outlet, useLocation} from "react-router";
import Header from "../Header/Header";

const DefaultLayout: FC = () => {

    const [isLargeSiderMenu, setIsLargeSiderMenu] = useState<boolean>(true)

    const location = useLocation()
    const pathnames = location.pathname.split('/')
    const currentPage = pathnames[pathnames.length - 1]

    useEffect(() => {
        const defaultMenuType = localStorage.getItem('defaultMenuLarge')
        if (defaultMenuType !== undefined) {
            setIsLargeSiderMenu(Boolean(defaultMenuType))
        } else {
            setIsLargeSiderMenu(true)
        }
    }, []);

    const setDefaultMenuType = (value: boolean) => {
        localStorage.setItem('defaultMenuLarge', value.toString());
        setIsLargeSiderMenu(value)
    }

    return <Layout>
            <SiderMenu isLargeSiderMenu={isLargeSiderMenu} setDefaultMenuType={setDefaultMenuType} currentPage={currentPage}/>
            <Layout>
                <Header currentPage={currentPage}/>
                <Layout.Content className={'background-white'} style={{overflow: "auto"}}>
                    <Outlet/>
                </Layout.Content>
            </Layout>
        </Layout>
};

export default DefaultLayout;
