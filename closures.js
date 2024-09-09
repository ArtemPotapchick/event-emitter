
function EventEmitter() {
    const events = {};

    function on(eventName, fn) {
        if (events[eventName]) {
            events[eventName].push(fn);
        } else {
            events[eventName] = [fn];
        }
    }

    function emit(eventName, ...data) {
        const event = events[eventName];
        if (event) {
            event.forEach(fn => fn(...data));
        }
    }


    function once(eventName, fn) {
        function g(...data) {
            remove(eventName, g);
            fn(...data);
        }
        on(eventName, g);
    }


    function remove(eventName, fn) {
        const event = events[eventName];
        if (!event) return;
        const i = event.indexOf(fn);
        if (i !== -1) {
            event.splice(i, 1);
        }
    }


    function clear(name) {
        if (!name) {
            Object.keys(events).forEach(key => delete events[key]);
        } else {
            delete events[name];
        }
    }


    function count(name) {
        const event = events[name];
        return event ? event.length : 0;
    }


    function listeners(name) {
        const event = events[name];
        return event ? event.slice() : [];
    }


    function eventNames() {
        return Object.keys(events);
    }


    function prependListener(name, fn) {
        const event = events[name];
        if (!event) {
            on(name, fn);
        } else {
            event.unshift(fn);
        }
    }

    function removeAllListeners(name) {
        if(name) events[name] = [];
        else{
            Object.keys(events).forEach(name => events[name] = []);
        }
    }

    return {
        on,
        emit,
        once,
        remove,
        clear,
        count,
        listeners,
        eventNames,
        prependListener,
        removeAllListeners
    };
}

module.exports = EventEmitter;