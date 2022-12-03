class Counter {

    constructor() {
        this.counter = 0;
        this.counterMax = 1000;
        this.isRepeating = false;
    }

    static New() { return new Counter() }

    setRepeating(bool) {
        this.isRepeating = bool;
        return this;
    }

    update(time, delta) {
        this.counter += delta;
    }

    isComplete() {
        return this.isRepeating ? this.isCountUpRepeat() : this.isCountUp();
    }

    isCountUp() {
        return this.counter >= this.counterMax;
    }

    isCountUpRepeat() {
        if (this.isCountUp()) {
            this.counter = 0;
            return true;
        }
        return false;
    }

}
export default Counter;