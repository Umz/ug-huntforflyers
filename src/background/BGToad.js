import Animations from "../consts/Animations";
import Depths from "../consts/Depths";

class BGToad extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'flyers', 'toad1');

        this.offsetX = x;
        this.scrollOffset = (4 * .15);

        this.setDepth(Depths.BG_RUNNERS);
        this.setTint(0xBBBBBB);
        this.setScale(.25);
        this.setScrollFactor(this.scrollOffset, 0);
        
        let startFrame = Phaser.Math.Between(0, 3);
        this.anims.play({key:Animations.TOAD, startFrame: startFrame}, true);
    }

    update(time, delta) {

        let camera = this.scene.cameras.main;

        this.offsetX += (this.moveX * .001) * delta;
        //this.x = (camera.scrollX * this.scrollOffset) + this.offsetX;
        this.x += (this.moveX * .001) * delta;

        //if (this.y < 0)
        //    this.setActive(false).setVisible(false);
    }

    reset(x, y) {

        this.moveX = Phaser.Math.Between(5, 6);
        this.offsetX = x;

        this.setPosition(x, y);
        this.setVisible(true);
        this.setActive(true);
    }
}
export default BGToad;