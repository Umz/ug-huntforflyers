import Action from "classes/Action";
import FnNames from "consts/FnNames";

class CtrFindCoin extends Action {

    constructor(coiner) {
        super(FnNames.ACT_FIND_COINS);

        this.coiner = coiner;
        this.sprite = coiner.getSprite();
        this.scene = this.sprite.scene;

        this.init = true;
    }

    subclassUpdate(time, delta) {

        if (this.target) {

            let speed = Math.round(this.velY) !== 0 ? 0 : this.coiner.calcVelocityX();
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
            this.sprite.setVelocityY(-48);
            this.init = false;
        }
    }

    get velY() { return this.sprite.body.velocity.y }
}
export default CtrFindCoin;