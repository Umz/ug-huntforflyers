class Preload extends Phaser.Scene {

    constructor() {
        super('Preload');
    }

    init() {
        // Fonts prep,
    }

    preload() {
        this.load.setBaseURL('/assets/');

        this.load.image('logo', 'logo.png');
        this.load.image('tester', 'test/testSprite.png');
    }

    create(data) {
        this.scene.start('Game');
    } 

    update(time, delta) {
    }
    
};
export default Preload;