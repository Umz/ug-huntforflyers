class Load extends Phaser.Scene {

    constructor() {
        super('Load');
    }

    create(data) {
        let nextScrene = data.nextScene || 'Game';
        this.scene.start('Preload');
    } 
};
export default Load;