import Sfx from "../consts/Sfx";

class SoundManager {

    constructor(scene) {

        this.scene = scene;
        this.music = null;
        this.allSounds = new Map();
        this.setupSounds();
    }

    play(key) {

        let config = this.allSounds.get(key);
        if (config.isMusic)
            this.playMusic(key, config);
        else
            this.playSound(key, config);
    }

    playSound(key, config) {
        this.scene.sound.play(key, config);
    }

    playLimitedInstances(key, config, max = 4) {
        let soundInstances = this.sound.getAll(key);
        if (soundInstances.length < max)
            this.scene.sound.play(key, config);
    }

    playMusic(key, config) {
        
        if (this.music)
            this.music.stop();

        this.music = this.scene.sound.add(key, config);
        this.music.play();
    }

    setupSounds() {

        this.allSounds.set(Sfx.MENU_PLAY_BUTTON, {volume: 1});
        this.allSounds.set(Sfx.HIT_PREY, {volume: .3});
        this.allSounds.set(Sfx.FIRE_HUNT, {volume: .2});
        this.allSounds.set(Sfx.WEAPON_SELECT, {volume: .1});

        this.allSounds.set(Sfx.FIRE_CANNON, {volume: .4});
        this.allSounds.set(Sfx.HIT_CANNON, {volume: .1});
        this.allSounds.set(Sfx.PICKUP, {volume: .8});
        
        this.allSounds.set(Sfx.BGM_MENU, {volume: .4, loop:true, isMusic:true});
    }
}
export default SoundManager;