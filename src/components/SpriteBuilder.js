import Collector from "characters/collector/Collector";
import Depths from "consts/Depths";

class SpriteBuilder {

    static GetPlayerSprite(scene, model) {
        let sprite = scene.physics.add.sprite(-100, -100, model.frame).setDepth(Depths.PLAYERS);
        sprite.setSize(20, 28);
        return sprite;
    }

    static GetCollectorSprite(model) {
        let sprite = new Collector(SpriteBuilder.scene, -100, -100, model.atlas, model.frame);
        sprite.setDepth(Depths.PLAYER_TEAM);
        return sprite;
    }

    static GetCivilianSprite(scene, model) {
        let sprite = scene.physics.add.sprite(-100, -100, model.atlas, model.frame).setDepth(Depths.CIVILIANS);
        return sprite;
    }

    static GetFlyingEnemySprite(scene, model) {
        let sprite = scene.physics.add.sprite(-100, -100, model.atlas, model.frame).setDepth(Depths.ENEMIES_SPAWNED);
        return sprite;
    }

    static GetThiefSprite(scene, model) {
        let sprite = scene.physics.add.sprite(-100, -100, model.atlas, model.frame).setDepth(Depths.ENEMIES);
        return sprite;
    }
}
export default SpriteBuilder;