import Base from "../classes/Base";
import SpriteGenerator from "../components/SpriteBuilder";
import WorldConsts from "../consts/WorldConsts";
import config from "./player-config";
import PlayerController from "./PlayerController";
import Playerviewer from "./PlayerViewer";

class Player extends Base {

    constructor(scene) {
        super(scene);
        this.config = config;
        this.sprite = SpriteGenerator.SpawnPlayerSprite(scene, config.texture);
        this.controller = new PlayerController(this);
        this.viewer = new Playerviewer(this);
    }

    init() {
        super.init();
        this.sprite.setPosition(200, WorldConsts.GROUND_Y - 32);
    }
}
export default Player;