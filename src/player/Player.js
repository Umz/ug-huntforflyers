import Base from "../classes/Base";
import SpriteGenerator from "../components/SpriteBuilder";
import config from "./player-config";
import PlayerController from "./PlayerController";
import Playerviewer from "./PlayerViewer";

class Player extends Base {

    constructor(scene) {
        super(scene);
        this.config = config;
        this.sprite = SpriteGenerator.spawnPlayerSprite(scene, config.texture);
        this.controller = new PlayerController(this);
        this.viewer = new Playerviewer(this);
    }
}
export default Player;