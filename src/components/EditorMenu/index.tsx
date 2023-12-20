import {Button, Divider, Dropdown, Select} from "antd";
import InputNumberCustom from "../ui-kit/InputNumberCustom";
import {FC, useEffect, useState} from "react";
import {
    AlignLeftOutlined,
    BoldOutlined,
    BorderOutlined,
    FileImageOutlined,
    FileOutlined,
    FontSizeOutlined,
    InsertRowAboveOutlined,
    InsertRowBelowOutlined,
    ItalicOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, NumberOutlined,
    StrikethroughOutlined,
    UnderlineOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";
import FontColorSVG from "../../assets/images/svg/fontColor.svg";
import ColorPanelSVG from "../../assets/images/svg/colorPanel.svg";
import GridSettings from "../../components/EditorDropdown/GridSettings";
import { GridType } from "../Workspace/Workspace";

type iProps = {
    setShowedGrid: (item: boolean) => void,
    isShowedGrid: boolean,
    onChangeGridSize: (e: number | null) => void,
    gridSize: number,
    gridType: GridType
    onChangeGridType: (item: GridType) => void
}

const EditorMenu: FC<iProps> = ({setShowedGrid, isShowedGrid, onChangeGridSize, gridSize, gridType, onChangeGridType}) => {

    const [testNumber, setTestNumber] = useState<number | string>(12)

    const [isGridSettingsOpen, setIsGridSettingsOpen] = useState(false)

    const handleChange = (e: string) => {
        console.log(e)
    }

    const closeGridSettingsDropdown = () => {
        setIsGridSettingsOpen(false)
    }

    useEffect(() => setIsGridSettingsOpen(false), [gridSize, gridType, isShowedGrid])

    const gridSettings = [
        {
            label: <GridSettings
              isShowedGrid={isShowedGrid}
              setShowedGrid={setShowedGrid}
              closeDropdown={closeGridSettingsDropdown}
              onChangeGridSize={onChangeGridSize}
              gridSize={gridSize}
              gridType={gridType}
              onChangeGridType={onChangeGridType}
            />,
            key: 'grid settings'
        }
    ]

    return (
      <div className={'flex gap-6 flex-wrap items-center'}>
          <Select
            defaultValue="Monserrat"
            style={{ width: 120, height: 36 }}
            onChange={handleChange}
            options={[
                { value: 'monserrat', label: 'Monserrat' },
                { value: 'other', label: 'Other' },
            ]}
          />
          <InputNumberCustom value={testNumber} setValue={setTestNumber} />
          <div className={'flex gap-1'}>
              <Button type={'text'} className={'items-center flex flex-col p-0 pt-1'}>
                  <FontColorSVG />
                  <ColorPanelSVG />
              </Button>
              <Button type={'text'} className={'flex justify-center items-center p-0 px-1'}>
                  <BoldOutlined className={'text-20'} />
              </Button>
              <Button type={'text'} className={'flex justify-center items-center p-0 px-1'}>
                  <ItalicOutlined className={'text-20'} />
              </Button>
              <Button type={'text'} className={'flex justify-center items-center p-0 px-1'}>
                  <UnderlineOutlined className={'text-20'} />
              </Button>
              <Button type={'text'} className={'flex justify-center items-center p-0 px-1'}>
                  <StrikethroughOutlined className={'text-20'} />
              </Button>
          </div>
          <Divider type={'vertical'} className={'h-8 m-0'}/>
          <div className={'flex gap-1.5'}>
              <Button type={'text'} className={'flex justify-center items-center p-0 px-1'}>
                  <UnorderedListOutlined />
              </Button>
              <Button type={'text'} className={'flex justify-center items-center p-0 px-1'}>
                  <MenuFoldOutlined />
              </Button>
              <Button type={'text'} className={'flex justify-center items-center p-0 px-1'}>
                  <MenuUnfoldOutlined />
              </Button>
              <Button type={'text'} className={'flex justify-center items-center p-0 px-1'}>
                  <InsertRowAboveOutlined />
              </Button>
              <Button type={'text'} className={'flex justify-center items-center p-0 px-1'}>
                  <InsertRowBelowOutlined />
              </Button>
          </div>
          <Divider type={'vertical'} className={'h-8 m-0'}/>
          <div className={'flex gap-1.5'}>
              <Button type={'text'} className={'flex justify-center items-center p-0 px-1'}>
                  <FileOutlined />
              </Button>
              <Button type={'text'} className={'flex justify-center items-center p-0 px-1'}>
                  <FileImageOutlined />
              </Button>
              <Button type={'text'} className={'flex justify-center items-center p-0 px-1'}>
                  <AlignLeftOutlined />
              </Button>
              <Button type={'text'} className={'flex justify-center items-center p-0 px-1'}>
                  <BorderOutlined />
              </Button>
              <Button type={'text'} className={'flex justify-center items-center p-0 px-1'}>
                  <FontSizeOutlined />
              </Button>
              <Dropdown
                trigger={['click']}
                open={isGridSettingsOpen}
                onOpenChange={() => setIsGridSettingsOpen(true)}
                menu={{items: gridSettings}}
                placement={'bottomRight'}
              >
                  <Button
                    type={'text'}
                    className={'flex justify-center items-center p-0 px-1'}
                  >
                      <NumberOutlined className={isGridSettingsOpen ? 'color-active' : 'color-black'}/>
                  </Button>
              </Dropdown>
          </div>
      </div>
    )
}

export default EditorMenu
