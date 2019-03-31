
// Can't have duplicate items
class mySet {
    constructor() {
        this.collection = [];
    }

    hasElement(elem) {
        return this.collection.includes(elem);
        // return this.collection.indexOf(elem) !== -1;
    }

    values() {
        return this.collection;
    }

    addElem(elem) {
        if (this.hasElement(elem)) {
            return false;
        } else {
            this.collection.push(elem);
            return true;
        }
    }

    removeElem(elem) {
        if (this.hasElement(elem)) {
            return false;
        } else {
            const index = this.collection.indexOf(elem);
            this.collection = [...this.collection.slice(0, index), ...this.collection.slice(index + 1)];
        }
    }

    getSize() {
        return this.collection.length;
    }

    // Returns a new set of the combined sets
    combineWithSet(otherSet) {
        const firstSet = this.values();
        const secondSet = otherSet.values();
        const newSet = new mySet();
        firstSet.forEach(elem => newSet.addElem(elem));
        secondSet.forEach(elem => newSet.addElem(elem));
        return newSet;
    }

    setIntersection(otherSet) {
        const intersectionSet = new mySet();
        const firstSet = this.values();
        firstSet.forEach(elem => {
            if (otherSet.hasElement(elem)) {
                intersectionSet.addElem(elem);
            }
        });
        return intersectionSet;
    }

    setDifference(otherSet) {
        const differenceSet = new mySet();
        const firstSet = this.values();
        firstSet.forEach(elem => {
            if (!otherSet.hasElement(elem)) {
                differenceSet.addElem(elem);
            }
        })
        return differenceSet;
    }

    isSubset(otherSet) {
        const firstSet = this.values();
        return firstSet.every(elem => otherSet.hasElement(elem));
    }
}

const setA = new mySet();
const setB = new mySet();
['a', 'b', 'c'].forEach(e => setA.addElem(e));
['a', 'd', 'c'].forEach(e => setB.addElem(e));

const print = item => console.log(item);
print(setA.values());
print(setB.values());
print(setA.isSubset(setB));
print(setA.setDifference(setB));
