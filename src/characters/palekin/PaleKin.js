import BaseSprite from "classes/BaseSprite";
import PaleKinModel from "models/PaleKinModel";
import PaleKinCtrl from "./PaleKinCtrl";
import KinCtrl from "./KinCtrl";
import PaleKinView from "./PaleKinView";
import CivilianView from "../civilian/CivilianView";

class PaleKin extends BaseSprite {

    constructor(scene, x, y, atlas, frame) {
        super(scene, x, y, atlas, frame);

        this.setModel(PaleKinModel);
        this.setView(new PaleKinView(this));
        this.setController(new KinCtrl(this));

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
}
export default PaleKin;