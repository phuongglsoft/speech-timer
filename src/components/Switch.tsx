import { useRef } from 'react';
import styles from '../styles/Switch.module.scss';
import { generateClassName } from '../utils/generate-class-name';
function Switch({ checked, onChange }: SwitchProps) {
    const labelRef = useRef<HTMLLabelElement | null>(null);
    function handleChange() {
        if (labelRef?.current) {
            labelRef.current.style.transform = 'scale(1.2)';
            setTimeout(() => { labelRef.current!.style.transform = ' initial' }, 200)
        }
        onChange();
    }
    return (
        <label className={styles['switch']} ref={labelRef} >
            <input data-sound={true} type="checkbox" checked={checked} onChange={handleChange} />
            <span className={generateClassName(styles, ['slider-bar', ...checked ? ['checked'] : []])}></span>
            <span className={generateClassName(styles, ['slider', ...checked ? ['checked'] : []])}></span>
        </label>
    )
}

export default Switch

type SwitchProps = {
    checked: boolean,
    onChange: () => void
}