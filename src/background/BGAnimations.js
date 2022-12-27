import Animations from "../consts/Animations";
import WorldConsts from "../consts/WorldConsts";
import BGSpawner from "../spawner/BGSpawner";

class BGAnimations {

    constructor(scene, group) {
        this.scene = scene;
        this.group = group;

        const LEVEL_WIDTH = this.scene.levelData.LENGTHS * WorldConsts.WIDTH;

        this.birds = new BGSpawner(scene, group, Animations.EAGLE);
        this.birds.setGroupSize(20, 27);
        this.birds.setSpawnArea(0, 170, LEVEL_WIDTH, 30);
        this.birds.setSpawnSquare(0, 170, 200, 30);

        this.toads = new BGSpawner(scene, group, Animations.TOAD);
        this.toads.setFrequency(125 * 1000);
        this.toads.setSpawnArea(-100, 150, 100, 10);
        this.toads.setSpawnSquare(-100, 150, 100, 10);
    }

    update(time, delta) {
        this.birds.update(time, delta);
        this.toads.update(time, delta);
    }
}
export default BGAnimations;