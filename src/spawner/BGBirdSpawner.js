import BGBird from "../background/BGBird";
import BGToad from "../background/BGToad";
import Counter from "../components/Counter";
import Animations from "../consts/Animations";
import Depths from "../consts/Depths";
import WorldConsts from "../consts/WorldConsts";

class BGBirdSpawner {

    constructor(scene, group) {

        this.scene = scene;
        this.group = group;

        let time = 20 * 1000;
        this.counter = Counter.New().setRepeating(true).setMaxCount(time);

        this.spawnRunnerGroup(10);
    }

    update(time, delta) {
        this.counter.update(time, delta);
        if (this.counter.isComplete())
            this.spawnBirdGroup(23);
    }

    spawnRunnerGroup(amt) {
        for (let i = 0; i < amt; i++) {
            
            let startX = Phaser.Math.Between(-100, 0);
            let startY = Phaser.Math.Between(150, 160);
            
            let toad = new BGToad(this.scene, 0, 0);
            toad.reset(startX, startY)
            this.scene.add.existing(toad);
            this.group.add(toad);
        }
    }

    spawnBirdGroup(amt) {
        const LEVEL_WIDTH = this.scene.levelData.LENGTHS * WorldConsts.WIDTH;
        let spawnX = Phaser.Math.Between(0, LEVEL_WIDTH);
        for (let i = 0; i < amt; i++) {
            let startX = spawnX + Phaser.Math.Between(-100, 100);
            let startY = Phaser.Math.Between(170, 200);
            let bird = this.getSpriteFromGroup();
            bird.reset(startX, startY);
        }
    }

    getSpriteFromGroup() {
        
        let sprite = this.group.getFirstDead();
        if (sprite)
            return sprite;

        let bird = new BGBird(this.scene, 0, 0);
        this.scene.add.existing(bird);
        this.group.add(bird);

        return bird;
    }
}
export default BGBirdSpawner;