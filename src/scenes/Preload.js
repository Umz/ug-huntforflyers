class Preload extends Phaser.Scene {

    constructor() {
        super('Preload');
    }

    init() {
        // Fonts prep,
    }

    preload() {
        this.load.setBaseURL('/assets/');

        this.load.image('tester', 'test/spr_tank.png');

        for (let i=1; i<5; i++)
            this.load.image(`fairy${i}`, `test/fairy${i}.png`);

        for (let i=1; i<6; i++)
            this.load.image(`bird${i}`, `test/b${i}.png`);

        //  Background

        for (let i=0; i<5; i++)
            this.load.image(`bg_layer_${i}`, `background/bg${i}.png`);

        for (let i=0; i<4; i++)
            this.load.image(`bg_ground_${i}`, `background/ground_${i}.png`);

        this.load.image('house', 'background/building_main.png');
        this.load.image('labTable', 'background/decor_lab_table.png');
        this.load.image('pump', 'background/building_pump.png');

        this.load.image('bush', 'background/decor_bush.png');
        this.load.image('tree1', 'background/decor_tree1.png');
        this.load.image('tree2', 'background/decor_tree2.png');
    }

    create(data) {
        this.scene.start('Game');
    } 

    update(time, delta) {
    }
    
};
export default Preload;