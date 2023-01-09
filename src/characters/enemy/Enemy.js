import Base from "classes/Base";
import SpriteBulider from "components/SpriteBuilder";
import States from "consts/States";

class Enemy extends Base {

    constructor(scene, model) {
        super(scene, model);
        this.sprite = SpriteBulider.GetThiefSprite(scene, model);
    }

    hit() {
        this.setState(States.CRASHING);
        this.controller.setToCrash();
    }
}
export default Enemy;