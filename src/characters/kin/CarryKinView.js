import BaseController from "classes/BaseController";
import ViewDirection from "actions/ViewDirection";
import ViewCollectorAnim from "actions/ViewCollectorAnim";

class CarryKinView extends BaseController {

    constructor(target) {
        super(target);
        this.addDirectionTracking();
        this.addAnimations();
    }

    addDirectionTracking() {
        this.addAction(new ViewDirection(this.sprite));
    }

    addAnimations() {
        this.addAction(new ViewCollectorAnim(this.sprite));
    }

    setSkin() {

        this.clearAllActions();
        this.sprite.flash(0xFFFFFF, 700);

        this.scene.add.tween({
            targets: this.sprite,
            duration: 300,
            scaleX: {from:1, to:2},
            scaleY: {from:1, to:2},
            yoyo: true,
            onComplete:()=>{

                let model = this.sprite.model;
                let textureFrame = this.scene.textures.getFrame('sprites', model.frame);

                this.sprite.setFrame(model.frame);
                this.sprite.setSize(textureFrame.width, textureFrame.height);
                this.sprite.refreshBody();

                this.addDirectionTracking();
                this.addAnimations();
            }
        });
    }
}
export default CarryKinView;