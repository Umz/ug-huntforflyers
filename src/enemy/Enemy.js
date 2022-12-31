import Base from "../classes/Base";
import SpriteBulider from "../components/SpriteBuilder";
import ThiefModel from "../models/ThiefModel";
import ThiefCtrl from "./ThiefCtrl";
import ThiefView from "./ThiefView";

class Enemy extends Base {

    constructor(scene) {
        super(scene, ThiefModel);
        this.sprite = SpriteBulider.GetCivilianSprite(scene, ThiefModel);
        this.controller = new ThiefCtrl(this);
        this.view = new ThiefView(this);
    }

    claimCrystal(crystal) {
        this.crystal = crystal;
    }

    hasCrystal() {
        return this.crystal;
    }
}
export default Enemy;