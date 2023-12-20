import React, {FC} from 'react';
import styles from './Toggle.module.scss'
import classNames from "classnames";
import SunSVG from "../../../assets/images/svg/sun.svg";
import MoonSVG from "../../../assets/images/svg/moon.svg";

type iProps = {
    isActive: boolean,
    showIcons?: boolean,
    onClick?: () => void
}

const Toggle:FC<iProps> = ({ isActive, showIcons, onClick }) => {

    return (
        <div
            className={classNames(styles.toggle, {
            [styles.inActive]: !isActive
        })}
            onClick={onClick}
        >
            {showIcons &&
                <div className={classNames(styles.light, {
                    [styles.lightOff]: !isActive
                })}>
                    <SunSVG/>
                </div>
            }
            <div className={classNames(styles.state, {
                [styles.active]: !!isActive
            })}/>
            {showIcons &&
            <div className={classNames(styles.dark, {
                [styles.darkOff]: isActive
            })}>
                <MoonSVG/>
            </div>}
        </div>
    )
}

export default Toggle
