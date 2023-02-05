import WorldConsts from "../consts/WorldConsts";

class Building {

    constructor(type) {
        this.type = type;
        this.alpha = 1;
        this.complete = Phaser.Math.Between(1, 10) *.01;
        //this.complete = 1;
    }

    static New(type) { return new Building(type) }

    setAlpha(alpha) { this.alpha = alpha; return this }
    setType(type) { this.type = type; return this }
    setDepth(depth) { this.depth = depth; return this }
    setComplete(percent) { this.complete = percent; return this }
    setTileX(tile) { 
        this.tile = tile; 
        this.worldX = tile * WorldConsts.TILE_WIDTH;
        return this;
    }

    setSign(message) {
        this.name = "Sign";
        this.message = message;
        this.className = "plain-message";
        return this;
    }

    isTypeEquals(type) { return this.type === type }
}
export default Building;