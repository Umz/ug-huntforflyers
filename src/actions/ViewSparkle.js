import Action from "classes/Action";
import Actions from "consts/Actions";
import Counter from "components/Counter";

class ViewSparkle extends Action {
    
    constructor(sprite) {
        super(Actions.VIEW_SPARKLE);

        this.sprite = sprite;
        this.scene = sprite.scene;

        this.flashCount = Counter.New().setRepeating(true).setMaxCount(1500);
        this.sparkleCount = Counter.New().setRepeating(true).setMaxCount(1000);
    }

    subclassUpdate(time, delta) {
        if (this.flashCount.updateAndCheck(time, delta))
            this.flash(0xFFFFFF, 100);

        if (this.sparkleCount.updateAndCheck(time, delta)) {
            let x = Phaser.Math.Between(this.sprite.getLeftCenter().x, this.sprite.getRightCenter().x);
            let y = Phaser.Math.Between(this.sprite.getBottomCenter().y, this.sprite.getTopCenter().y);
            this.scene.fxEmitter.explode(1, x, y);
        }
    }

    flash(tint, time) {

        this.sprite.clearTint();
        this.sprite.setTintFill(tint);

        this.scene.time.addEvent({
            delay: time,
            callback: ()=>{
                this.sprite.clearTint();
                this.sprite.setTint(this.sprite.getTint());
            }
        });
    }
}
export default ViewSparkle;