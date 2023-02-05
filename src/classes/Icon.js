import Counter from "components/Counter";

class Icon extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, atlas, frame) {
        super(scene, x, y, atlas, frame);
        this.target = null;
        this.counter = Counter.New().setRepeating(true).setMaxCount(1000).setActive(false);
    }

    update(time, delta) {

        if (this.target) {
            let top = this.target.getTopCenter();
            this.setPosition(top.x, top.y - 4);
        }

        if (this.counter.updateAndCheck(time, delta) || !this.target.showingIcon) {
            this.setActive(false).setVisible(false);
            this.counter.setActive(false);
            this.target = null;
        }
    }

    showAboveTarget(target, millis) {
        this.target = target;
        let time = millis > 0 ? millis : 10;
        this.counter.setMaxCount(time).setActive(millis > 0);
        this.setVisible(true).setActive(true).setDepth(target.depth).setOrigin(.5, 1);
    }
}
export default Icon;