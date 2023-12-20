import React, {FC, useEffect, useRef, useState} from 'react';
import {Button, Divider, Layout} from 'antd';
import SiderMenu from "./SiderMenu";
import {Outlet} from "react-router";
import {LeftOutlined} from "@ant-design/icons";
import Workspace from "../../Workspace/Workspace";
import {useWindowSize} from "../../../hooks/useWindowSize";

const { Sider, Content } = Layout;

const EditorLayout:FC = () => {

    const editorRef = useRef<HTMLDivElement>(null)

    const [visibleMenu, setVisibleMenu] = useState<boolean>(true)
    const [editorWidth, setEditorWidth] = useState<number | undefined>(undefined)

    const [scale, setScale] = useState<number | null>(30)

    const size = useWindowSize()

    useEffect(() => {
        setEditorWidth(editorRef?.current?.clientWidth)
    }, [size, scale, visibleMenu]);
    
    const scaleChangeHandler = (e: number | null) => {
        setScale(e)
    };

    return (
    <Layout>
        <Sider
            className={'h-screen'}
            width={112}
        >
            <SiderMenu setVisibleMenu={setVisibleMenu}/>
        </Sider>
        <div>
            <div style={{
                width: 440,
                padding: '56px 24px 12px 24px',
                display: visibleMenu ? 'block' : 'none',
            }}
                 className={'background-white h-full relative'}>
                <h2>Labels and reports designer</h2>
                <Divider className={'absolute h-full right-0'} type={'vertical'}/>
                <Button
                    className={'absolute rounded-full p-2 flex absolute-right-center background-white z-10'}
                    onClick={() => setVisibleMenu(prevState => !prevState)}
                >
                    <LeftOutlined/>
                </Button>
            <Outlet/>
            </div>
        </div>

        <Layout>
            <Content className={'background-white'}>
               <Workspace
                  editorRef={editorRef}
                  editorWidth={editorWidth as number}
                  scaleChangeHandler={scaleChangeHandler}
                  scale={scale ?? 10}
                />
            </Content>
        </Layout>
    </Layout>
)};

export default EditorLayout;
