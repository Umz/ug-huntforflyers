import BaseSprite from "classes/BaseSprite";
import CivilianModel from "models/CivilianModel";
import CivilianCtrl from "./CivilianCtrl";
import CivilianView from "./CivilianView";

class Civilian extends BaseSprite {

    constructor(scene, x, y, atlas, frame) {
        super(scene, x, y, atlas, frame);
        
        this.setModel(CivilianModel)
        this.setView(new CivilianView(this));
        this.setController(new CivilianCtrl(this));
    }

    setHome(buildingData) {
        this.homeData = buildingData;
    }

    getHomeX() {
        return this.homeData.worldX;
    }
}
export default Civilian;