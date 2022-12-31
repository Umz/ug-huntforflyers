import Action from "../classes/Action";
import FnNames from "../consts/FnNames";
import WorldConsts from "../consts/WorldConsts";

class CtrEnemyFly extends Action {
    constructor(sprite) {
        super(FnNames.ACT_ENEMY_FLY);
        this.sprite = sprite;
        this.body = sprite.body;
        this.variation = Phaser.Math.Between(-5, 5);
    }
    
    subclassUpdate(time, delta) {
        const LIFT = 200;
        const FALL = 20;
        if (this.body.velocity.y >= FALL)
            this.sprite.setAccelerationY(-(LIFT + this.variation))
        if (this.sprite.y <= WorldConsts.FLYING_HEIGHT_HIGH_Y + this.variation)
            this.sprite.setAccelerationY(-120);
    }
}
export default CtrEnemyFly;