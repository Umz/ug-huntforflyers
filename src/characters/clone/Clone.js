import BaseSprite from "classes/BaseSprite";
import CloneModel from "../../models/CloneModel";
import CloneCtrl from "./CloneCtrl";
import CloneView from "./CloneView";

class Clone extends BaseSprite {

    constructor(scene, x, y, atlas, frame) {
        super(scene, x, y, atlas, frame);

        this.setModel(CloneModel);
        this.setView(new CloneView(this));
        this.setController(new CloneCtrl(this));
    }
}
export default Clone;