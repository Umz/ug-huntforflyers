import WorldConsts from "../WorldConsts";

class BackgroundBuilder {

    static addHomeBase(scene, atlas) {
        let sprite = scene.physics.add.sprite(200, 200, atlas);
        return sprite;
    }

    static addBackgroundScene(scene) {
        for (let i=0; i<5; i++)
            scene.add.tileSprite(0, 0, WorldConsts.WIDTH, WorldConsts.HEIGHT, `bg_layer_${i}`).setOrigin(0);
            // Scroll factor and add updater-
    }

    static addGround(scene) {
        scene.add.tileSprite(0, WorldConsts.GROUND_Y, WorldConsts.WIDTH, 64, `bg_ground_0`).setOrigin(0);
    }

    static addPlayerBase(scene) {
        scene.add.image(200, WorldConsts.GROUND_Y, 'house').setOrigin(.5, 1);
        scene.add.image(150, WorldConsts.GROUND_Y, 'labTable').setOrigin(.5, 1);
    }

    static addPump(scene) {
        return scene.add.image(250, WorldConsts.GROUND_Y, 'pump').setOrigin(.5, 1);
    }

    static addForest(scene, startX, trees) {

        BackgroundBuilder.addTrees(scene, startX + 45, trees - 2, 0x000000, .5);
        BackgroundBuilder.addTrees(scene, startX + 15, trees - 2, 0x000000, .7);
        BackgroundBuilder.addTrees(scene, startX, trees);

        let gap = Phaser.Math.Between(10, 50);
        for (let i=-1; i < trees + 1; i++)
            scene.add.image(startX + (i * gap), WorldConsts.GROUND_Y, 'bush').setOrigin(.5, 1).setDepth(Phaser.Math.Between(0, 1));

    }

    static addTrees(scene, startX, amt, tint, alpha) {

        let y = WorldConsts.GROUND_Y;
        let gap = Phaser.Math.Between(30, 50);
        
        for (let i=0; i < amt; i++) {
            let texture = Phaser.Math.RND.pick(['tree1', 'tree2']);
            let flip = Math.random() > .5;
            let depth = (tint === undefined) ? Phaser.Math.Between(0, 1) : 0;
            let tree = scene.add.image(startX + (i * gap), y, texture).setOrigin(.5, 1).setFlipX(flip).setDepth(depth);
            if (tint !== undefined)
                tree.setTintFill(tint).setAlpha(alpha);
        }
    }
    
}
export default BackgroundBuilder;