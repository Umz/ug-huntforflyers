class Chat {

    constructor(name, message, className) {
        this.name = name;
        this.className = className;
        this.message = message;
    }

    getNextMessageOrNull() {
        if (Array.isArray(this.message)) {
            if (this.message.length > 0)
                return this.message.shift();
        }
        return null;
    }
}
export default Chat;