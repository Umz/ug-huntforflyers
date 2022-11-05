import Base from "../classes/Base";
import SpriteGenerator from "../components/SpriteBuilder";
import FlyerController from "./FlyerController";
import Flyerviewer from "./FlyerViewer";
import prey_config from "./prey-config";

class Prey extends Base {

    constructor(scene) {
        super(scene);

        this.config = prey_config;
        this.sprite = SpriteGenerator.spawnFlyingSprite(scene, 'bird1');
        this.controller = new FlyerController(this);
        this.view = new Flyerviewer(this);
    }

    init() {
        super.init();
        this.sprite.setAccelerationX(Phaser.Math.Between(100, 200));
        this.sprite.setX(this.sprite.x + Phaser.Math.Between(-50, 50))
        this.sprite.setY(this.sprite.y - Phaser.Math.Between(0, 25))
        this.sprite.freeze = this.freeze;
    }

    freeze() {
        this.setAcceleration(0);
        this.setVelocity(0);
        this.setTintFill(0xFFFFFF);
        this.setActive(false);
    }
}
export default Prey;