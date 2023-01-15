import Action from "../classes/Action";
import Buildings from "../consts/Buildings";
import Actions from "../consts/Actions";
import States from "../consts/States";

class CtrCarryPreyHome extends Action {

    constructor(sprite, preySprite) {
        super(Actions.ACT_CARRY_PREY_HOME);

        this.sprite = sprite;
        this.prey = preySprite.parent;
        this.preySprite = preySprite;
        this.scene = sprite.scene;

        this.sprite.setState(States.CARRYING);
    }

    subclassUpdate(time, delta) {

        this.moveTowardCollectionPoint();
        this.carryPrey();
        
        if (!this.prey.isStateEquals(States.CARRIED)) {
            this.sprite.setVelocity(0);
            this.sprite.setState(States.NORMAL);
            this.setComplete();
        }
    }
    
    moveTowardCollectionPoint() {
        let collectPoint = this.scene.getBuilding(Buildings.WATER_PUMP);
        let dir = collectPoint.worldX > this.sprite.x ? 1 : -1;
        let vel = this.sprite.getSpeed() * dir;
        this.sprite.setVelocityX(vel);
    }

    carryPrey() {
        let carryPoint = this.sprite.getTopCenter();
        this.prey.setPosition(carryPoint.x, carryPoint.y - 4);
    }
}
export default CtrCarryPreyHome;