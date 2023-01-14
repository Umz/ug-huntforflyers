import Action from "classes/Action";
import FnNames from "consts/FnNames";
import WorldConsts from "consts/WorldConsts";

class CtrFollowSprite extends Action {

    constructor(sprite, target) {
        super(FnNames.ACT_FOLLOW_TARGET);
        this.sprite = sprite;
        this.target = target;
        this.minTileDistance = 1;
    }

    subclassUpdate(time, delta) {

        let dir = this.target.x > this.sprite.x ? 1 : -1;
        let vel = this.sprite.getSpeed() * dir;

        let dist = Math.abs(this.sprite.x - this.target.x);
        if (dist > WorldConsts.TILE_WIDTH * this.minTileDistance)
            this.sprite.setVelocityX(vel);
        else
            this.sprite.setVelocityX(this.sprite.velocityX * .95);
    }

    setDistance(tiles) {
        this.minTileDistance = tiles;
        return this;
    }
}
export default CtrFollowSprite;