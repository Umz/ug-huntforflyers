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
        this.load.image('tester', 'test/sprTolu.png');
        this.load.image('preytest', 'test/testship.png');
        this.load.image('house', 'test/testhouse.png');

        for (let i=1; i<5; i++)
            this.load.image(`fairy${i}`, `test/fairy${i}.png`);

    }

    create(data) {
        this.scene.start('Game');
    } 

    update(time, delta) {
    }
    
};
export default Preload;