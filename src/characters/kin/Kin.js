import BaseSprite from "classes/BaseSprite";
import States from "consts/States";
import KinCtrl from "./KinCtrl";
import PaleKinModel from "models/PaleKinModel";
import PaleKinCtrl from "./PaleKinCtrl";
import PaleKinView from "./PaleKinView";
import CivilianView from "../civilian/CivilianView";
import CarryKinModel from "models/CarryKinModel";
import CarryKinCtrl from "./CarryKinCtrl";
import CarryKinView from "./CarryKinView";

class Kin extends BaseSprite {

    constructor(scene, x, y, atlas, frame) {
        super(scene, x, y, atlas, frame);

        this.setModel(PaleKinModel);
        this.setView(new CivilianView(this));
        this.setController(new KinCtrl(this));
    }

    setKinType(type) {

        this.clearAll();

        switch (type) {
            case States.MODE_PALEKIN:
                this.setPaleKin();
            break;
            case States.MODE_CARRYKIN:
                this.setCarryKin();
            break;
        }

        this.view.setSkin();
    }

    clearAll() {
        this.view.clearAllActions();
        this.controller.clearAllActions();
    }

    setKinSkin() {
        this.view.setKinSkin(this.model);
    }

    setPaleKin() {
        this.setView(new PaleKinView(this));
        this.setController(new PaleKinCtrl(this));
    }

    setCarryKin() {
        this.setModel(CarryKinModel);
        this.setView(new CarryKinView(this));
        this.setController(new CarryKinCtrl(this));
    }
}
export default Kin;