import Buildings from "consts/Buildings";
import States from "consts/States";
import WorldConsts from "consts/WorldConsts";
import SpriteBuilder from "components/SpriteBuilder";
import SpritePhysics from "components/SpritePhysics";

class PlayerSpawner {
    
    constructor(scene) {
        this.scene = scene;
    }

    spawnPlayer() {

        let home = this.scene.getBuilding(Buildings.PLAYER_HOUSE);

        let player = SpriteBuilder.GetPlayerSprite();
        player.setPosition(home.worldX, WorldConsts.GROUND_Y - 16);
        player.setState(States.MODE_HUNT);

        this.scene.addSpriteToSceneAndGroups(
            player,
            this.scene.spriteUpdateGroup,
            this.scene.collisionGroupPlayers
        );
        SpritePhysics.AddPhysics(player);

        this.scene.addPlayerControls(player);
        player.updateCollision();

        return player;
    }

    spawnCollector() {

        let player = this.scene.player;

        let collector = SpriteBuilder.GetCollectorSprite();
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