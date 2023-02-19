import Depths from '../consts/Depths';

class Gravestone extends Phaser.GameObjects.Image {

    constructor(scene, x, y, atlas, frame) {
        super(scene, x, y, atlas, frame);
        this.setDepth(Depths.GRAVESTONE)
        this.setOrigin(.5, 1);
        
        this.graveStats = {};
    }

    setStats(stats) {
        this.graveStats = stats;
    }

    getStats() {
        return this.graveStats;
    }
}
export default Gravestone;