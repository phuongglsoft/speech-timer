import { useState } from 'react';
import styles from '../styles/ShareDrawer.module.scss';
import BottomDrawer from './BottomDrawer';
import check from '../assets/check.svg';
import { generateClassName } from '../utils/generate-class-name';
const beforeSpeech = ['#READYTOGO', '#wishmeluck', '#nervous']
const afterSpeech = ['#FeelingGood', '#relieved', '#tired'];

function ShareDrawer({ open, close, }: ShareDrawerProps) {
    const [text, setText] = useState('Share the moment!');
    const [textSelected, setTextSelected] = useState(false);
    function handleSelectText(selectedText: string, before?: boolean) {
        if (before) {
            setText(`Got to do a speech! ${selectedText}`)
        }
        setText(`Finished a speech! ${selectedText}`)
        setTextSelected(true);
    }

    return (
        <BottomDrawer open={open} close={close} title={'share'}>
            <div className={styles['container']}>
                <div className={generateClassName(styles, ['text', ...textSelected ? ['white'] : []])}>
                    {text}
                </div>
                <div className={styles['options-container']}>
                    {beforeSpeech.map(item => <button onClick={() => handleSelectText(item, true)} className={styles['before-speech-option']} data-sound={true} data-big={true}>{item}</button>)}

                    {afterSpeech.map(item => <button onClick={() => handleSelectText(item)} className={styles['after-speech-option']} data-sound={true} data-big={true}>{item}</button>)}

                </div>
                <button className={styles['btn-check']} data-sound={true} data-big={true}>
                    <img src={check} />
                </button>
            </div>
        </BottomDrawer>
    )
}

export default ShareDrawer

type ShareDrawerProps = {
    open: boolean,
    close: () => void,
}