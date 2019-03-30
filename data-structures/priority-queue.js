
class PriorityQueue {
    constructor() {
        // Index 0 is "front" of the queue
        // Front of queue priority is 0
        this.collection = [];
    }

    enqueue(elem) {
        if (this.isEmpty()) {
            this.collection.push(elem);
        } else {
            let added = false;
            for (let i = 0; i < this.collection.length; i++) {
                if (elem[1] > this.collection[i][1]) {
                    this.collection.splice(i, 0, elem);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.collection.push(elem);
            }
        }
    }

    dequeue() {
        const result = this.collection.shift();
        // Only return the dequeued value without priority
        return result[0];
    }

    front() {
        return this.collection[0];
    }

    end() {
        return this.collection[this.collection.length - 1];
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

const queue = new PriorityQueue();
console.log(queue.isEmpty());

queue.enqueue(['spencer', 0]);
queue.enqueue(['tulsi', 2]);
queue.enqueue(['garrett', 1]);

console.log(queue.values());
console.log(queue.end());
console.log(queue.size());
console.log(queue.dequeue());
console.log(queue.isEmpty());
console.log(queue.values());
