class SpritePhysics {

    static AddPhysics(sprite) {
        sprite.setBounce(.1).setDrag(.03, 0).setCollideWorldBounds(true);
        sprite.body.setGravity(0, 150);
        sprite.body.useDamping = true;
    }

    static AddFlightPhysics(sprite) {
        sprite.setCollideWorldBounds(true);
        sprite.body.setGravity(0, 150);
    }

    static AddGroundDrag(sprite) {
        sprite.setDrag(.03, 0);
        sprite.body.useDamping = true;
    }
}
export default SpritePhysics;