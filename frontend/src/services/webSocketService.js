class WebSocketService {
    constructor() {
        this.socket = new WebSocket('ws://localhost:5000');
        this.messageHandlers = new Set();
    }

    connect() {
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.messageHandlers.forEach(handler => handler(data));
        };
    }

    subscribe(handler) {
        this.messageHandlers.add(handler);
    }

    unsubscribe(handler) {
        this.messageHandlers.delete(handler);
    }
}

export default new WebSocketService();