import Action from "classes/Action";
import FnNames from "consts/FnNames";

class ActTest extends Action {

    constructor(sprite) {
        super(FnNames.ACT_BLANK);
        this.sprite = sprite;
        this.toX = Phaser.Math.Between(32, 332);
    }

    subclassUpdate(time, delta) {

        let dir = this.toX > this.sprite.x ? 1 : -1;
        let vel = this.sprite.velocityX * dir;
        this.sprite.setVelocityX(vel);

        if (this.sprite.getBounds().contains(this.toX, this.sprite.y))
            this.setComplete();
    }
}
export default ActTest;