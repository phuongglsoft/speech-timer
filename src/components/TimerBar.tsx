import styles from '../styles/TimerBar.module.scss';
import upTriangle from '../assets/up-triangle.svg';
import { TimeStatus } from '../type/types';
import { generateClassName } from '../utils/generate-class-name';
function TimerBar({ pointerPosition, warningTimeWidth, status }: TimerBarProps) {
    return (
        <div className={generateClassName(styles, ['timer-bar-container', ... (status === TimeStatus.OverTimePaused || status === TimeStatus.OverTimeRunning) ? ['over-time'] : []])}>
            <div className={styles['timer-bar']} ></div>
            <div className={styles['warning-bar']} style={{ width: warningTimeWidth }}></div>
            {
                (status !== TimeStatus.OverTimePaused) && status !== TimeStatus.OverTimeRunning && <img className={styles['pointer']} src={upTriangle} style={{ left: `${pointerPosition}%` }} />
            }
        </div>
    )
}

export default TimerBar

type TimerBarProps = {
    pointerPosition: number,
    warningTimeWidth: string,
    status: TimeStatus
}