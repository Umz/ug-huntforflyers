import Animations from "../consts/Animations";
import Depths from "../consts/Depths";

class BGBird extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'flyers', 'eagle1');

        this.offsetX = x;
        this.scrollOffset = (4 * .15);

        this.setDepth(Depths.BG_ANIMATION);
        this.setTint(0x555555);
        this.setScale(.25);
        
        let startFrame = Phaser.Math.Between(0, 6);
        this.anims.play({key:Animations.EAGLE, startFrame: startFrame}, true);
    }

    update(time, delta) {

        let camera = this.scene.cameras.main;

        this.offsetX += (this.moveX * .001) * delta;
        this.x = (camera.scrollX * this.scrollOffset) + this.offsetX;
        this.y += (this.moveY * .001) * delta;

        let calc = (this.y / 2) * .1; // Fade at 20
        let alpha = Math.min(calc, 1);
        this.setAlpha(alpha);

        if (this.y < 0)
            this.setActive(false).setVisible(false);
    }

    reset(x, y) {

        this.moveX = Phaser.Math.Between(3, 6);
        this.moveY = Phaser.Math.Between(-2, -4);
        this.offsetX = x;

        this.setPosition(x, y);
        this.setVisible(true);
        this.setActive(true);
    }
}
export default BGBird;