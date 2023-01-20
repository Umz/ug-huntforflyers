import Depths from "consts/Depths";

class Coin extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    }

    initVelocity() {
        let velX = Phaser.Math.Between(-96, 96);
        let velY = Phaser.Math.Between(-32, 0);
        this.body.setVelocity(velX, velY);
    }

    reset(value) {
        
        this.coinValue = value;
        this.claimed = false;

        this.setActive(true).setVisible(true).setDepth(Depths.ENEMIES_FROZEN);
    }
}
export default Coin;