import BottomDrawer from './BottomDrawer'
import styles from '../styles/InformationDrawer.module.scss';
function InformationDrawer({ open, close }: InformationDrawerProps) {

    return (
        <BottomDrawer open={open} close={close} title='about'>
            <div className={styles['container']}>
                <div className={styles['content']}>
                    <p>Speech timer is used in talks, speeches, debates or anything that needs a polite reminder to remain on time!</p>
                    <br />
                    <p>Includes time line, overtime (15 minutes), count up & down, 3 time formats and up to 3 warn times!</p>
                </div>
                <div className={styles['actions-container']}>
                    <button data-big={true} data-sound={true}>rate us!</button>
                    <button data-big={true} data-sound={true}>more apps</button>
                </div>
            </div>

        </BottomDrawer>
    )
}

export default InformationDrawer
type InformationDrawerProps = {
    open: boolean,
    close: () => void
}