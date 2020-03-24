export default function keySwitcher(e) {
    switch(e.code) {

        case 'KeyP': {
            this.props.setCurrentTool('pen');
            break
        }
        case 'KeyF': {
            this.props.setCurrentTool('fill');
            break
        }
        case 'KeyE': {
            this.props.setCurrentTool('eraser');
            break
        }
        case 'KeyD': {
            this.props.setCurrentTool('dropper');
            break
        }
        case 'KeyS': {
            const [mainColor, auxColor] = [this.props.mainColor, this.props.auxColor];
            this.props.setMainColor(auxColor);
            this.props.setAuxColor(mainColor);
            break
        }
        case 'Digit1': {
            this.props.setPenSize(1);
            break
        }
        case 'Digit2': {
            this.props.setPenSize(2);
            break
        }
        case 'Digit3': {
            this.props.setPenSize(3);
            break
        }
        case 'Digit4': {
            this.props.setPenSize(4);
            break
        }
        default: break

    }
}