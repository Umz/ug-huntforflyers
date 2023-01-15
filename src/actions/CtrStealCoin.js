import Action from "classes/Action";
import FnNames from "consts/FnNames";

class CtrStealCoin extends Action {

    constructor(sprite, coin, posX) {

        super(FnNames.ACT_STEAL_COINS);

        this.sprite = sprite;
        this.scene = sprite.scene;

        this.coin = coin;
        this.dropPoint = posX;
    }

    subclassUpdate(time, delta) {

        let pos = (this.sprite.velocityX > 0) ? this.sprite.getRightCenter() : this.sprite.getLeftCenter();
        this.coin.setPosition(pos.x, pos.y).setDepth(this.sprite.depth + 1);

        let dir = this.dropPoint > this.sprite.x ? 1 : -1;
        let speed = this.sprite.getSpeed() * dir;
        this.sprite.setVelocityX(speed);

        if (this.sprite.getBounds().contains(this.dropPoint, this.sprite.y)) {
            this.sprite.setVelocity(0, -32);
            this.scene.dropCoin(this.coin, this.dropPoint);
            this.setComplete();
        }

        if (!this.coin.active || !this.coin.visible) {
            this.setComplete();
        }
    }
}
export default CtrStealCoin;