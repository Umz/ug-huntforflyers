import Depths from "../consts/Depths";
import WorldConsts from "../consts/WorldConsts";

class ForestLayer {

    constructor(depth) {

        this.depth = depth;
        this.alpha = this.getAlpha(depth);
        this.hasTint = (this.alpha !== 1);
        this.atlas = 'background';
        this.size = 0;
        this.worldX = 0;
    }

    setSize(size) {
        this.size = (this.depth < Depths.FOREST_BG3) ? size - 2 : size;
    }

    setTileX(tile) {
        this.tile = (this.depth < Depths.FOREST_BG3) ? tile + 1 : tile;
        this.worldX = this.tile * WorldConsts.TILE_WIDTH;
    }

    setWorldX(x) {
        this.worldX = x;
    }

    setPlantTypes(types) {
        this.plantTypes = types;
    }

    getRandomFrame() {
        return Phaser.Math.RND.pick(this.plantTypes);
    }

    getAlpha(depth) {
        if (depth == Depths.FOREST_BG1) return .5;
        else if (depth == Depths.FOREST_BG2) return .7;
        else return 1;
    }
}
export default ForestLayer;