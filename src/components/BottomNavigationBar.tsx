import styles from '../styles/BottomNavigationBar.module.scss';
import i from '../assets/i.svg';
import setting from '../assets/setting.svg';
import playSVG from '../assets/play.svg';
import returnSVG from '../assets/return.svg';
import pauseSVG from '../assets/pause.svg';
import share from '../assets/share.svg';
import NavigationButton from './NavigationButton';
import { TimeStatus } from '../type/types';
import { generateClassName } from '../utils/generate-class-name';

function BottomNavigationBar({ status, handleIClick, handlePauseClick, handlePlayClick, handleReturnClick, handleSettingClick, handleShareClick }: BottomNavigationBarProps) {
    return (
        <div className={generateClassName(styles, ['bottom-navigation-bar-container', ...(status === TimeStatus.Running || status === TimeStatus.OverTimeRunning) ? ['dim'] : []])}>
            <NavigationButton src={i} onClick={handleIClick} delayOnCLick disable={status === TimeStatus.Running || status === TimeStatus.OverTimeRunning} />
            <NavigationButton src={setting} onClick={handleSettingClick} delayOnCLick disable={status === TimeStatus.Running || status === TimeStatus.OverTimeRunning} />
            {
                (status === TimeStatus.Running || status === TimeStatus.OverTimeRunning) ? <NavigationButton src={pauseSVG} onClick={handlePauseClick} /> : <NavigationButton src={playSVG} onClick={handlePlayClick} />
            }
            <NavigationButton src={returnSVG} onClick={handleReturnClick} imgStyle={{ transform: 'scaleX(-1)' }} />
            <NavigationButton src={share} delayOnCLick onClick={handleShareClick} disable={status === TimeStatus.Running || status === TimeStatus.OverTimeRunning} />
        </div>
    )
}

export default BottomNavigationBar

type BottomNavigationBarProps = {
    handleIClick: () => void,
    handleSettingClick: () => void,
    handlePlayClick: () => void,
    handlePauseClick: () => void,
    handleReturnClick: () => void,
    handleShareClick: () => void,
    status: TimeStatus,
}
