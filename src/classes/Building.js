import WorldConsts from "../consts/WorldConsts";

class Building {

    constructor(type) {
        this.type = type;
        this.alpha = 1;
    }

    static New(type) { return new Building(type) }

    setAlpha(alpha) { this.alpha = alpha; return this }
    setType(type) { this.type = type; return this }
    setDepth(depth) { this.depth = depth; return this }
    setTileX(tile) { 
        this.tile = tile; 
        this.worldX = tile * WorldConsts.TILE_WIDTH;
        return this;
    }
    
}
export default Building;