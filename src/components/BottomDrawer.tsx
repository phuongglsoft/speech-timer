import styles from '../styles/BottomDrawer.module.scss';
import { generateClassName } from '../utils/generate-class-name';
import closeSVG from '../assets/close.svg';
function BottomDrawer({ open, children, title, close }: BottomDrawerProps) {
    function handleClose() {
        setTimeout(() => {
            close()
        }, 300)
    }
    return <div className={generateClassName(styles, ['back-drop', ...!open ? ['d-none'] : []])}>
        <div className={styles['wrapper']}>
            <div className={styles['container']}>
                <div className={styles['navbar']}>
                    <span>{title}</span>
                    <button className={styles['btn-close']} onClick={handleClose} data-sound={true} data-big={true}>
                        <img src={closeSVG} data-sound={true} style={{ pointerEvents: 'none' }} data-big={true} />
                    </button>
                </div>
                {children}
            </div>

        </div>
    </div >
}

export default BottomDrawer

type BottomDrawerProps = {
    open: boolean,
    title: string,
    children: React.ReactNode,
    close: () => void
}