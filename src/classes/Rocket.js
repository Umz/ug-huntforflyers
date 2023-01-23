import Depths from "consts/Depths";
import WorldConsts from "consts/WorldConsts";

class Bullet extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    }

    update(time, delta) {
        if (!this.scene.cameras.main.worldView.contains(this.x, this.y))
            this.setActive(false).setVisible(false);
    }

    drop() {
        this.setVelocityY(WorldConsts.GRAVITY * 1.5);
    }

    reset() {
        this.setActive(true).setVisible(true).setDepth(Depths.ENEMIES);
        this.setGravityY(WorldConsts.GRAVITY);
    }
}
export default Bullet;