/** Class that configures any input device to the Player control */
class Controlpad {

    constructor(scene) {
        this.scene = scene;
        this.LEFT = false;
        this.RIGHT = false;
    }

    addControlTarget(IControllable) {
        this.controlTarget = IControllable;
    }

    addKeyboardControl() {
        const scene = this.scene;
        scene.input.keyboard.on('keydown-LEFT', (event) => { this.LEFT = true; });
        scene.input.keyboard.on('keyup-LEFT', (event) => { this.LEFT = false });
        scene.input.keyboard.on('keydown-RIGHT', (event) => { this.RIGHT = true });
        scene.input.keyboard.on('keyup-RIGHT', (event) => { this.RIGHT = false });
        scene.input.keyboard.on('keydown-Z', (event) => { this.action() });
    }

    action() {
        if (this.controlTarget)
            this.controlTarget.doAction();
    }

    update(time, delta) {
        const target = this.controlTarget;
        if (target)
            if (this.LEFT)
                target.moveLeft();
            else if (this.RIGHT)
                target.moveRight();
    }
}
export default Controlpad;