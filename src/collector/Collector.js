import Base from "../classes/Base";
import SpriteBulider from "../components/SpriteBuilder";
import States from "../consts/States";
import CollectorModel from "../models/CollectorModel";
import CollectorCtrl from "./CollectorCtrl";
import CollectorView from "./CollectorView";

class Collector extends Base {

    constructor(scene) {
        super(scene, CollectorModel);
        this.sprite = SpriteBulider.GetCollectorSprite(scene, CollectorModel);
        this.controller = new CollectorCtrl(this);
        this.view = new CollectorView(this);
    }

    setToCollect(sprite) {
        this.setState(States.TO_COLLECT);
        this.controller.setToCollect(sprite);
    }

    setTrackedSprite(sprite) {
        this.trackedSprite = sprite;
    }
    getTrackedSprite() {
        return this.trackedSprite;
    }
}
export default Collector;