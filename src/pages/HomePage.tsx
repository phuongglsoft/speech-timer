import styles from '../styles/homepage.module.scss';
import { getHours, getMinutes, getSeconds } from '../utils/time';
import orangeLock from '../assets/lock-orange.svg';
import redLock from '../assets/lock-red.svg';
import { generateClassName } from '../utils/generate-class-name';
import { SetTimeBottomDrawerType } from '../type/types';

function HomePage({ countDownTime, warningTime, openSetTimeDrawer, openOtherWarning }: HomePageProps) {
    function showCountDownTime() {
        const hrs = getHours(countDownTime);
        const mins = getMinutes(countDownTime);
        const secs = getSeconds(countDownTime);
        if (!hrs) {
            return `${mins}:${secs}`;
        }
        return `${hrs}:${mins}:${secs}`;
    }

    function showWarningTime() {
        const hrs = getHours(warningTime);
        const mins = getMinutes(warningTime);
        const secs = getSeconds(warningTime);
        if (!hrs) {
            return `${mins}:${secs}`;
        }
        return `${hrs}:${mins}:${secs}`;
    }

    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {

        (e.target as HTMLDivElement).style.transform = 'scale(1.1)';
        setTimeout(() => {
            (e.target as HTMLDivElement).style.transform = 'scale(1)';
        }, 300);
        setTimeout(() => {
            switch ((e.target as HTMLDivElement).getAttribute('data-name')) {
                case 'time': openSetTimeDrawer('countDownTime'); break;
                case 'warning-time': openSetTimeDrawer('warningTime'); break;
                case 'lock-orange': openOtherWarning(); break;
                case 'lock-red': openOtherWarning(); break;
                default: break;
            }
        }, 300)

    }

    return (
        <div className={styles['home-page-container']} >
            <div className={styles['time']} onClick={handleClick} data-name='time' data-sound={true}>{showCountDownTime()} </div>
            <div className={styles['options-container']}>
                <div className={generateClassName(styles, ['option-container', 'warning-time'])} data-name='warning-time' onClick={handleClick} data-sound={true}>
                    {showWarningTime()}
                </div>
                <div className={styles['option-container']} data-name='lock-orange' onClick={handleClick} data-sound={true}>
                    <img src={orangeLock} className={styles['lock-orange']} />
                </div>
                <div className={styles['option-container']} data-name='lock-red' onClick={handleClick} data-sound={true}>
                    <img src={redLock} className={styles['lock-red']} />
                </div>
            </div>
        </div >
    )
}

export default HomePage

type HomePageProps = {
    countDownTime: number,
    warningTime: number,
    openSetTimeDrawer: (type: SetTimeBottomDrawerType) => void,
    openOtherWarning: () => void,
}