import BaseController from "../classes/BaseController";
import WorldConsts from "../consts/WorldConsts";

class FlyerController extends BaseController {

    constructor(prey) {
        super(prey);
        this.addFlying();
        this.addLocalMovement();
    }

    addFlying() {

        const VARIATION = Phaser.Math.Between(-10, 10);
        const LIFT = 250;
        const FALL = 20;

        let fn = function(time, delta) {
            if (this.body.velocity.y > FALL)
                this.setAccelerationY(-(LIFT + VARIATION))
            if (this.y < WorldConsts.FLYING_HEIGHT_MID_Y + VARIATION)
                this.setAccelerationY(0);
        }

        this.addUpdaterBindSprite(fn);
        
    }

    addLocalMovement() {
        
        const START_X = this.sprite.x;
        const DIST_MAX = 24;
        const ZONE_L = START_X - DIST_MAX;
        const ZONE_R = START_X + DIST_MAX;

        const VARY = Phaser.Math.Between(-10, 10);
        const SPEED = WorldConsts.BASE_MOVE_SPEED * this.stats.relativeSpeed;

        const fn = function(time, delta) {
            if (this.x > ZONE_R)
                this.setAccelerationX(-SPEED);
            if (this.x < ZONE_L)
                this.setAccelerationX(SPEED);
        }
        this.addUpdaterBindSprite(fn);

        this.sprite.body.setMaxSpeed(SPEED);
    }
}
export default FlyerController;