import { create } from 'zustand';

type Setting = {
    sound: Sound
    showTimeLine: boolean,
    isOverTime: boolean,
    countMode: CountMode,
    timeFormat: TimeFormat
}
type Sound = 'enabled' | 'disabled' | 'chimes only';
type CountMode = 'up' | 'down';
type TimeFormat = 'default' | 'minutes' | 'seconds';

type SettingStore = {
    setting: Setting,
    setSound: (sound: Sound) => void,
    setShowTimeLine: (showTimeLine: boolean) => void,
    setIsOverTime: (showOverTime: boolean) => void,
    setCountMode: (countMode: CountMode) => void,
    setTimeFormat: (timeFormat: TimeFormat) => void,
}

const initialSetting: Setting = {
    sound: 'enabled',
    showTimeLine: true,
    isOverTime: false,
    countMode: 'down',
    timeFormat: 'default'
}


export const useSettingStore = create<SettingStore>((set) => ({
    setting: initialSetting,
    setSound: (sound: Sound) => {
        return set((state) => ({ ...state, setting: { ...state.setting, sound } }));
    },
    setShowTimeLine: (showTimeLine: boolean) => set((state) => ({
        ...state,
        setting: { ...state.setting, showTimeLine }
    })),
    setIsOverTime: (isOverTime: boolean) => set((state) => ({ ...state, setting: { ...state.setting, isOverTime } })),
    setCountMode: (countMode: CountMode) => set((state) => ({ ...state, setting: { ...state.setting, countMode } })),
    setTimeFormat: (timeFormat: TimeFormat) => set((state) => ({ ...state, setting: { ...state.setting, timeFormat } })),
}));