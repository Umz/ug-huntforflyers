import CollectorModel from "models/CollectorModel";
import BaseSprite from "classes/BaseSprite";
import CollectorCtrl from "./CollectorCtrl";
import CollectorView from "./CollectorView";

class Collector extends BaseSprite {

    constructor(scene, x, y, atlas, frame) {
        super(scene, x, y, atlas, frame);

        this.setModel(CollectorModel);
        this.setView(new CollectorView(this));
        this.setController(new CollectorCtrl(this));
    }
}
export default Collector;