import {Button, InputNumber, Select} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import Toggle from "@/components/ui-kit/Toggle";
import {FC} from "react";
import styles from "./GridSettings.module.scss"
import { GridType } from "@/components/Workspace/Workspace";

type iProps = {
  isShowedGrid: boolean,
  setShowedGrid: (item: boolean) => void,
  closeDropdown: () => void,
  gridSize: number,
  onChangeGridSize: (item: number | null) => void
  gridType: GridType
  onChangeGridType: (item: GridType) => void
}

const GridSettings:FC<iProps> = ({isShowedGrid, setShowedGrid, closeDropdown, gridSize, onChangeGridSize, gridType, onChangeGridType}) => {

  return (
    <div className={'p-5 w-420'}>
      <div className={'flex align-middle justify-between pb-4'}>
        <h2 className={'dropdown-title'}>Grid</h2>
        <Button type={'text'} className={'p-1 flex items-center'} onClick={closeDropdown}>
          <CloseOutlined />
        </Button>
      </div>
      <p className={'pb-6'}>Configure your grid settings.</p>
      <div className={'flex flex-col gap-4'}>
        <div className={'flex justify-between items-center'}>
          <p>Layer grid</p>
          <Toggle
            isActive={isShowedGrid}
            onClick={() => setShowedGrid(!isShowedGrid)}
          />
        </div>
        <div className={'flex justify-between items-center'}>
          <p>Grid size</p>
          <div className={styles.input_with_measurement}>
            <span className={styles.measurement}>px</span>
            <InputNumber
              value={gridSize}
              onChange={onChangeGridSize}
              min={20}
              max={100}
            />
          </div>
        </div>
        <div className={'flex justify-between items-center h-10'}>
          <p>Grid style</p>
          <Select
            defaultValue={GridType.Line}
            value={gridType}
            style={{ width: 104 }}
            onChange={onChangeGridType}
            options={[
              { value: 'line', label: 'Line' },
              { value: 'dot', label: 'Dot' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default GridSettings
