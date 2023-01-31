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

    playLimited(key, max = 4) {
        
        let config = this.allSounds.get(key);
        let soundInstances = this.scene.sound.getAll(key);
        if (soundInstances.length < max)
            this.playSound(key, config);
    }

    playSound(key, config) {
        this.scene.sound.play(key, config);
    }

    playMusic(key, config) {
        
        if (this.music)
            this.music.stop();

        this.music = this.scene.sound.add(key, config);
        this.music.play();
    }

    destroyMusic() {
        this.music.stop();
        this.music.destroy();
    }

    setupSounds() {

        this.allSounds.set(Sfx.MENU_PLAY_BUTTON, {volume: 1});
        this.allSounds.set(Sfx.HIT_PREY, {volume: .5});
        this.allSounds.set(Sfx.FIRE_HUNT, {volume: .1});
        this.allSounds.set(Sfx.WEAPON_SELECT, {volume: .1});

        this.allSounds.set(Sfx.FIRE_CANNON, {volume: .4});
        this.allSounds.set(Sfx.HIT_CANNON, {volume: .3});
        this.allSounds.set(Sfx.PICKUP, {volume: .7});

        this.allSounds.set(Sfx.HIT_CANNON_NOKILL, {volume: .3});
        this.allSounds.set(Sfx.CONVERT_PREY_TO_COIN, {volume: .7});
        this.allSounds.set(Sfx.ABSORB_PREY, {volume: .3});

        this.allSounds.set(Sfx.THIEF_STEAL, {volume: .6});

        this.allSounds.set(Sfx.CIV_SPEAK, {volume: .3});
        this.allSounds.set(Sfx.CIV_COLLECT, {volume: .3});
        this.allSounds.set(Sfx.CIV_BUILDING, {volume: .1});
        this.allSounds.set(Sfx.CIV_BUILD_COMPLETE, {volume: .2});
        this.allSounds.set(Sfx.LEVEL_COMPLETE, {volume: .3});

        this.allSounds.set(Sfx.COINER_APPEAR, {volume:.3});
        this.allSounds.set(Sfx.COINER_DROP_COIN, {volume:.3});
        this.allSounds.set(Sfx.HIT_COINER, {volume:.5});

        this.allSounds.set(Sfx.BOMBER_DROP_MISSLE, {volume:.4});
        this.allSounds.set(Sfx.MISSLE_BLAST, {volume:.4});
        
        this.allSounds.set(Sfx.BGM_MENU, {volume: .4, loop:true, isMusic:true});
        this.allSounds.set(Sfx.BGM_LEVEL, {volume: .3, loop:true, isMusic:true});
    }
}
export default SoundManager;