import BaseController from "classes/BaseController";
import ViewDirection from "actions/ViewDirection";
import ViewRunIdle from "actions/ViewRunIdle";

class CivilianView extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.model = sprite.model;
        this.addDirectionTracking();
        this.addAnimationListener();
    }

    addDirectionTracking() {
        this.addAction(new ViewDirection(this.sprite));
    }

    addAnimationListener() {
        this.addAction(new ViewRunIdle(this.sprite));
    }

    setSkin(skin) {

        this.model.idle = skin.idle;
        this.model.run = skin.run;

        let frame = `spr_${skin.idle}1`;
        let textureFrame = this.scene.textures.getFrame('sprites', frame);

        this.sprite.setFrame(frame);
        this.sprite.setSize(textureFrame.width, textureFrame.height);
        this.sprite.refreshBody();
    }

    setMaleSkin() {
        let skins = this.model.skins.male;
        let skin = skins.muslim1;
        
        this.setSkin(skin);
    }

    setFemaleSkin() {

        let skins = this.model.skins.female;
        let options = Object.entries(skins)
        
        let pick = Phaser.Utils.Array.GetRandom(options);
        let skin = pick[1];
        
        this.setSkin(skin);
    }
}
export default CivilianView;