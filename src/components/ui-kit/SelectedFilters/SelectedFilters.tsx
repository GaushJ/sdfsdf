import {Tag} from "antd";
import React, {FC} from 'react';

type iProps = {
    selectedFilters: string[],
    onCloseFilter: (item: string) => void
}

const SelectedFilters: FC<iProps> = ({selectedFilters, onCloseFilter}) => {

    return (
        <div style={{minHeight: 24, marginBottom: '24px'}} className={'flex flex-wrap gap-3.5'}>
            {!!selectedFilters.length &&
                selectedFilters.map((item) => {
                    return <Tag key={item}
                        closable
                        onClose={(e) => {
                            e.preventDefault()
                            onCloseFilter(item)
                        }}
                        style={{background: '#EFEFF1', padding: '2px 16px'}}
                        className={'rounded-2xl'}
                    >
                        {item}
                    </Tag>
                })
            }
        </div>
    )
}

export default SelectedFilters
