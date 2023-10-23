export type BottomDrawerToSetTimeStatus = {
    open: boolean,
    type: SetTimeBottomDrawerType
}

export type SetTimeBottomDrawerType = 'countDownTime' | 'warningTime';

export type Time = {
    countDownTime: number,
    warningTime: number,
}

export enum TimeStatus {
    NotStarted,
    Running,
    Paused,
    Complete,
    OverTimePaused,
    OverTimeRunning,
}