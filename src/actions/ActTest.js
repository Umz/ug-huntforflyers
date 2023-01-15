import Action from "classes/Action";
import Actions from "consts/Actions";

class ActTest extends Action {

    constructor(sprite) {
        super(Actions.ACT_BLANK);
        this.sprite = sprite;
        this.toX = Phaser.Math.Between(32, 320);
    }

    subclassUpdate(time, delta) {

        let dir = this.toX > this.sprite.x ? 1 : -1;
        let vel = this.sprite.getSpeed() * dir;
        this.sprite.setVelocityX(vel);
        
        if (this.sprite.getBounds().contains(this.toX, this.sprite.y)) {
            this.setComplete();
        }
    }
}
export default ActTest;