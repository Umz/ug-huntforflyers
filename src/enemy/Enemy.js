import Base from "../classes/Base";
import SpriteBulider from "../components/SpriteBuilder";
import ThiefModel from "../models/ThiefModel";
import ThiefCtrl from "./ThiefCtrl";
import ThiefView from "./ThiefView";

class Enemy extends Base {

    constructor(scene) {
        super(scene, ThiefModel);
        this.sprite = SpriteBulider.GetThiefSprite(scene, ThiefModel);
        this.controller = new ThiefCtrl(this);
        this.view = new ThiefView(this);
    }
}
export default Enemy;