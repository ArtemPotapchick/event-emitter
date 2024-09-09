function EventEmitter(events = {}) {
    this.events = events;
}

EventEmitter.prototype.on = function(eventName, fn) {
    if (this.events[eventName]) {
        this.events[eventName].push(fn);
    } else {
        this.events[eventName] = [fn];
    }
};

EventEmitter.prototype.emit = function(eventName, ...data) {
    const event = this.events[eventName];
    if (event) {
        event.forEach(fn => fn(...data));
    }
};

EventEmitter.prototype.once = function(eventName, fn) {
    const self = this;
    function g(...data) {
        self.remove(eventName, g);
        fn(...data);
    }
    this.on(eventName, g);
};

EventEmitter.prototype.remove = function(eventName, fn) {
    const event = this.events[eventName];
    if (!event) return;
    const i = event.indexOf(fn);
    if (i !== -1) {
        event.splice(i, 1);
    }
};

EventEmitter.prototype.clear = function(name) {
    if (!name) {
        this.events = {};
    } else {
        delete this.events[name];
    }
};

EventEmitter.prototype.count = function(name) {
    const event = this.events[name];
    return event ? event.length : 0;
};

EventEmitter.prototype.listeners = function(name) {
    const event = this.events[name];
    return event ? event.slice() : [];
};

EventEmitter.prototype.eventNames = function() {
    return Object.keys(this.events);
};

EventEmitter.prototype.prependListener = function(name, fn) {
    const event = this.events[name];
    if (!event) {
        this.on(name, fn);
    } else {
        event.unshift(fn);
    }

    EventEmitter.prototype.removeAllListeners = function(name) {
        if (name) {
                this.events[name] = [];
        } else {
            Object.keys(this.events).forEach(event => {
                this.events[event] = [];
            });
        }
    };
};

module.exports = EventEmitter;