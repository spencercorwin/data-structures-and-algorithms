"use strict";

//Module converts a string to a numberic hash
const hash = require('string-hash');

// Simple hash map without collision handling
class MyMap {
    constructor() {
        this.list = [];
    }

    get(x) {
        return this.list[hash(x)];
    }

    set(x, y) {
        this.list[hash(x)] = y;
    }
}

// Hash map that uses "open addressing" to handle collisions
class MyMapOpenAddressing {
    constructor() {
        this.list = [];
    }

    get(x) {
        for (let i = 0; i < this.list.length - x; i++) {
            if (this.list[hash(x + i)][0] === x) {
                return this.list[hash(x + i)][1];
            }
        }
    }

    set(x, y) {
        for (let i = 0; i < this.list.length + 1; i++) {
            if (this.list[hash(x)] === undefined) {
                return this.list[hash(x)] = [x, y];
            }
        }
    }
}

const few = new MyMapOpenAddressing();

for (let x = 0; x < 10; x++) {
    few.set(`element${x}`, x);
}

console.time('few');
few.get('element9');
console.timeEnd('few');

const many = new MyMapOpenAddressing();

for (let x = 0; x < 1000000; x++) {
    many.set(`element${x}`, x);
}

console.time('many');
many.get('element100000');
console.timeEnd('many');
