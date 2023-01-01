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
        if (this.body.velocity.y >= FALL) {
            this.sprite.setAccelerationY(-(LIFT + this.variation));
            this.sprite.setVelocityY(this.sprite.body.velocity.y * .95);
        }
        if (this.sprite.y <= WorldConsts.FLYING_HEIGHT_HIGH_Y + this.variation)
            this.sprite.setAccelerationY(-50);
        if (this.sprite.y <= 0 && this.body.velocity.y <= 0) {
            this.sprite.setVelocityY(0);
            this.sprite.setAccelerationY(0);
        }
    }
}
export default CtrEnemyFly;