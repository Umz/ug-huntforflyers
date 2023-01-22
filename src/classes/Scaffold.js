import Depths from "consts/Depths";
import TextureMapper from "mappers/TextureMapper";
import Buildings from "consts/Buildings";

const SCAFFOLDFRAMEWIDTH = 16;
const SCAFFOLDFRAMEHEIGHT = 32;

class Scaffold {

    constructor(house) {
        
        this.house = house;
        this.sprites = [];
        this.columns = Math.ceil(house.width / SCAFFOLDFRAMEWIDTH);
        this.rows = Math.ceil(house.height / SCAFFOLDFRAMEHEIGHT);
    }

    createScaffoldSprites(scene) {

        let house = this.house;
        let pos = house.getBottomLeft();

        for (let col=0; col<this.columns; col++) {
            for (let row=0; row<this.rows; row++) {

                let posX = (pos.x - 4) + (col * SCAFFOLDFRAMEWIDTH);
                let posY = pos.y - (row * SCAFFOLDFRAMEHEIGHT);
                let atlas = TextureMapper.getAtlas(Buildings.SCAFFOLD);

                let sprite = scene.add.sprite(posX, posY, atlas, Buildings.SCAFFOLD);
                sprite.setOrigin(0, 1).setDepth(Depths.SCAFFOLD);

                this.sprites.push(sprite);
            }
        }
    }

    destroy() {
        for (let sprite of this.sprites)
            sprite.destroy();
        this.sprites.length = 0;
    }

}
export default Scaffold;