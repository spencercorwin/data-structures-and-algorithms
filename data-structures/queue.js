// FIFO

class Queue {
    constructor() {
        // Index 0 is the "front" of the line
        this.collection = [];
    }

    enqueue(elem) {
        this.collection.push(elem);
    }

    dequeue() {
        return this.collection.shift();
    }

    front() {
        return this.collection[0];
    }

    end() {
        return this.collection[this.collection.length - 1]
    }

    size() {
        return this.collection.length;
    }

    isEmpty() {
        return this.collection.length === 0;
    }

    values() {
        return this.collection;
    }
}

const queue = new Queue();
console.log(queue.isEmpty());
[10, 4, 6, 8, 2].forEach(e => queue.enqueue(e));

console.log(queue.end());
console.log(queue.size());
console.log(queue.dequeue());
