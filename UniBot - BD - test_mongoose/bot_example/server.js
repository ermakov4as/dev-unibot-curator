module.exports = class Server {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
    }
    getServerTest() {
        return Math.random();
    }
};