import BaseSprite from "classes/BaseSprite";
import States from "consts/States";
import PlayerModel from "models/PlayerModel";
import PlayerController from "./PlayerController";
import Playerviewer from "./PlayerViewer";

class Player extends BaseSprite {

    constructor(scene, x, y, atlas, frame) {
        super(scene, x, y, atlas, frame);

        this.listenForSpeech = false;

        this.setModel(PlayerModel);
        this.setView(new Playerviewer(this));
        this.setController(new PlayerController(this));
    }

    fireBullet() {
        this.controller.fireAction();
        this.view.showFireAnimation();
    }

    canFire() {
        return (this.isState(States.MODE_HUNT) || this.isState(States.MODE_CANNON)) && this.controller.isFireReady;
    }

    setListeningForInteraction(b) {
        this.listenForSpeech = b;
    }

    isListeningForInteraction() {
        return this.listenForSpeech;
    }

    updateCollision() {
        let isColliding = this.isState(States.MODE_TANK);
        this.body.checkCollision.left = isColliding;
        this.body.checkCollision.right = isColliding;
        this.body.checkCollision.up = false;
    }

    nextState() {
        
        let playerStates = [
            States.MODE_HUNT,
            States.MODE_CANNON,
            States.MODE_TANK
        ];

        let state = this.getState();
        let index = playerStates.findIndex(s => s === state);
        let nextIndex = index === playerStates.length - 1 ? 0 : index + 1;

        this.setState(playerStates[nextIndex]);
    }

    updateAnimation() {
        this.view.updateAnimation();
    }

    getStateName(state) {
        switch (state) {
            case States.MODE_HUNT: return "Hunt";
            case States.MODE_CANNON: return "Cannon";
            case States.MODE_TANK: return "Tank";
            default: return "Idle";
        }
    }
}
export default Player;