import Action from "classes/Action";
import FnNames from "consts/FnNames";

class CtrFindCoin extends Action {

    constructor(sprite) {
        super(FnNames.ACT_FIND_COINS);

        this.sprite = sprite;
        this.scene = sprite.scene;

        this.init = true;
    }

    subclassUpdate(time, delta) {

        if (this.target) {

            let speed = Math.round(this.sprite.velocityY) !== 0 ? 0 : this.sprite.getSpeed();
            let dir = this.target.x > this.sprite.x ? 1 : -1;
            this.sprite.setVelocityX(speed * dir);

            if (this.sprite.getBounds().contains(this.target.x, this.target.y)) {
                this.sprite.setVelocity(0, -40);
                this.setComplete();
            }

            if (!this.target.active || this.target.claimed)
                this.target = null;
        }
        else {
            this.target = this.scene.getClosestCoin(this.sprite);
            this.sprite.setVelocityX(0);
        }

        //  Initial Jump
        if (this.init) {
            this.sprite.setVelocityY(-32);
            this.init = false;
        }
    }
}
export default CtrFindCoin;