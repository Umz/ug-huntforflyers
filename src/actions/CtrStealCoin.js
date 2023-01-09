import Action from "classes/Action";
import FnNames from "consts/FnNames";

class CtrStealCoin extends Action {

    constructor(coiner, coin, posX) {

        super(FnNames.ACT_STEAL_COINS);

        this.coiner = coiner;
        this.sprite = coiner.getSprite();
        this.scene = this.sprite.scene;

        this.coinSprite = coin;
        this.dropPoint = posX;
    }

    subclassUpdate(time, delta) {

        let top = this.sprite.getLeftCenter();
        this.coinSprite.setX(top.x);

        let dir = this.dropPoint > this.sprite.x ? 1 : -1;
        let speed = this.coiner.calcVelocityX() * dir;
        this.sprite.setVelocityX(speed);

        if (this.sprite.getBounds().contains(this.dropPoint, this.sprite.y)) {
            this.sprite.setVelocity(0, -32);
            this.scene.dropCoin(this.coinSprite, this.dropPoint);
            this.setComplete();
        }

        if (!this.coinSprite.active || !this.coinSprite.visible)
            this.setComplete();
    }
}
export default CtrStealCoin;