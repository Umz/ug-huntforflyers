import BaseSprite from "classes/BaseSprite";
import States from "consts/States";
import PlayerController from "./PlayerController";
import PlayerModel from "models/PlayerModel";
import Playerviewer from "./PlayerViewer";

class Player extends BaseSprite {

    constructor(scene, x, y, atlas, frame) {
        super(scene, x, y, atlas, frame);

        this.setModel(PlayerModel);
        this.setView(new Playerviewer(this));
        this.setController(new PlayerController(this));
    }

    fireBullet() {
        this.controller.moveRecoil();
        this.view.showFireAnimation();
    }

    updateCollision() {
        let isColliding = this.isState(States.PUSHING);
        this.body.checkCollision.left = isColliding;
        this.body.checkCollision.right = isColliding;
        this.body.checkCollision.up = false;
    }
}
export default Player;