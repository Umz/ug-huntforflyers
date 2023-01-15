import Action from "classes/Action";
import Actions from "consts/Actions";
import WorldConsts from "consts/WorldConsts";

class CtrPreyLocalFlight extends Action {

    constructor(sprite) {
        super(Actions.ACT_PREY_LOCAL_X);
        this.sprite = sprite;
        this.sprite.body.setMaxSpeed(this.sprite.getSpeed());
    }

    subclassUpdate(time, delta) {

        let speed = this.sprite.getSpeed();
        const INIT = speed * (Math.random() > .5 ? 1 : -1);
        const DIST_MAX = Phaser.Math.Between(24, 42);

        const VARIATION = Phaser.Math.Between(-10, 10);
        const LIFT = 250;
        const FALL = 20;

        const HOME_X = this.sprite.getHomeX();
        const ZONE_L = HOME_X - DIST_MAX;
        const ZONE_R = HOME_X + DIST_MAX;

        if (this.sprite.x > ZONE_R)
            this.sprite.setAccelerationX(-speed);
        if (this.sprite.x < ZONE_L)
            this.sprite.setAccelerationX(speed);
        if (this.sprite.velocityX === 0 && this.sprite.body.acceleration.x === 0)
            this.sprite.setAccelerationX(INIT);
    }
}
export default CtrPreyLocalFlight;