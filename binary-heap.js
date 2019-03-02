'use strict';
// Binary Heap is a way to store a collection of objects in a way that the smallest
// element can be found quickly. Finding smallest item in plain JS array takes too long.
// Arrays can be sorted easily with sort() method but takes too long O(n).
// Arrays can also be kept in order but that also requires shifting all items which takes too long.
// Solution is to store array positions in the form of a tree. At root is position 1 (not 0).

// Algorithm   Avg     Worst
// Space       O(n)      O(n)
// Search      O(n)      O(n)
// Insert      O(1)      O(log n)
// Delete      O(log n)  O(log n)
// Peek        O(1)      O(1)

class BinaryHeap {
    // The score function is used to compare elements in the heap. This makes it
    // possible to store objects that cannot be directly compared
    constructor(scoreFunction) {
        this.content = [];
        this.scoreFunction = scoreFunction;
    }

    // Used to insert an element into the heap
    push(element) {
        // Add the new element to the end of the array
        this.content.push(element);

        // Then allow it to bubble up
        this.bubbleUp(this.content.length - 1);
    }

    // Used to get and remove the minimum element (the root element)
    pop() {
        // Store the first element
        const result = this.content[0];

        // Get the element at the end of the array
        const end = this.content.pop();

        // If there are any elements left, put the end element at the start and let it sink down
        if (this.content.length > 0) {
            this.content[0] = end;
            this.sinkDown(0);
        }

        return result;
    }

    // Used to remove a specific node in the tree
    remove(node) {
        const length = this.content.length;

        // To remove a value, we must search through the array to find it first
        for (let i = 0; i < length; i++) {
            // If the node we're searching for doesn't match element in loop then immediately try next one
            if (this.content[i] !== node) {
                continue;
            }

            // When we find the node to replace we will fill it with an element from end of array
            const end = this.content.pop();

            // If "end" was the element needed to be removed then we stop, we're done
            if (i === length - 1) {
                break;
            }

            // Set newly made hole equal to the item popped off the end
            this.content[i] = end;
            // Then bubbleUp and sinkDown the newly replaced node from there
            this.bubbleUp(i);
            this.sinkDown(i);
            break;
        }
    }

    size() {
        return this.content.length;
    }

    // When a new element is added to the tree it is added to the end of the array and allowed
    // to bubble up by repeatedly exchanging it with its parent until we find a parent that is
    // less than the new node
    bubbleUp(n) {
        // Get the element that has to be moved
        const element = this.content[n];
        // Get the "score" to be used for comparison purposes
        const score = this.scoreFunction(element);

        while (n > 0) {
            // Get the parent element's position index, then fetch the value
            const parentOfNPosition = (Math.floor((n + 1) / 2) -1);
            const parentObj = this.content[parentOfNPosition];

            // If the parent has a lower score things are ordered and we're done
            if (score >= this.scoreFunction(parentObj)) {
                break;
            }

            // Otherwise, swap the parent with the current element and continue
            this.content[parentOfNPosition] = element;
            this.content[n] = parentObj;
            n = parentOfNPosition;
        }
    }

    // When an element is removed the heap must be sure there are no holes left in the array.
    // It takes the last element in the array, moves it to the start, then compares it to its
    // children at position 2 and 3. It is then exchanged with one of them if it is larger.
    // This is repeated until it comes to a position where its children are greater or has no
    // children
    sinkDown(n) {
        // Look up the target element and its "score"
        const length = this.content.length;
        const element = this.content[n];
        const elemScore = this.scoreFunction(element);

        while (true) {
            // Get the indices of the child elements
            const child2N = (n + 1) * 2;
            const child1N = child2N - 1;

            // This is used to store the new position of the element
            let swap = null;

            // If the first child is in the array, check if it should be swapped
            if (child1N < length) {
                // Look up child1N's value and get its score
                const child1 = this.content[child1N];
                const child1Score = this.scoreFunction(child1);
                // If the score is less than our element's score then we swap
                if (child1Score < elemScore) {
                    swap = child1N;
                }
            }

            // If then second child is in the array, check if it should be swapped
            if (child2N < length) {
                // Look up child2N's value and get its score
                const child2 = this.content[child2N];
                const child2Score = this.scoreFunction(child2);
                // If the score is less than our element's score then we swap
                // First check if child1Score has been swapped with the element
                // If it has then compare child2Score to child1Score, not elemScore
                const comparisonScore = swap === null ? elemScore : child2Score;
                if (child2Score < comparisonScore) {
                    swap = child2N;
                }
            }

            // If nothing has been swapped then it means the element has sunk down
            // as far as it should
            if (swap === null) {
                break;
            }

            // Otherwise, do the assigned swap and continue
            this.content[n] = this.content[swap];
            this.content[swap] = element;
            n = swap;
        }
    }

}

const testHeap = new BinaryHeap(x => x);

// Insert new elements into the testHeap in random order
[10, 3, 4, 8, 2, 9, 7, 1, 2, 6, 5].forEach(elem => testHeap.push(elem));

// Remove an element
testHeap.remove(2);

// Test to see if the heap is still ordered as it should be
while (testHeap.size() > 0) {
    console.log(testHeap.pop());
}