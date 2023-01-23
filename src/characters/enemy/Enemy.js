import BaseSprite from "classes/BaseSprite";
import States from "consts/States";

class Enemy extends BaseSprite {

    constructor(scene, x, y, atlas, frame) {
        super(scene, x, y, atlas, frame);
    }
}
export default Enemy;