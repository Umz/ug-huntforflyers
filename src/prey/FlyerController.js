import BaseController from "../classes/BaseController";
import WorldConsts from "../consts/WorldConsts";

class FlyerController extends BaseController {

    constructor(prey) {
        super(prey);

        //  Initial launch - remove this contrller

        this.addStateController();
        this.addFlying();
        this.addLocalMovement();
    }

    addStateController() {
        let fn = function(time, delta) {
        }
        this.addUpdateFn('state', fn);
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
        this.addUpdateFnAndBindToSprite('flying', fn);
    }

    addLocalMovement() {
        
        const SPEED = WorldConsts.BASE_MOVE_SPEED * this.stats.relativeSpeed;
        const INIT = SPEED * (Math.random() > .5 ? 1 : -1);
        const DIST_MAX = Phaser.Math.Between(24, 42);

        this.sprite.body.setMaxSpeed(SPEED);

        const fn = function(time, delta) {

            const HOME_X = this.parent.getHomeX();
            const ZONE_L = HOME_X - DIST_MAX;
            const ZONE_R = HOME_X + DIST_MAX;
    
            if (this.x > ZONE_R)
                this.setAccelerationX(-SPEED);
            if (this.x < ZONE_L)
                this.setAccelerationX(SPEED);
            if (this.body.velocity.x === 0 && this.body.acceleration.x === 0)
                this.setAccelerationX(INIT);
        }
        this.addUpdateFnAndBindToSprite('localX', fn);
    }
}
export default FlyerController;