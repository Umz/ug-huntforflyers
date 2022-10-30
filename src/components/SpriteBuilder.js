class SpriteGenerator {

    constructor(scene) {
        this.scene = scene;
    }

    static spawnPlayerSprite(scene, atlas) {
        let sprite = scene.physics.add.sprite(200, 300, atlas);
        return sprite;
    }

    static addPhysics(sprite) {
        sprite.setBounce(.1).setDrag(.05, 0).setCollideWorldBounds(true);
        sprite.body.setGravity(0, 150);
        sprite.body.useDamping = true;
    }
}
export default SpriteGenerator;