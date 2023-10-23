import { useSettingStore } from '../store/setting-store';
import styles from '../styles/SettingDrawer.module.scss';
import BottomDrawer from './BottomDrawer';
import Switch from './Switch';
import greenUpTriangle from '../assets/green-up-triangle.svg';
import orangeTriangle from '../assets/orange-triangle.svg';
function SettingDrawer({ open, close }: SettingDrawerProps) {
    const { setting: { sound, showTimeLine, isOverTime, timeFormat, countMode }, setSound, setShowTimeLine, setIsOverTime, setTimeFormat, setCountMode } = useSettingStore();

    function handleSoundClick() {
        if (sound === 'enabled') {
            setSound('chimes only');
        }
        if (sound === 'chimes only') {
            setSound('disabled');
        }
        if (sound === 'disabled') {
            setSound('enabled');
        }
    }

    function handleShowTimeLineChange() {
        setShowTimeLine(!showTimeLine);
    }

    function handleShowOvertimeChange() {
        setIsOverTime(!isOverTime);
    }

    function handleChangeTimeFormat() {
        if (timeFormat === 'default') {
            setTimeFormat('minutes')
        }
        if (timeFormat === 'minutes') {
            setTimeFormat('seconds')
        }
        if (timeFormat === 'seconds') {
            setTimeFormat('default')
        }
    }


    function handleCountModeChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        (e.target as HTMLButtonElement).style.transform = 'scale(1.4)';
        setTimeout(() => {
            (e.target as HTMLButtonElement).style.transform = 'initial'
            if (countMode === 'down') {
                setCountMode('up')
            } else {
                setCountMode('down')
            }
        }, 300)
    }

    return (
        <BottomDrawer open={open} close={close} title='options'>
            <div className={styles['container']}>
                <div className={styles['options-label-container']}>
                    <div>
                        <span>sound</span>
                    </div>
                    <div>
                        <span>timeline</span>
                    </div>
                    <div>
                        <span>overtime</span>
                    </div>
                    <div>
                        <span>count mode</span>
                    </div>
                    <div>
                        <span>time format</span>
                    </div>
                </div>
                <div className={styles['options-container']}>
                    <div>
                        <button
                            data-big
                            onClick={handleSoundClick}
                            {...sound === 'chimes only' ? { style: { color: '#fa7a04' } } : {}}
                            data-sound={true}
                            style={
                                {
                                    color: (sound === 'chimes only') ? '#fa7a04' : undefined,
                                    opacity: (sound === 'disabled') ? '50%' : undefined,
                                }
                            }
                        >{sound}
                        </button>
                    </div>
                    <div>
                        <Switch checked={showTimeLine} onChange={handleShowTimeLineChange} data-sound={true} />
                    </div>
                    <div>
                        <Switch checked={isOverTime} onChange={handleShowOvertimeChange} data-sound={true} />
                    </div>
                    <div>
                        <button onClick={handleCountModeChange} data-sound={true}>
                            <img data-sound={true} src={countMode === 'up' ? greenUpTriangle : orangeTriangle} {...countMode === 'down' ? { style: { transform: 'rotate(180deg)' } } : undefined} />
                        </button>
                    </div>
                    <div>
                        <button onClick={handleChangeTimeFormat} data-sound={true} data-big>{timeFormat}</button>
                    </div>
                </div>

            </div>
        </BottomDrawer>
    )
}

export default SettingDrawer;

type SettingDrawerProps = {
    open: boolean,
    close: () => void,
}
