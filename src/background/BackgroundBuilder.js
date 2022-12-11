import WorldConsts from "../consts/WorldConsts";
import TextureMapper from "../mappers/TextureMapper";

class BackgroundBuilder {

    static addBackgroundScene(scene) {
        for (let i=0; i<6; i++) {

            let bg = scene.add.tileSprite(0, 0, WorldConsts.WIDTH, WorldConsts.HEIGHT, 'background', `bg${i}`).setOrigin(0).setScrollFactor(0);
            bg.sf = (i * .15);
            bg.of = 0;

            bg.update = function(time, delta) {
                let camera = this.scene.cameras.main;
                this.tilePositionX = camera.scrollX * this.sf + this.of;

                if (i == 1)
                    this.of += 8 * .001 * delta;
            }
            if (scene.updateRunner)
                scene.updateRunner.add(bg);
        }
    }

    static addGround(scene) {
        let gr = scene.add.tileSprite(0, WorldConsts.GROUND_Y, WorldConsts.WIDTH, 64, 'background', `ground_0`).setOrigin(0).setScrollFactor(0);
        gr.update = function(time, delta) {
            let camera = this.scene.cameras.main;
            this.tilePositionX = camera.scrollX;
        }
        if (scene.updateRunner)
            scene.updateRunner.add(gr);
    }

    static addBuilding(scene, building) {
        let atlas = TextureMapper.getAtlas(building.type);
        scene.add.image(building.worldX, WorldConsts.GROUND_Y, atlas, building.type).setOrigin(.5, 1).setDepth(building.depth).setAlpha(building.alpha);
    }

    //  HOW to Split for Depths?
    static addForestUnit(scene, startX, trees) {

        //let forestLayer = {tint, alpha, depth, PlantTypes};
        
        //  Add Layer - addTrees(scene, layer);
        BackgroundBuilder.addTrees(scene, startX + 45, trees - 2, 0x000000, .5);
        BackgroundBuilder.addTrees(scene, startX + 15, trees - 2, 0x000000, .7);
        BackgroundBuilder.addTrees(scene, startX, trees);

        let gap = Phaser.Math.Between(10, 50);
        for (let i=-1; i < trees + 1; i++) {
            let frame = Phaser.Math.RND.pick(['decor_bush', 'flower1', 'flower2', 'flower3']);
            scene.add.image(startX + (i * gap), WorldConsts.GROUND_Y, 'background', frame).setOrigin(.5, 1).setDepth(Phaser.Math.Between(0, 1));
        }
    }

    static addTrees(scene, startX, amt, tint, alpha) {

        let y = WorldConsts.GROUND_Y;
        let gap = Phaser.Math.Between(30, 50);
        
        for (let i=0; i < amt; i++) {
            let frame = Phaser.Math.RND.pick(['decor_tree1', 'decor_tree2']);
            let flip = Math.random() > .5;
            let depth = (tint === undefined) ? Phaser.Math.Between(0, 1) : 0;
            let tree = scene.add.image(startX + (i * gap), y, 'background', frame).setOrigin(.5, 1).setFlipX(flip).setDepth(depth);
            if (tint !== undefined)
                tree.setTintFill(tint).setAlpha(alpha);
        }
    }

    static addForest(scene, forest) {
        for(let layer of forest.layers)
            BackgroundBuilder.addForestLayer(scene, layer);
    }

    static addForestLayer(scene, layer) {

        const PY = WorldConsts.GROUND_Y;
        
        for (let i=0; i<layer.size; i++) {
            
            let posX = layer.worldX + (i * Phaser.Math.Between(30, 50));
            let flip = Math.random() > .5;
            let tree = scene.add.image(posX, PY, layer.atlas, layer.getRandomFrame()).setOrigin(.5, 1).setDepth(layer.depth).setAlpha(layer.alpha).setFlipX(flip);

            if (layer.hasTint)
                tree.setTintFill(0x000000);
        }
    }

}
export default BackgroundBuilder;