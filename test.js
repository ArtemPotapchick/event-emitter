const eventEmitterPath = process.env.EVENT_EMITTER_PATH.trim();
const EventEmitter  = require(eventEmitterPath);

const fn = (data) => console.log(data);

const eventEmitter = new EventEmitter();

console.log('--- Test the on method ---');
eventEmitter.on('e1', fn);
eventEmitter.emit('e1', 'e1 ok');

console.log('--- Test the remove method ---');
eventEmitter.remove('e2', fn);
eventEmitter.emit('e2', 'e2 not ok');

console.log('--- Test the once method ---');
eventEmitter.once('e3', fn);
eventEmitter.emit('e3', 'e3 ok');
eventEmitter.emit('e3', 'e3 not ok');

console.log('--- Test the clear method ---');
eventEmitter.on('e4', fn);
eventEmitter.on('e5', (data) => console.log(data));
eventEmitter.clear('e4');

eventEmitter.emit('e4', 'e4 is not ok');
eventEmitter.emit('e5', 'e5 is ok');
eventEmitter.clear();

eventEmitter.emit('e5', 'e5 is not ok');


console.log('--- Test the count method ---');
eventEmitter.on('e6', fn);
eventEmitter.on('e6', (name) => console.log(`Welcome, ${name}!`));

console.log(eventEmitter.listeners('e6'))
console.log(eventEmitter.count('e6'));

eventEmitter.remove('e6', fn);
console.log(eventEmitter.count('e6'));

console.log('--- Test the listeners method ---');
eventEmitter.on('e7', fn);
const fnListeners = eventEmitter.listeners('e7');
console.log(fnListeners.length);
console.log(typeof fnListeners[0]);

console.log('--- Test the eventNames method ---');
const eventNames = eventEmitter.eventNames();
console.log(eventNames);

console.log('--- Test the prependListener method ---');
eventEmitter.on('test', () => console.log('Second listener'));
eventEmitter.prependListener('test', () => console.log('First listener'));
eventEmitter.emit('test');

console.log('--- Test the clear method (no args) ---');
eventEmitter.clear();
console.log(eventEmitter.eventNames().length);

console.log('--- Test removeAllListeners ---');
eventEmitter.on('e8', fn);
eventEmitter.on('e9', (data) => console.log(data));
eventEmitter.emit('e8', 'e8 ok');
eventEmitter.emit('e9', 'e9 ok');
eventEmitter.removeAllListeners('e8');

eventEmitter.emit('e8', 'e8 not ok');
eventEmitter.emit('e9', 'e9 still ok');
eventEmitter.removeAllListeners();

eventEmitter.emit('e9', 'e9 not ok');