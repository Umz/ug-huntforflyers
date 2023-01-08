import Depths from "../consts/Depths";
import WorldConsts from "../consts/WorldConsts";
import TextureMapper from "../mappers/TextureMapper";

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
        gr.setDepth(Depths.BG_STAGE);
        gr.update = function(time, delta) {
            let camera = this.scene.cameras.main;
            this.tilePositionX = camera.scrollX;
        }
        if (scene.updateRunner)
            scene.updateRunner.add(gr);
    }

    static addBuilding(scene, building) {
        let atlas = TextureMapper.getAtlas(building.type);
        let b = scene.add.sprite(building.worldX, WorldConsts.GROUND_Y, atlas, building.type).setOrigin(.5, 1).setDepth(building.depth).setAlpha(building.alpha);
        return b;
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

    static AddMound(scene, x) {
        let mound = scene.add.image(x, WorldConsts.GROUND_Y, 'background', 'mound').setOrigin(.5, 1).setDepth(Depths.ENEMIES_MOUND);
        return mound;
    }
}
export default BackgroundBuilder;