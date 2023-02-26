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
        this.setView(new CivilianView(this));
        this.setController(new KinCtrl(this));
    }

    setKinSkin() {
        this.view.setKinSkin(this.model);
    }

    setPaleKin() {
        this.view.clearAllActions();

        this.setView(new PaleKinView(this));
        this.setController(new PaleKinCtrl(this));
        this.view.setSkin();
    }
}
export default PaleKin;