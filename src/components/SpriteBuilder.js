import Collector from "characters/collector/Collector";
import Civilian from "characters/civilian/Civilian";
import Depths from "consts/Depths";
import CollectorModel from "models/CollectorModel";
import CivilianModel from "models/CivilianModel";

class SpriteBuilder {

    static GetPlayerSprite(scene, model) {
        let sprite = scene.physics.add.sprite(-100, -100, model.frame).setDepth(Depths.PLAYERS);
        sprite.setSize(20, 28);
        return sprite;
    }

    static GetCollectorSprite() {
        return SpriteBuilder.GetSprite(Collector, CollectorModel, Depths.PLAYER_TEAM);
    }

    static GetCivilianSprite() {
        return SpriteBuilder.GetSprite(Civilian, CivilianModel, Depths.CIVILIANS);
    }

    static GetFlyingEnemySprite(scene, model) {
        let sprite = scene.physics.add.sprite(-100, -100, model.atlas, model.frame).setDepth(Depths.ENEMIES_SPAWNED);
        return sprite;
    }

    static GetThiefSprite(scene, model) {
        let sprite = scene.physics.add.sprite(-100, -100, model.atlas, model.frame).setDepth(Depths.ENEMIES);
        return sprite;
    }

    static GetSprite(ClassType, model, depth) {
        let sprite = new ClassType(SpriteBuilder.scene, -100, -100, model.atlas, model.frame);
        sprite.setDepth(depth);
        return sprite;
    }
}
export default SpriteBuilder;