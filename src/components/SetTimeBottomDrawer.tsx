import styles from '../styles/SetTimeBottomDrawer.module.scss';
import { generateClassName } from '../utils/generate-class-name';
import roundedTriangle from '../assets/rounded-triangle.svg';
import { getHours, getMinutes, getSeconds } from '../utils/time';
import closeSVG from '../assets/close.svg';
import { BottomDrawerToSetTimeStatus, Time } from '../type/types';

enum Actions {
  increaseHour,
  decreaseHour,
  increaseMinute,
  decreaseMinute,
  increaseSecond,
  decreaseSecond,
  reset,
  plus5Mins,
  plus15Secs
}

enum ActionTypes {
  increase, decrease
}

function SetTimeBottomDrawer({ status, time: { countDownTime, warningTime }, setTime, setStatus }: SetTimeBottomDrawerProps) {

  function handleHour(action: ActionTypes) {
    if (status.type === 'countDownTime') {
      const hrs = Math.floor(countDownTime / 3600);
      if (action === ActionTypes.decrease && hrs !== 0) setTime(prevTime => ({ ...prevTime, countDownTime: prevTime.countDownTime - 3600 }))
      if (action === ActionTypes.increase) setTime(prevTime => ({ ...prevTime, countDownTime: prevTime.countDownTime + 3600 }))
    }
    if (status.type === 'warningTime') {
      const hrs = Math.floor(warningTime / 3600);
      if (action === ActionTypes.decrease && hrs !== 0) setTime(prevTime => ({ ...prevTime, warningTime: prevTime.warningTime - 3600 }))
      if (action === ActionTypes.increase) setTime(prevTime => ({ ...prevTime, warningTime: prevTime.warningTime + 3600 }))
    }
  }

  function handleMinute(action: ActionTypes) {
    if (status.type === 'countDownTime') {
      const mins = Math.floor(countDownTime / 60);
      if (action === ActionTypes.decrease && mins !== 0) setTime(prevTime => ({ ...prevTime, countDownTime: prevTime.countDownTime - 60 }))
      if (action === ActionTypes.increase) setTime(prevTime => ({ ...prevTime, countDownTime: prevTime.countDownTime + 60 }))
    }
    if (status.type === 'warningTime') {
      const mins = Math.floor(warningTime / 60);
      if (action === ActionTypes.decrease && mins !== 0) setTime(prevTime => ({ ...prevTime, warningTime: prevTime.warningTime - 60 }))
      if (action === ActionTypes.increase) setTime(prevTime => ({ ...prevTime, warningTime: prevTime.warningTime + 60 }))
    }
  }

  function handleSecond(action: ActionTypes) {
    if (status.type === 'countDownTime') {
      if (action === ActionTypes.decrease && countDownTime !== 0) setTime(prevTime => ({ ...prevTime, countDownTime: prevTime.countDownTime - 1 }))
      if (action === ActionTypes.increase) setTime(prevTime => ({ ...prevTime, countDownTime: prevTime.countDownTime + 1 }))
    }
    if (status.type === 'warningTime') {
      if (action === ActionTypes.decrease && warningTime !== 0) setTime(prevTime => ({ ...prevTime, warningTime: prevTime.warningTime - 1 }))
      if (action === ActionTypes.increase) setTime(prevTime => ({ ...prevTime, warningTime: prevTime.warningTime + 1 }))
    }
  }

  function handleReset() {
    if (status.type === 'countDownTime') {
      setTime(prev => ({ ...prev, countDownTime: 0 }));
    }
    if (status.type === 'warningTime') {
      setTime(prev => ({ ...prev, warningTime: 0 }));
    }
  }

  function handleIncrease15Seconds() {
    if (status.type === 'countDownTime') {
      setTime(prevTime => ({ ...prevTime, countDownTime: prevTime.countDownTime + 15 }))
    }
    if (status.type === 'warningTime') {
      setTime(prevTime => ({ ...prevTime, warningTime: prevTime.warningTime + 15 }))
    }
  }

  function handleIncrease5Mins() {
    if (status.type === 'countDownTime') {
      setTime(prevTime => ({ ...prevTime, countDownTime: prevTime.countDownTime + 60 * 5 }))
    }
    if (status.type === 'warningTime') {
      setTime(prevTime => ({ ...prevTime, warningTime: prevTime.warningTime + 60 * 5 }))
    }
  }

  function handleChangeTime(action: Actions) {
    switch (action) {
      case Actions.increaseHour: handleHour(ActionTypes.increase); break;
      case Actions.decreaseHour: handleHour(ActionTypes.decrease); break;
      case Actions.increaseMinute: handleMinute(ActionTypes.increase); break;
      case Actions.decreaseMinute: handleMinute(ActionTypes.decrease); break;
      case Actions.increaseSecond: handleSecond(ActionTypes.increase); break;
      case Actions.decreaseSecond: handleSecond(ActionTypes.decrease); break;
      case Actions.reset: handleReset(); break;
      case Actions.plus15Secs: handleIncrease15Seconds(); break;
      case Actions.plus5Mins: handleIncrease5Mins();

    }
  }

  return (
    <div className={generateClassName(styles, ['back-drop', ...!status.open ? ['d-none'] : []])}>
      <div className={styles['container']}>
        <div className={styles['navbar']}>
          <span>{status.type === 'countDownTime' ? 'set time' : 'set warning time'}</span>
          <button className={styles['btn-close']} onClick={() => setStatus(prev => ({ ...prev, open: false }))} data-big data-sound>
            <img src={closeSVG} data-sound={true} />
          </button>
        </div>
        <div className={generateClassName(styles, ['button-containers', 'increase'])}>
          <button onClick={() => handleChangeTime(Actions.increaseHour)} data-big data-sound>
            <img src={roundedTriangle} />
          </button>
          <div></div>
          <button onClick={() => handleChangeTime(Actions.increaseMinute)} data-big data-sound>
            <img src={roundedTriangle} />
          </button>
          <div></div>
          <button onClick={() => handleChangeTime(Actions.increaseSecond)} data-big data-sound>
            <img src={roundedTriangle} />
          </button>
        </div>
        <div className={styles['time-container']}>
          {
            status.type === 'countDownTime' ? <>
              <span>{getHours(countDownTime) || '00'}</span>
              <span>:</span>
              <span>{getMinutes(countDownTime)}</span>
              <span>:</span>
              <span>{getSeconds(countDownTime)}</span></> :
              <>
                <span className={styles['yellow']}>{getHours(warningTime) || '00'}</span>
                <span className={styles['yellow']}>:</span>
                <span className={styles['yellow']}>{getMinutes(warningTime)}</span>
                <span className={styles['yellow']}>:</span>
                <span className={styles['yellow']}>{getSeconds(warningTime)}</span></>
          }

        </div>
        <div className={generateClassName(styles, ['button-containers', 'decrease'])}>
          <button onClick={() => handleChangeTime(Actions.decreaseHour)} data-big data-sound>
            <img src={roundedTriangle} />
          </button>
          <div></div>
          <button onClick={() => handleChangeTime(Actions.decreaseMinute)} data-big data-sound>
            <img src={roundedTriangle} />
          </button>
          <div></div>
          <button onClick={() => handleChangeTime(Actions.decreaseSecond)} data-big data-sound>
            <img src={roundedTriangle} />
          </button>
        </div>
        <div className={styles['other-options-container']}>
          <div>
            <button className={styles['red']} onClick={() => handleChangeTime(Actions.reset)} data-big data-sound>
              00:00
            </button>
          </div>
          <div>
          </div>
          <div>
            <button className={styles['gray']} onClick={() => handleChangeTime(Actions.plus5Mins)} data-big data-sound>
              +05m
            </button>
          </div>
          <div>
          </div>
          <div>
            <button className={styles['gray']} onClick={() => handleChangeTime(Actions.plus15Secs)} data-big data-sound>
              +15s
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetTimeBottomDrawer


export type SetTimeBottomDrawerProps = {
  status: BottomDrawerToSetTimeStatus,
  time: Time,
  setTime: React.Dispatch<React.SetStateAction<Time>>,
  setStatus: React.Dispatch<React.SetStateAction<BottomDrawerToSetTimeStatus>>
}

