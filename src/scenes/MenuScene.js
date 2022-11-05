import BackgroundBuilder from "../background/BackgroundBuilder";
import DomHandler from "../components/DomHandler";

class MenuScene extends Phaser.Scene {

    constructor() {
        super('MenuScene');
    }

    create(data) {

        BackgroundBuilder.addBackgroundScene(this);
        BackgroundBuilder.addGround(this);
        BackgroundBuilder.addForest(this, 220, 6);

        const domPlay = document.getElementById('menu-play');
        domPlay.addEventListener('click', ()=>{
            DomHandler.HideMainMenu();
            DomHandler.ShowGameUI();
            this.scene.start('Game');
        });
    }
}
export default MenuScene;