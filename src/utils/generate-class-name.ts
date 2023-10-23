export function generateClassName(styles: CSSModuleClasses, classes: string[]): string {
    let classNames = '';
    classes.forEach((className) => {
        classNames += ` ${styles[className]}`;
    })
    return classNames
}