import BaseSprite from "classes/BaseSprite";
import PaleKinModel from "models/PaleKinModel";
import PaleKinCtrl from "./PaleKinCtrl";
import PaleKinView from "./PaleKinView";

class PaleKin extends BaseSprite {

    constructor(scene, x, y, atlas, frame) {
        super(scene, x, y, atlas, frame);

        this.setModel(PaleKinModel);
        this.setView(new PaleKinView(this));
        this.setController(new PaleKinCtrl(this));
    }

    // ADD the first sprite
    // VIEW does tint, update animation (tween shrink, change, grow), untint
    // UPDATE collision size
}
export default PaleKin;