import Counter from 'components/Counter';

class Spawner {

    constructor(scene, group) {

        this.scene = scene;
        this.group = group;

        this.isSpawning = true;
        this.maxAlive = 3;

        this.counter = Counter.New().setRepeating(true).setMaxCount(10 * 1000);
    }

    update(time, delta) {
        if (this.isSpawning) {
            let activeCount = this.scene.getGroupActiveCount(this.group);
            this.counter.setActive(activeCount < this.maxAlive);
            this.counter.update(time, delta);
            if (this.counter.isComplete()) {
                this.spawn();
            }

            if (this.scene.isAllHousesComplete())
                this.setActive(true);
        }
    }

    spawn() {
    }

    setMaxAlive(count) {
        this.maxAlive = count;
        return this;
    }

    setSeconds(secs) {
        this.counter.setMaxCount(secs * 1000);
        return this;
    }

    setActive(spawn) {
        this.isSpawning = spawn;
        return this;
    }

    isActive() {
        return this.isSpawning;
    }

}
export default Spawner;