import BaseSprite from "classes/BaseSprite";
import PaleKinModel from "models/PaleKinModel";
import PaleKinCtrl from "./PaleKinCtrl";
import PaleKinView from "./PaleKinView";
import CivilianView from "../civilian/CivilianView";

class PaleKin extends BaseSprite {

    constructor(scene, x, y, atlas, frame) {
        super(scene, x, y, atlas, frame);

        this.setModel(PaleKinModel);
        this.setView(new PaleKinView(this));
        this.setController(new PaleKinCtrl(this));

        //  Start as a civilian

        this.civView = new CivilianView(this);
        this.civView.clearAllActions();
    }

    setKinSkin() {
        this.civView.setKinSkin(this.model);
    }

    setPaleKinSkin() {
        this.view.setSkin();
    }

    // VIEW does tint, update animation (tween shrink, change, grow), untint
    // UPDATE collision size
}
export default PaleKin;