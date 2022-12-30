import Depths from "../consts/Depths";

class SpriteBuilder {

    static GetPlayerSprite(scene, model) {
        let sprite = scene.physics.add.sprite(-100, -100, model.frame).setDepth(Depths.PLAYERS);
        return sprite;
    }

    static GetCollectorSprite(scene, model) {
        let sprite = scene.physics.add.sprite(-100, -100, model.atlas, model.frame).setDepth(Depths.PLAYER_TEAM);
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
}
export default SpriteBuilder;