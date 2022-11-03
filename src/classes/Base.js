class Base {

    constructor(scene) {
        this.updaters = [];
    }

    init() {
        this.sprite.update = (time, delta) => {
            for (let fn of this.updaters)
                fn(time, delta);
        }
    }

    addUpdater(fn) {
        this.updaters.push(fn);
    }

    get stats() {
        return {
            speed: this.config.speed
        }
    }
}
export default Base;