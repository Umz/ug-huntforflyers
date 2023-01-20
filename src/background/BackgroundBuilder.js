import Depths from "consts/Depths";
import Textures from "consts/Textures";
import WorldConsts from "consts/WorldConsts";
import TextureMapper from "mappers/TextureMapper";

class BackgroundBuilder {

    static addBackgroundScene(scene) {

        for (let i=0; i<6; i++) {

            let bg = scene.add.tileSprite(0, 0, WorldConsts.WIDTH, WorldConsts.HEIGHT, 'background', `bg${i}`).setOrigin(0).setScrollFactor(0);
            bg.setDepth(Depths.BG_SCENE + i);
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
        gr.setDepth(Depths.BG_GROUND); 
        gr.update = function(time, delta) {
            let camera = this.scene.cameras.main;
            this.tilePositionX = camera.scrollX;
        }
        if (scene.updateRunner)
            scene.updateRunner.add(gr);

        let groundDepth = scene.add.image(0, WorldConsts.GROUND_Y, Textures.BG_GRASS).setOrigin(0, 1).setScrollFactor(0).setDepth(Depths.BG_GROUND_DEPTH);
    }

    static addBuilding(scene, building) {
        let offset = getOffset(building.depth);
        let atlas = TextureMapper.getAtlas(building.type);
        let b = scene.add.sprite(building.worldX, WorldConsts.GROUND_Y - offset, atlas, building.type).setOrigin(.5, 1).setDepth(building.depth).setAlpha(building.alpha);
        return b;
    }

    static addForest(scene, forest) {
        for(let layer of forest.layers)
            BackgroundBuilder.addForestLayer(scene, layer);
    }

    static addForestLayer(scene, layer) {

        let offset = getOffset(layer.depth);
        const PY = WorldConsts.GROUND_Y - offset;
        
        for (let i=0; i<layer.size; i++) {
            
            let posX = layer.worldX + (i * Phaser.Math.Between(30, 50));
            let flip = Math.random() > .5;
            let tree = scene.add.image(posX, PY, layer.atlas, layer.getRandomFrame()).setOrigin(.5, 1).setDepth(layer.depth).setAlpha(layer.alpha).setFlipX(flip);

            if (layer.hasTint)
                tree.setTintFill(0x000000);
        }
    }

    static AddMound(scene, x) {
        let mound = scene.add.image(x, WorldConsts.GROUND_Y, 'background', 'mound').setOrigin(.5, 1).setDepth(Depths.ENEMIES_MOUND);
        return mound;
    }
}
export default BackgroundBuilder;

function getOffset(depth) {
    switch (depth) {
        case Depths.BUILDINGS_BEHIND: return 3;
        case Depths.FOREST_BG1:
        case Depths.FOREST_BG2:
        case Depths.FOREST_BG3:
        case Depths.BUILDINGS_BG: return 2;
        case Depths.FOREST_FG1: return 1;
        default: return 0;
    }
}