class UpdateRunner {
    constructor() {
        this.objectswithUpdateFn = [];
    }

    update(time, delta) {
        for (let obj of this.objectswithUpdateFn)
            obj.update(time, delta);
    }

    add(obj) {
        if (typeof obj.update === 'function')
            this.objectswithUpdateFn.push(obj);
        else
            console.log('No update function- failed to add');
            // Move to try{} catch() {} internally
    }
}
export default UpdateRunner;