// Linked list is an ordered, structure, linear structure similar to array
// The beginning of the chain is called the head and end of chain is the tail
// symbolized with a boxed X or circle with line through it
// Each link is called a node. The head points to the first node in the list
// https://codeburst.io/js-data-structures-linked-list-3ed4d63e6571

class LinkedList {
    constructor(...values) {
        this.head = null;
        this.length = 0;
        this.addToHead(...values);
    }

    addToHead(...values) {
        values.forEach(value => this._addSingleItemToHead(value));
        // Return value to allow chaining function calls
        return this;
    }

    // O(1) time vs O(n) for array.unshift
    _addSingleItemToHead(value) {
        const newNode = { value: value };
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
    }

    // O(1) time vs O(n) for array.shift
    removeFromHead() {
        if (this.length === 0) {
            return undefined;
        }
        const value = this.head;
        this.head = this.head.next;
        this.length--;
        // Return value to allow chaining function calls
        return value;
    }

    // O(n) time in linked list and array
    find(value) {
        let thisNode = this.head;
        while(thisNode) {
            if (thisNode.value === value) {
                return thisNode;
            }
            thisNode = thisNode.next;
        }
        return undefined;
    }

    // O(n) time vs O(n) for array.delete
    remove(value) {
        if (this.length === 0) {
            return undefined;
        }
        if (this.head.value === value) {
            this.removeFromHead();
            // Return this to allow chaining function calls
            return this;
        }

        // previousNode starts at the head
        let previousNode = this.head;
        // thisNode starts next to head then move down
        let thisNode = previousNode.next;

        while (thisNode) {
            // If node being checked is correct one then break out of loop and move to bottom
            if (thisNode.value === value) {
                break;
            }
            // Otherwise, move to the next node
            previousNode = thisNode;
            thisNode = thisNode.next;
        }

        // If its not in the list return undefined
        if (thisNode === null) {
            return undefined;
        }

        // Set pointer for previousNode to the next node after the one being removed, which effectively removes the desired node
        previousNode.next = thisNode.next;
        this.length--;
        // Return this to allow chaining function calls
        return this;
    }

    // Pass in a number and get the value of the item at that index
    getFromIndex(index) {
        let thisNode = this.head;
        let searchIndex = 0;
        while (thisNode) {
            if (searchIndex === index) {
                return thisNode.value;
            }
            thisNode = thisNode.next;
            searchIndex++;
        }
        return undefined;
    }

    // Pass in an index and add a new node at that location
    addAtIndex(index, value) {
        let previousNode = this.head;
        let thisNode = previousNode.next;
        let newNode = {value: value};
        let searchIndex = 0;
        while(thisNode) {
            if (searchIndex === index) {
                previousNode.next = newNode;
                newNode.next = thisNode.next;
            }
            previousNode = thisNode;
            thisNode = thisNode.next;
            searchIndex++;
        }
    }
}

const linkedList = new LinkedList(4, 2, 6, 4, 8, 20, 11, 55);
linkedList.addAtIndex(0, 10);
console.log(linkedList.getFromIndex(2));
console.log(linkedList);
