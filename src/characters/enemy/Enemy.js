import BaseSprite from "classes/BaseSprite";
import States from "consts/States";

class Enemy extends BaseSprite {

    constructor(scene, x, y, atlas, frame) {
        super(scene, x, y, atlas, frame);
    }

    hit() {
        if (typeof this.controller.hit === "function") { 
            this.controller.hit();
        }
    }
}
export default Enemy;