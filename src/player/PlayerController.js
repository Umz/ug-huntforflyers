import WorldConsts from "../WorldConsts";

class PlayerController {

    constructor(player) {
        this.player = player;
        this.sprite = player.sprite;

        this.stats = this.player.stats;
    }

    moveLeft() {
        this.sprite.setVelocityX(-this.velocityX);
    }

    moveRight() {
        this.sprite.setVelocityX(this.velocityX);
    }

    doAction() {
        console.log('Player Controller Action')
    }

    get velocityX() { return WorldConsts.BASE_MOVE_SPEED * this.player.stats.speed }
}
export default PlayerController;