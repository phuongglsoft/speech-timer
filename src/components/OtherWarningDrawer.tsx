import styles from '../styles/OtherWarningDrawer.module.scss';
import BottomDrawer from './BottomDrawer';
import upTriangle from '../assets/up-triangle.svg';
function OtherWarningDrawer({ open, close }: OtherWarningDrawerProps) {
    return (
        <BottomDrawer title='Get all 3 warning times!' open={open} close={close}>
            <div className={styles.container}>
                <span className={styles['time']}>
                    01:15
                </span>
                <div className={styles['timer-bar']}>
                    <img src={upTriangle} className={styles.pointer} />
                    <div className={styles['green']}></div>
                    <div className={styles['yellow']}></div>
                    <div className={styles['orange']}></div>
                    <div className={styles['red']}></div>
                </div>
                <div className={styles['actions-container']}>
                    <button className={styles['restore']} data-sound={true} data-big={true}>restore</button>
                    <button className={styles['upgrade']} data-sound={true} data-big={true}>upgrade</button>
                </div>
            </div>

        </BottomDrawer>
    )
}

export default OtherWarningDrawer
type OtherWarningDrawerProps = {
    open: boolean,
    close: () => void
}