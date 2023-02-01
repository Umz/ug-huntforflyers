import WorldConsts from "../consts/WorldConsts";

class SpritePhysics {

    static AddPhysics(sprite) {
        sprite.setBounce(.1).setDrag(.01, 0).setCollideWorldBounds(true);
        sprite.body.setGravity(0, WorldConsts.GRAVITY);
        sprite.body.useDamping = true;
    }

    static AddFlightPhysics(sprite) {
        sprite.setCollideWorldBounds(true);
        sprite.body.setGravity(0, WorldConsts.GRAVITY);
    }

    static AddFlightPhysicsNoBounds(sprite) {
        sprite.body.setGravity(0, WorldConsts.GRAVITY);
    }

    static AddGroundDrag(sprite) {
        sprite.setDrag(.03, 0);
        sprite.body.useDamping = true;
    }
}
export default SpritePhysics;