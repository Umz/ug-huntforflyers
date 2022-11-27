import WorldConsts from "../consts/WorldConsts";

class Building {

    constructor(type) {
        this.type = type;
    }

    static New(type) { return new Building(type) }

    setType(type) { this.type = type; return this }
    setDepth(depth) { this.depth = depth; return this }
    setTileX(tile) { 
        this.tile = tile; 
        this.worldX = tile * WorldConsts.TILE_WIDTH;
        return this;
    }
    
}
export default Building;