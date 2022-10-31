import SpriteGenerator from "../components/SpriteBuilder";
import FlyerController from "./FlyerController";
import prey_config from "./prey-config";

class Prey {

    constructor(scene) {
        this.config = prey_config;
        this.sprite = SpriteGenerator.spawnFlyingSprite(scene, 'fairy1');
        this.controller = new FlyerController(this);
    }

    get stats() {
        return {
            speed: 1
        }
    }
}
export default Prey;