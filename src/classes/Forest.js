import WorldConsts from "../consts/WorldConsts";
import ForestLayer from "./ForestLayer";

class Forest {

    constructor() {
        this.layers = [];
    }

    static New() { return new Forest() }

    addLayer(plantTypes, depth) {

        let layer = new ForestLayer(depth);
        layer.setPlantTypes(plantTypes);
        layer.setSize(this.size);
        layer.setTileX(this.tile);

        this.layers.push(layer);

        return this;
    }

    setTileX(tile) {
        this.tile = tile;
        this.worldX = (tile * WorldConsts.TILE_WIDTH);
        return this;
    }

    setSize(size) {
        this.size = size;
        return this;
    }

    setWorldX(x) {
        // Offset the forest manually
        return this;
    }

    getCenterX() {
        return (this.tile + Math.floor(this.size * .5)) * WorldConsts.TILE_WIDTH;
    }

}
export default Forest;