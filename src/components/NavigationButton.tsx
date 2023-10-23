import styles from '../styles/NavigationButton.module.scss';
function NavigationButton({ src, onClick, imgStyle, delayOnCLick, disable }: NavigationButtonProps) {

    function handleOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (disable) return;
        const clicked = styles['clicked'];
        if (delayOnCLick) {
            (e.target as HTMLButtonElement).classList.add(clicked);
            setTimeout(() => {
                (e.target as HTMLButtonElement).classList.remove(clicked);
                onClick();
            }, 300)
        }
        else {
            (e.target as HTMLButtonElement).classList.add(clicked);
            setTimeout(() => {
                (e.target as HTMLButtonElement).classList.remove(clicked);
            }, 300)
            onClick();
        }
    }

    return (
        <button onClick={handleOnClick} className={styles['button-container']} data-sound={true}>
            <img src={src} className={styles.icon} style={imgStyle} />
        </button>
    )
}

export default NavigationButton
type NavigationButtonProps = {
    src: string,
    onClick: () => void,
    imgStyle?: React.CSSProperties,
    delayOnCLick?: boolean,
    disable?: boolean
}