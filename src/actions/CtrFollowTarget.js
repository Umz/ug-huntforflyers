import Action from "../classes/Action";
import FnNames from "../consts/FnNames";
import WorldConsts from "../consts/WorldConsts";

class CtrFollowTarget extends Action {

    constructor(sprite, target) {
        super(FnNames.ACT_FOLLOW_TARGET);
        this.sprite = sprite;
        this.target = target;
        this.tiles = 1;
    }

    subclassUpdate(time, delta) {

        let velX = this.sprite.parent.calcVelocityX();
        let dir = this.target.x > this.sprite.x ? 1 : -1;
        let vel = velX * dir;

        let dist = Math.abs(this.sprite.x - this.target.x);
        console.log(vel)
        if (dist > WorldConsts.TILE_WIDTH * this.tiles)
            this.sprite.setVelocityX(vel);
        else
            this.sprite.setVelocityX(this.sprite.body.velocity.x * .95);
    }

    setDistance(tiles) {
        this.tiles = tiles;
        return this;
    }
}
export default CtrFollowTarget;