import Buildings from "../consts/Buildings";

class House extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.capacity = 100;
        this.filled = 100;
    }

    setConfig(config) {
        this.config = config;
        this.capacity = getCapacityForHouseType(config.type);
        return this;
    }

    setScaffold(scaffold) {
        this.scaffold = scaffold;
    }

    add(amt) {
        this.filled = Math.min(this.capacity, this.filled + amt);
        this.setCropToCompletion();

        if (this.isComplete())
            this.scaffold.destroy();
    }

    isComplete() {
        return this.filled === this.capacity;
    }

    setCompletePercentAndCrop(val) {
        this.filled = val * this.capacity;
        this.setCropToCompletion();
        this.add(0);
    }

    setCropToCompletion() {

        let fullHeight = this.height;
        let cropHeight = this.completion * fullHeight;
        let cropY = fullHeight - cropHeight;

        this.setCrop(0, cropY, this.width, cropHeight);
    }
    
    getType() {
        return this.config.type;
    }

    getName() {
        return this.config.name || "Sign";
    }

    getMessage() {
        return this.config.message || "...";
    }

    getClass() {
        return this.config.className || "";
    }

    get completion() {
        return this.filled / this.capacity;
    }
}
export default House;

function getCapacityForHouseType(type) {
    switch (type) {
        
        case Buildings.TENT1: return 20;
        case Buildings.TENT2: return 40;
        case Buildings.TENT3: return 60;

        case Buildings.HUT: return 100;
        case Buildings.FARMHUT: return 130;
        case Buildings.HOUSE1: return 200;
        case Buildings.HOUSE2: return 300;

        case Buildings.MOSQUE: return 400;

        case Buildings.SHOP: return 250;
        case Buildings.STORE: return 300;
        case Buildings.RESTAURANT: return 300;

        case Buildings.RANCH: return 750;
        case Buildings.WINDMILL: return 500;
    }
}