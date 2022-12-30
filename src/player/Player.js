import Base from "../classes/Base";
import SpriteBuilder from "../components/SpriteBuilder";
import States from "../consts/States";
import PlayerController from "./PlayerController";
import PlayerModel from "../models/PlayerModel";
import Playerviewer from "./PlayerViewer";

class Player extends Base {

    constructor(scene) {
        super(scene, PlayerModel);
        this.sprite = SpriteBuilder.GetPlayerSprite(scene, PlayerModel);
        this.controller = new PlayerController(this);
        this.viewer = new Playerviewer(this);
    }

    fireBullet() {
        this.controller.moveRecoil();
        this.viewer.showFireAnimation();
        this.setState(States.FIRING);
    }
}
export default Player;