import SpriteGenerator from "../components/SpriteBuilder";
import config from "./player-config";
import PlayerController from "./PlayerController";

class Player {

    constructor(scene) {
        this.config = config;
        this.sprite = SpriteGenerator.spawnPlayerSprite(scene, config.texture);
        this.controller = new PlayerController(this);
    }

    get stats() {
        return {
            speed: this.config.speed
        }
    }
}
export default Player;