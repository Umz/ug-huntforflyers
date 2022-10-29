class Game extends Phaser.Scene {

    constructor() {
        super('Game');
    }

    init() {
        //  Used to prepare data
    }

    preload() {
        // Used for preloading assets into your scene, such as
        // • images
        // • sounds

        this.load.setBaseURL('/assets/');

        this.load.image('logo', 'logo.png');
    }

    create(data) {
        // Used to add objects to your game

        var logo = this.add.image(400, 150, 'logo');

        this.tweens.add({
            targets: logo,
            y: 250,
            duration: 1000,
            ease: 'Power2',
            yoyo: true,
            loop: -1
        });
    }

    update(time, delta) {
        // Used to update your game. This function runs constantly
    }
    
};
export default Game;