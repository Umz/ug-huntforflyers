import Base from "../classes/Base";
import SpriteBulider from "../components/SpriteBuilder";
import States from "../consts/States";
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

    hit() {
        this.setState(States.CRASHING);
        this.controller.setToCrash();
    }
}
export default Enemy;