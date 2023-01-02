import Counter from "../components/Counter";
import WorldConsts from "../consts/WorldConsts";
import Enemy from "../enemy/Enemy";

class EnemySpawner {
    
    constructor(scene) {
        this.scene = scene;
        this.maxAlive = 5;
        this.counter = Counter.New().setRepeating(true).setMaxCount(12 * 1000);
    }

    update(time, delta) {
        if (this.scene.getThiefCount() < this.maxAlive)
            this.counter.update(time, delta);

        if (this.counter.isComplete())
            this.spawnEnemy();
    }

    spawnEnemy() {

        let x = Phaser.Math.Between(32, this.scene.getLevelWidth() - 32);
        let y = -24;

        let ene = new Enemy(this.scene);
        ene.init();
        ene.setPosition(x, y);

        this.scene.addThiefToGroups(ene.getSprite());
        this.scene.addBoundlessFlightPhysics(ene.getSprite());
    }
}
export default EnemySpawner;