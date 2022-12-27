import BGBird from "../background/BGBird";
import BGToad from "../background/BGToad";
import Counter from "../components/Counter";
import Animations from "../consts/Animations";

class BGSpawner {

    constructor(scene, group, type) {
        this.scene = scene;
        this.group = group;
        this.type = type;

        this.groupMin = 8;
        this.groupMax = 12;

        this.spawnArea = new Phaser.Geom.Rectangle(0, 0, 10, 10);
        this.spawnSquare = new Phaser.Geom.Rectangle(0, 0, 10, 10);
        this.spawnRangeX = 0;

        this.counter = Counter.New().setRepeating(true).setMaxCount(30 * 1000);
    }

    update(time, delta) {
        this.counter.update(time, delta);
        if (this.counter.isComplete())
            this.spawnGroup();
    }

    spawnGroup() {
        
        let amt = Phaser.Math.Between(this.groupMin, this.groupMax);
        let point = new Phaser.Geom.Point(0, 0);
        point = this.spawnArea.getRandomPoint(point);

        this.spawnSquare.setPosition(point.x, this.spawnArea.y);

        for (let i = 0; i<amt; i++) {

            point = this.spawnSquare.getRandomPoint(point);

            let sprite = this.getSpriteFromGroup();
            sprite.reset(point.x, point.y);
        }
    }

    getSpriteFromGroup() {

        let all = this.group.getMatching('type', this.type);
        let sprite = all.find(spr => !spr.visible && !spr.active);
        if (sprite)
            return sprite;
        
        let newSprite = this.getNewSprite();
        this.scene.add.existing(newSprite);
        this.group.add(newSprite);

        return newSprite;
    }

    getNewSprite() {
        switch(this.type) {
            case Animations.TOAD: return new BGToad(this.scene, 0, 0);
            case Animations.EAGLE:
            default: return new BGBird(this.scene, 0, 0);
        }
    }

    setFrequency(time) {
        this.counter.setMaxCount(time);
    }

    setGroupSize(min, max) {
        this.groupMin = min;
        this.groupMax = max;
    }

    setType(type) {
        this.type = type;
    }

    setSpawnArea(x, y, width, height) {
        this.spawnArea.setTo(x, y, width, height);
    }

    setSpawnSquare(x, y, width, height) {
        this.spawnSquare.setTo(x, y, width, height);
    }

}
export default BGSpawner;