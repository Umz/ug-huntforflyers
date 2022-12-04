import Depths from "../consts/Depths";

class SpriteBuilder {

    static GetPlayerSprite(scene, atlas) {
        let sprite = scene.physics.add.sprite(-100, -100, atlas).setDepth(Depths.PLAYERS);
        return sprite;
    }

    static GetFlyingEnemySprite(scene, config) {
        let sprite = scene.physics.add.sprite(-100, -100, config.atlas, config.frame).setDepth(Depths.ENEMIES_SPAWNED);
        return sprite;
    }

    //  Extract below 

    static addPhysics(sprite) {
        sprite.setBounce(.1).setDrag(.05, 0).setCollideWorldBounds(true);
        sprite.body.setGravity(0, 150);
        sprite.body.useDamping = true;
    }

    static addFlightPhysics(sprite) {
        sprite.setCollideWorldBounds(true);
        sprite.body.setGravity(0, 150);
    }
}
export default SpriteBuilder;