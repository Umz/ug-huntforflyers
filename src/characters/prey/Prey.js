import BaseSprite from "classes/BaseSprite";
import States from "consts/States";
import Buildings from "consts/Buildings";
import SpritePhysics from "components/SpritePhysics";

class Prey extends BaseSprite {

    constructor(scene, x, y, atlas, frame) {
        super(scene, x, y, atlas, frame);
    }

    init() {
        this.setAccelerationX(Phaser.Math.Between(100, 200));
        this.setX(this.x + Phaser.Math.Between(-50, 50));
        this.setY(this.y - Phaser.Math.Between(0, 25));
        this.setState(States.JUST_SPAWNED);
    }

    freeze() {
        
        this.setAcceleration(0);
        this.setVelocity(0);
        this.setTint(this.getTint());
        this.setState(States.FROZEN);

        this.setFrozenCollision();
        SpritePhysics.AddGroundDrag(this);

        this.clearActions();
        this.view.addFlashing();
    }

    setFrozenCollision() {

        let waterPump = this.scene.getBuilding(Buildings.WATER_PUMP);

        let canPushLeft = (waterPump.worldX < this.x);
        let canPushRight = (waterPump.worldX > this.x);
        this.body.checkCollision.left = canPushRight;
        this.body.checkCollision.right = canPushLeft;
    }

    setFlyingCollision() {
        this.body.checkCollision.left = false;
        this.body.checkCollision.right = false;
    }

    setStolenCollision() {
        this.setFlyingCollision();
        this.setCollideWorldBounds(false);
    }

    setCarriedCollision() {
        this.setFlyingCollision();
    }

    setHomePoint(x, y) {
        this.setPosition(x, y);
        this.homePoint = new Phaser.Geom.Point(x, y);
    }

    getHomeX() {
        return this.homePoint.x;
    }

    getValue() {
        return this.stats.value;
    }

    getTint() {
        return this.model.tint;
    }
}
export default Prey;