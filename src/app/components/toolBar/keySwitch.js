export default function getKeySwitcher(keyState) {
    return function(e) {

        switch(e.code) {

            case keyState.penKey: {
                this.props.setCurrentTool('pen');
                break
            }
            case keyState.fillKey: {
                this.props.setCurrentTool('fill');
                break
            }
            case keyState.eraserKey: {
                this.props.setCurrentTool('eraser');
                break
            }
            case keyState.dropperKey: {
                this.props.setCurrentTool('dropper');
                break
            }
            case keyState.switchColorKey: {
                const [mainColor, auxColor] = [this.props.mainColor, this.props.auxColor];
                this.props.setMainColor(auxColor);
                this.props.setAuxColor(mainColor);
                break
            }
            case keyState.penSize1: {
                this.props.setPenSize(1);
                break
            }
            case keyState.penSize2: {
                this.props.setPenSize(2);
                break
            }
            case keyState.penSize3: {
                this.props.setPenSize(3);
                break
            }
            case keyState.penSize4: {
                this.props.setPenSize(4);
                break
            }
            default: break
        }
    }
}