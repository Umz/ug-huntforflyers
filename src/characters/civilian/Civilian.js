import Base from "classes/Base";
import SpriteBulider from "components/SpriteBuilder";
import CivilianModel from "models/CivilianModel";
import CivilianCtrl from "./CivilianCtrl";
import CollectorView from "./CollectorView";

class Civilian extends Base {

    constructor(scene) {
        super(scene, CivilianModel);
        this.sprite = SpriteBulider.GetCivilianSprite(scene, CivilianModel);
        this.controller = new CivilianCtrl(this);
        this.view = new CollectorView(this);
    }

    setHome(buildingData) {
        this.homeData = buildingData;
    }
}
export default Civilian;