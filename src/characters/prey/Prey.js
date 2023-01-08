import Base from "classes/Base";
import States from "consts/States";
import SpriteBuilder from "components/SpriteBuilder";
import FlyerController from "./FlyerController";
import Flyerviewer from "./FlyerViewer";

class Prey extends Base {

    constructor(scene, model) {
        super(scene);

        this.model = model;
        this.sprite = SpriteBuilder.GetFlyingEnemySprite(scene, model);
        this.controller = new FlyerController(this);
        this.view = new Flyerviewer(this);
    }

    init() {
        super.init();

        this.sprite.setAccelerationX(Phaser.Math.Between(100, 200));
        this.sprite.setX(this.sprite.x + Phaser.Math.Between(-50, 50))
        this.sprite.setY(this.sprite.y - Phaser.Math.Between(0, 25))
        this.sprite.freeze = this.freeze;

        this.setState(States.JUST_SPAWNED);
    }

    freeze() {
        this.setAcceleration(0);
        this.setVelocity(0);
        //this.setTintFill(this.parent.getTint());
        this.setTint(this.parent.getTint());
        this.setActive(false);
        this.parent.setState(States.FROZEN);
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