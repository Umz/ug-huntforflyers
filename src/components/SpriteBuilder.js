import Depths from "../consts/Depths";

class SpriteBuilder {

    static GetPlayerSprite(scene, model) {
        let sprite = scene.physics.add.sprite(-100, -100, model.frame).setDepth(Depths.PLAYERS);
        return sprite;
    }

    static GetFlyingEnemySprite(scene, model) {
        let sprite = scene.physics.add.sprite(-100, -100, model.atlas, model.frame).setDepth(Depths.ENEMIES_SPAWNED);
        return sprite;
    }

    //  Extract below 

    static addPhysics(sprite) {
        sprite.setBounce(.1).setDrag(.03, 0).setCollideWorldBounds(true);
        sprite.body.setGravity(0, 150);
        sprite.body.useDamping = true;
    }

    static addFlightPhysics(sprite) {
        sprite.setCollideWorldBounds(true);
        sprite.body.setGravity(0, 150);
    }

    static addGroundDrag(sprite) {
        sprite.setDrag(.03, 0);
        sprite.body.useDamping = true;
    }
}
export default SpriteBuilder;