import GameSave from "../components/GameSave";

class Preload extends Phaser.Scene {

    constructor() {
        super('Preload');
    }

    init() {
        // Fonts prep,
    }

    preload() {

        this.load.setBaseURL('./assets/');
        //https://umzgames.com/demo/farb2/

        this.load.atlas('background', 'background.png', 'background.json');

        //  TESTER graphics
        
        this.load.image('tester', 'test/spr_tank.png');

        for (let i=1; i<5; i++)
            this.load.image(`fairy${i}`, `test/fairy${i}.png`);

        for (let i=1; i<7; i++)
            this.load.image(`bird${i}`, `test/b${i}.png`);
    }

    create(data) {
        GameSave.Init();
        this.scene.start('MenuScene');
    } 

    update(time, delta) {
    }
    
};
export default Preload;