import Base from "../classes/Base";
import SpriteGenerator from "../components/SpriteBuilder";
import PlayerController from "./PlayerController";
import PlayerModel from "../models/PlayerModel";
import Playerviewer from "./PlayerViewer";

class Player extends Base {

    constructor(scene) {
        super(scene, PlayerModel);
        this.sprite = SpriteGenerator.GetPlayerSprite(scene, PlayerModel);
        this.controller = new PlayerController(this);
        this.viewer = new Playerviewer(this);
    }

    setPosition(x, y) { this.sprite.setPosition(x,y) }
}
export default Player;