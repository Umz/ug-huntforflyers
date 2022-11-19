class SpriteBuilder {

    constructor(scene) {
        this.scene = scene;
    }

    static spawnPlayerSprite(scene, atlas) {
        let sprite = scene.physics.add.sprite(200, 200, atlas);
        return sprite;
    }

    static spawnFlyingSprite(scene, atlas) {
        let sprite = scene.physics.add.sprite(450, 200, atlas);
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