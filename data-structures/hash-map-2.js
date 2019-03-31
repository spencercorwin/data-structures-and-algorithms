const hash = require('string-hash');

class MyHashTable {
    constructor() {
        this.map = [];
    }

    get(key) {
        return this.map[hash(key)][1];
    }

    set(key, value) {
        this.map[hash(key)] = [key, value];
    }
}

class HashWithChaining {
    constructor() {
        this.map = [];
    }

    get(key) {
        const array = this.map[hash(key)];
        for (let i = 0; i < array.length; i++) {
            if (array[i][0] === key) {
                return array[i];
            }
        }
        return null;
    }

    set(key, value) {
        if (!this.map[hash(key)]) {
            this.map[hash(key)] = [[key, value]];
        } else {
            this.map[hash(key)].push([key, value]);
        }
    }
}

class HashWithOpenAddressing {
    constructor() {
        this.map = [];
    }

    set(key, value) {
        let i = 0;
        while (true) {
            if (this.map[hash(key) + i]) {
                i++;
            } else {
                this.map[hash(key) + i] = [key, value];
                break;
            }
        }
    }

    get(key) {
        let i = 0;
        while (true) {
            if (this.map[hash(key) + i][0] === key) {
                return this.map[hash(key)][1];
            } else {
                i++;
            }
        }
    }
}

let addressing = new HashWithOpenAddressing();
for (let i = 0; i < 100; i++) {
    addressing.set(`element${i}`);
}
for (let i = 0; i < 100; i++) {
    addressing.set(`element${i}`);
}
console.time('addressing');
let addressingResult = addressing.get(`element9`);
console.timeEnd('addressing');


let chaining = new HashWithChaining();
for (let i = 0; i < 100; i++) {
    chaining.set(`element${i}`);
}
for (let i = 0; i < 100; i++) {
    chaining.set(`element${i}`);
}
console.time('chaining');
let chainingResult = chaining.get(`element9`);
console.timeEnd('chaining');
