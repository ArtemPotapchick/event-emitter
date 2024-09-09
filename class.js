
class EventEmitter {
    constructor(events = {}) {
        this.events = events;
    }

    on(eventName, fn) {
        const event = this.events[eventName];
        if (event) event.push(fn)
        this.events[eventName] = [fn];
    };

    emit(eventName, ...data) {
        const event = this.events[eventName];
        if (event) event.forEach(fn => fn(...data));
    };

    once(eventName, fn) {
        const g = (...data)=>{
            this.remove(eventName, g);
            fn(...data);
        }
        this.on(eventName, g);
    };

    remove(eventName, fn) {
        const event = this.events[eventName];
        if(!event) return;
        const i = event.indexOf(fn);
        if(i !== -1) event.splice(i, 1);
    };

    clear(name) {
        if(!name) this.events = {}
        else {delete this.events[name];}
    };

    count(name) {
        const event = this.events[name];
        return event ? event.length : 0;
    };

    listeners(name){
        const event = this.events[name];
        return event.slice();
    };

    eventNames() {
        return Object.keys(this.events);
    };

    prependListener(name, fn) {
        const event = this.events[name];
        if(!event) this.on(name,fn)
        event.unshift(fn);
    };

    removeAllListeners(eventName){
        if(eventName) this.events[eventName] = [];
        else { Object.keys(this.events).forEach(event => {
            this.events[event] = [];
        });}

    };

}

module.exports = EventEmitter;