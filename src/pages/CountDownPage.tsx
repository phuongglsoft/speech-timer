import styles from '../styles/CountDownPage.module.scss';
import { Time, TimeStatus } from '../type/types';
import { getHours, getMinutes, getSeconds } from '../utils/time';
import { generateClassName } from '../utils/generate-class-name';
import { useSettingStore } from '../store/setting-store';
function CountDownPage({ time: { warningTime, countDownTime }, timePassed, status, remainingTime }: CountDownPageProps) {
  const { setting: { countMode, timeFormat } } = useSettingStore();
  const hrsRemained = getHours(remainingTime);
  timePassed = Math.floor(timePassed / 1000);
  const exceededTime = timePassed - countDownTime;
  const hrsPassed = getHours(timePassed);

  function showTimePassed() {
    if (timeFormat === 'minutes') {
      const minsPassed = getMinutes(timePassed, true);
      return minsPassed;
    }
    const minsPassed = getMinutes(timePassed);
    if (timeFormat === 'seconds') {
      const secsPassed = getSeconds(timePassed, true);
      return secsPassed;
    }
    const secsPassed = getSeconds(timePassed);
    if (!hrsPassed) {
      return `${minsPassed}:${secsPassed}`;
    }
    return `${hrsPassed}:${minsPassed}:${secsPassed}`;
  }

  function showRemainingTime() {
    if (timeFormat === 'minutes') {
      const mins = getMinutes(remainingTime, true);
      return mins;
    }
    const mins = getMinutes(remainingTime);

    if (timeFormat === 'seconds') {
      const secs = getSeconds(remainingTime, true);
      return secs;
    }

    const secs = getSeconds(remainingTime);
    if (!hrsRemained) {
      return `${mins}:${secs}`;
    }
    return `${hrsRemained}:${mins}:${secs}`;
  }

  function showTime(): string {
    if (status === TimeStatus.OverTimeRunning || status === TimeStatus.OverTimePaused) {
      return showOverTime();
    }
    if (countMode === 'down') {
      return showRemainingTime();
    }
    return showTimePassed();
  }

  function showOverTime() {
    const hrs = getHours(exceededTime);
    if (timeFormat === 'minutes') {
      const mins = getMinutes(exceededTime, true);
      return mins;
    }
    const mins = getMinutes(exceededTime);

    if (timeFormat === 'seconds') {
      const secs = getSeconds(exceededTime, true);
      return secs;
    }
    const secs = getSeconds(exceededTime);
    if (!hrs) {
      return `${mins}:${secs}`;
    }
    return `${hrs}:${mins}:${secs}`;
  }

  const time = showTime();

  return (
    <div className={styles['count-down-page-container']}>
      {
        (status === TimeStatus.OverTimeRunning || status === TimeStatus.OverTimePaused) && <span className={styles['over-time-title']}>overtime</span>
      }
      <span className={generateClassName(styles, ['count-down-time', ...((remainingTime <= warningTime) && (warningTime < countDownTime) && status !== TimeStatus.Complete) ? ['warning'] : [],
        ...status === TimeStatus.Complete ? ['complete'] : [],
        ...time.length !== 5 ? ['small'] : [],
        ...(status === TimeStatus.OverTimeRunning || status === TimeStatus.OverTimePaused) ? ['over-time'] : [],
      ],
      )}>
        {time}
      </span>
      {
        (timeFormat !== 'default') && <span className={styles['time-format']}>
          {timeFormat}
        </span>
      }
    </div >
  )
}

export default CountDownPage

type CountDownPageProps = {
  time: Time,
  timePassed: number,
  status: TimeStatus,
  remainingTime: number,
}