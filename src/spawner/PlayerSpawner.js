import Buildings from "consts/Buildings";
import States from "consts/States";
import WorldConsts from "consts/WorldConsts";
import Player from "characters/player/Player";
import CollectorModel from "models/CollectorModel";
import SpriteBuilder from "components/SpriteBuilder";
import SpritePhysics from "components/SpritePhysics";

class PlayerSpawner {
    
    constructor(scene) {
        this.scene = scene;
    }

    spawnPlayer() {

        let home = this.scene.getBuilding(Buildings.PLAYER_HOUSE);

        let player = new Player(this.scene)
        player.init();
        player.setPosition(home.worldX, WorldConsts.GROUND_Y - 32);
        player.setState(States.HUNTING);
        player.updateCollision();

        this.scene.addPlayerToGroups(player.getSprite());
        this.scene.addGroundPhysics(player.getSprite());
        this.scene.addPlayerControls(player);

        return player;
    }

    spawnCollector() {

        let player = this.scene.player;

        let collector = SpriteBuilder.GetCollectorSprite(this.scene, CollectorModel);
        collector.setPosition(player.x - Phaser.Math.Between(16, 32), WorldConsts.GROUND_Y - 16);

        this.scene.addSpriteToSceneAndGroups(
            collector,
            this.scene.spriteUpdateGroup,
            this.scene.collisionGroupCollectors,
        );
        SpritePhysics.AddPhysics(collector);

        return collector;
    }

}
export default PlayerSpawner;