import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { useEffect, useRef, useState } from 'react';
import styles from './styles/app.module.scss'
import TimerBar from './components/TimerBar';
import BottomNavigationBar from './components/BottomNavigationBar';
import SetTimeBottomDrawer from './components/SetTimeBottomDrawer';
import CountDownPage from './pages/CountDownPage';
import { BottomDrawerToSetTimeStatus, SetTimeBottomDrawerType, Time, TimeStatus } from './type/types';
import InformationDrawer from './components/InformationDrawer';
import SettingDrawer from './components/SettingDrawer';
import clickSound from './assets/click-sound.wav';
import { useSettingStore } from './store/setting-store';
import finishSound from './assets/finish-sound.mp3';
import ShareDrawer from './components/ShareDrawer';
import warningSound from './assets/warn-sound.mp3';
import OtherWarningDrawer from './components/OtherWarningDrawer';
enum OpenDrawer {
  InformationDrawer,
  SettingDrawer,
  ShareDrawer,
  OtherWarning,
  NotOpen

}

function App() {
  const [time, setTime] = useState<Time>({ countDownTime: 0, warningTime: 0 });
  const [status, setStatus] = useState<TimeStatus>(TimeStatus.NotStarted);
  const [bottomDrawerForSetTimeStatus, setBottomDrawerForSetTimeStatus] = useState<BottomDrawerToSetTimeStatus>({ open: false, type: 'countDownTime' })
  const [openDrawer, setOpenDrawer] = useState<OpenDrawer>(OpenDrawer.NotOpen);
  const [timePassed, setTimePassed] = useState(0);
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const clickAudioRef = useRef<HTMLAudioElement | null>(new Audio(clickSound))
  const finishSoundRef = useRef<HTMLAudioElement | null>(new Audio(finishSound));
  const warningSoundRef = useRef<HTMLAudioElement | null>(new Audio(warningSound));
  const { setting: { showTimeLine, sound, isOverTime } } = useSettingStore();

  function openSetTimeDrawer(type: SetTimeBottomDrawerType) {
    setBottomDrawerForSetTimeStatus({ open: true, type: type })
  }

  function handleIClick() {
    setOpenDrawer(OpenDrawer.InformationDrawer);
  }

  function handlePauseClick() {
    if (timerRef.current) clearInterval(timerRef.current);
    setStatus(prev => {
      if (prev === TimeStatus.OverTimeRunning) {
        return TimeStatus.OverTimePaused
      }
      return TimeStatus.Paused;
    }
    );
  }

  function handlePlayClick() {
    if (time.countDownTime === 0) return;
    if (location.pathname === '/home') {
      setStatus(TimeStatus.Running);
    }
    else {
      if (timePassed >= time.countDownTime * 1000 && isOverTime) {
        setStatus(TimeStatus.OverTimeRunning);
      } else if (status === TimeStatus.Paused) {
        setStatus(TimeStatus.Running);
      }
      else {
        setStatus(TimeStatus.Running);
        setTimePassed(0);
      }
    }
    const interval = 100;
    function handlePlay() {
      setTimePassed(prev => {
        const nextTime = prev + interval;
        if (nextTime === ((time.countDownTime - time.warningTime) * 1000 - 100) && sound !== 'disabled') {
          warningSoundRef.current?.play();
        }

        if (nextTime === time.countDownTime * 1000 && sound !== 'disabled') {
          finishSoundRef.current?.play();
        }

        if (nextTime / 1000 >= time.countDownTime && !isOverTime) {
          setStatus(TimeStatus.Complete)
          if (timerRef.current) clearInterval(timerRef.current);
        }

        else if (nextTime / 1000 >= time.countDownTime) {
          setStatus(TimeStatus.OverTimeRunning)
        }
        return nextTime;

      }
      );
    }
    navigate('/count-down');
    timerRef.current = setInterval(handlePlay, interval)
  }

  function handleOpenOtherWarning() {
    setOpenDrawer(OpenDrawer.OtherWarning);
  }

  function handleReturnClick() {
    if (location.pathname === '/count-down') {
      navigate('/home');
      if (timerRef.current) clearInterval(timerRef.current);
      setStatus(TimeStatus.NotStarted);
      setTimePassed(0);
    }
  }

  function handleSettingClick() {
    setOpenDrawer(OpenDrawer.SettingDrawer)
  }

  function handleShareClick() {
    setOpenDrawer(OpenDrawer.ShareDrawer)
  }

  const pointerPosition = () => (timePassed / (time.countDownTime * 1000)) * 100;

  function handleCloseDrawer() {
    setOpenDrawer(OpenDrawer.NotOpen)
  }

  useEffect(() => {
    function handlePlaySoundWhenButtonClick(e: MouseEvent) {
      if ((e.target as HTMLElement).getAttribute('data-sound')) {
        clickAudioRef.current?.play();
      }
    }
    if (sound === 'enabled') {
      document.addEventListener('click', handlePlaySoundWhenButtonClick)
    }

    return () => document.removeEventListener('click', handlePlaySoundWhenButtonClick)
  }, [sound])

  useEffect(() => {
    function makeEleBiggerWhenClick(e: MouseEvent) {
      if ((e.target as HTMLElement).getAttribute('data-big')) {
        (e.target as HTMLDivElement).style.transition = 'transform 300ms ease';
        (e.target as HTMLDivElement).style.transform = 'scale(1.1)';
        setTimeout(() => {
          (e.target as HTMLDivElement).style.transform = 'scale(1)';
        }, 300);
      }
    }
    document.addEventListener('click', makeEleBiggerWhenClick);

    return () => document.removeEventListener('click', makeEleBiggerWhenClick)
  }, [])

  return (
    <div className={styles['background']}>
      <div className={styles['main-content']}>
        <Routes>
          <Route index element={<Navigate to={'/home'} />} />
          <Route path='/home' element={<HomePage countDownTime={time.countDownTime} warningTime={time.warningTime} openSetTimeDrawer={openSetTimeDrawer} openOtherWarning={handleOpenOtherWarning} />} />
          <Route path='/count-down' element={<CountDownPage time={time} timePassed={timePassed} status={status} remainingTime={time.countDownTime - Math.floor(timePassed / 1000)} />} />
        </Routes>
        {
          showTimeLine && <TimerBar pointerPosition={pointerPosition()} warningTimeWidth={time.warningTime >= time.countDownTime ? '0%' : `${(time.warningTime / (time.countDownTime)) * 100}%`} status={status} />
        }
        <BottomNavigationBar status={status} handleIClick={handleIClick} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick} handleReturnClick={handleReturnClick} handleSettingClick={handleSettingClick} handleShareClick={handleShareClick} />
        <SetTimeBottomDrawer status={bottomDrawerForSetTimeStatus} setStatus={setBottomDrawerForSetTimeStatus} time={time} setTime={setTime} />
        <InformationDrawer open={openDrawer === OpenDrawer.InformationDrawer} close={handleCloseDrawer} />
        <ShareDrawer open={openDrawer === OpenDrawer.ShareDrawer} close={handleCloseDrawer} />
        <SettingDrawer open={openDrawer === OpenDrawer.SettingDrawer} close={handleCloseDrawer} />
        <OtherWarningDrawer open={openDrawer === OpenDrawer.OtherWarning} close={handleCloseDrawer} />
      </div>
    </div >

  )
}

export default App