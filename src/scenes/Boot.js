import Consts from "../consts/Consts";

class Boot extends Phaser.Scene {

    constructor() {
        super(Consts.BOOT_SCENE);
    }

    init() {
        //  Used to prepare data
    }

    preload() {
        // Used for preloading assets into your scene, such as
        // • images
        // • sounds
    }

    create(data) {
        // Used to add objects to your game
        this.scene.start(Consts.PRELOAD_SCENE);
    } 

    update(time, delta) {
        // Used to update your game. This function runs constantly
    }
    
};
export default Boot;