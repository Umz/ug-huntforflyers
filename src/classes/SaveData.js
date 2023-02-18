class SaveData {

    constructor() {

        this.stage = "";
        this.playTime = 0;

        this.collected = 0;
        this.materials = 0;
        this.kills = 0;
        this.built = 0;
        this.births = 0;

        this.playerName = "Prof. Replica";
        this.cks = 0;
        this.currency = 0;
        this.cloneIndex = 0;
        this.names = [];
        this.ckNames = [];
        this.graves = [];
    }

    addGraveData(data) {
        this.graves.push(data);
    }

    getTrackDataForGrave(offsetX) {
        let grave = {
            offsetX: offsetX,
            name: this.playerName,
            time: this.playTime,
            stage: this.stage,
            collected: this.collected,
            materials: this.materials,
            kills: this.kills,
            built: this.built,
            births: this.births,
        }
        return grave;
    }

    resetTrackData() {
        this.collected = 0;
        this.materials = 0;
        this.kills = 0;
        this.built = 0;
        this.births = 0;
    }

    updatePlayerData() {
        this.cloneIndex ++;
        this.playerName = this.names.length > 0 ? this.names.shift() :
            `Replica ${this.cloneIndex}`;
    }

}
export default SaveData;