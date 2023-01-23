import Depths from "consts/Depths";
import Textures from "consts/Textures";
import WorldConsts from "consts/WorldConsts";

class Bullet extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.bulletSpeed = WorldConsts.HEIGHT;
        this.bulletAngle = 90;
    }

    update(time, delta) {
        if (!this.scene.cameras.main.worldView.contains(this.x, this.y))
            this.setActive(false).setVisible(false);
    }

    setHuntBullet(angle) {
        this.bulletSpeed = WorldConsts.HEIGHT * 2;
        this.setFrame(Textures.BULLET);
        this.reset(angle);
    }

    setAttackBullet(angle) {
        this.bulletSpeed = WorldConsts.HEIGHT * 4;
        this.setFrame(Textures.BULLET_BIG);
        this.reset(angle);
    }

    reset(angle) {
        this.bulletAngle = angle;
        this.scene.physics.velocityFromRotation(this.bulletAngle, this.bulletSpeed, this.body.velocity);
        this.setAngularVelocity(360);
        this.setActive(true).setVisible(true).setDepth(Depths.PLAYER_BULLETS);
    }
}
export default Bullet;