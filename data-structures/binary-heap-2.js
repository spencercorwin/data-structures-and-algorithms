
// When a heap is implemented as an array:
// left child: i * 2
// right child: i * 2 + 1
// parent: Math.floor(i / 2)
// There is no index 0 due to this implementation
// Index 0 is null
// Index is size of the heap

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  insert(num) {
    this.heap.push(num);
    if (this.heap.length > 2) {
      // Last index in the heap
      let index = this.heap.length - 1;
      // While current node is less than the parent node it needs to be moved up
      while (this.heap[index] < this.heap[Math.floor(index / 2)]) {
        // If we're not at the root node...
        if (index >= 1) {
          // Swap current node and parent node
          const parentNode = this.heap[Math.floor(index / 2)];
          const currentNode = this.heap[index];
          this.heap[Math.floor(index / 2)] = currentNode;
          this.heap[index] = parentNode;
          // If the parent node is 1 then it's the root node and we stop
          // Otherwise reset index to the parent node
          index = Math.floor(index / 2);
        } else {
          break;
        }
      }
    }
  }

  // Always remove top node
  remove() {
    // Get top node to return
    const smallest = this.heap[1];
    if (this.heap.length > 2) {
      // Move last node to top
      this.heap[1] = this.heap[this.heap.length - 1];
      // Shorten heap array by 1 to cut off/ remove last item (just moved to top)
      this.heap = this.heap.slice(0, this.heap.length - 1);
      // If heap length is 3 then there's only the root node and two children
      if (this.heap.length === 3) {
        // If the top node is larger than node 2 then swap them
        if (this.heap[1] > this.heap[2]) {
          const swap1 = this.heap[1];
          const swap2 = this.heap[2];
          this.heap[1] = swap2;
          this.heap[2] = swap1;
        };
        return smallest;
      };
      let i = 1;
      let left = 2 * i;
      let right = 2 * i + 1;
      // As long as the this.heap[i] current node is larger than a child it needs
      // to be swapped downwards
      while (this.heap[i] >= this.heap[left] || this.heap[i] >= this.heap[right]) {
        // If right child is greater than left child, then swap current node with
        // left child
        if (this.heap[left] < this.heap[right]) {
          let swap01 = this.heap[left];
          let swap02 = this.heap[i];
          this.heap[left] = swap02;
          this.heap[i] = swap01;
          i = i * 2;
        } else {
          // Swap with right child
          let swap03 = this.heap[right];
          let swap04 = this.heap[i];
          this.heap[right] = swap04;
          this.heap[i] = swap03;
          i = i * 2 + 1;
        };
        left = 2 * i;
        right = 2 * i + 1;
        // If we get to the bottom of the heap then break the while loop
        if (this.heap[left] === undefined || this.heap[right] === undefined) {
          break;
        };
      }
    // If heap length is two then we know only 1 element in the array - just null and one node
    } else if (this.heap.length === 2) {
      this.heap = [null, ...this.heap.slice(2)];
      // If there's nothing in the heap then return null
    } else {
      return null;
    };
    return smallest;
  }

  // Heap-sort is one of the most efficient sorting algorithms
  // O(n log n) in avg and worst case
  // Works by placing every item into a min heap then extracting the items
  // into a new array. Ensures new array contains items in least to greatest order
  // After all, the item removed is always top item which is always min
  returnSorted() {
    const result = [];
    while (this.heap.length > 1) {
      result.push(this.remove());
    }
    return result;
  }

  values() {
    return this.heap;
  }

}

// left child: i * 2
// right child: i * 2 + 1
// parent: Math.floor(i / 2)

class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  insert(num) {
    // Push new item onto bottom of heap
    this.heap.push(num);
    // If this is only item on heap then do nothing. Already sorted
    if (this.heap.length > 2) {
      // Get index to start swapping new item upwards as needed
      let index = this.heap.length - 1;
      while (this.heap[index] > this.heap[Math.floor(index / 2)]) {
        // If node is greater than it's parent node then swap it upwards
        if (index > 1) {
          let currentNode = this.heap[index];
          let parentNode = this.heap[Math.floor(index / 2)];
          this.heap[index] = parentNode;
          this.heap[Math.floor(index / 2)] = currentNode;
          // Reset index to parent node
          index = Math.floor(index / 2);
        } else {
          break;
        }
      }
    }
  }

  // left child: i * 2
  // right child: i * 2 + 1
  // parent: Math.floor(i / 2)

  remove() {
    const largest = this.heap[1];
    if (this.heap.length > 2) {
      this.heap[1] = this.heap[this.heap.length - 1];
      // Remove last node that was just placed at top
      this.heap = this.heap.slice(0, this.heap.length - 1);
      // If length is 3 then there's only 2 nodes and this is very simple single swap
      if (this.heap.length === 3) {
        if (this.heap[1] < this.heap[2]) {
          let parent = this.heap[1];
          let childSwap = this.heap[2];
          this.heap[1] = childSwap;
          this.heap[2] = parent;
        }
        return largest;
      }
      let index = 1;
      // As long as the current node is smaller than either child node keep trickling down
      while (this.heap[index] < this.heap[index * 2] || this.heap[index] < this.heap[index * 2 + 1]) {
          // If left child is greater than right child then swap with left child
          if (this.heap[index * 2] > this.heap[index * 2 + 1]) {
            let parent = this.heap[index];
            let childSwap = this.heap[index * 2];
            this.heap[index] = childSwap;
            this.heap[index * 2] = parent;
            // Set new node to be the left child
            index = index * 2;
          // Else swap with right child
          } else {
            let parent = this.heap[index];
            let childSwap = this.heap[index * 2 + 1];
            this.heap[index] = childSwap;
            this.heap[index * 2 + 1] = parent;
            // Set new node to be the right child
            index = index * 2 + 1;
          }
          // If we get to bottom of heap then break
          if (this.heap[index * 2] === undefined || this.heap[index * 2 + 1] === undefined) {
            break;
          }
      }
    } else if (this.heap.length === 2) {
      this.heap = [null, ...this.heap.slice(2)];
    } else {
      return null;
    }
    return largest;
  }

  returnSorted() {
    const result = [];
    while (this.heap.length > 1) {
      result.push(this.remove());
    }
    return result;
  }

  values() {
    return this.heap;
  }
}

let maxheap = new MaxHeap();

[10, 45, 23, 7, 3, 8, 20, 93, 100].forEach(e => maxheap.insert(e));
console.log('MaxHeap operations:');
console.log(maxheap.values());
console.log(maxheap.remove());
console.log(maxheap.values());
console.log(maxheap.returnSorted());
console.log(maxheap.values());


let minheap = new MinHeap();

[10, 45, 23, 7, 3, 8, 20, 93, 100].forEach(e => minheap.insert(e));
console.log('MinHeap operations:');
console.log(minheap.values());
console.log(minheap.remove());
console.log(minheap.values());
console.log(minheap.returnSorted());
console.log(minheap.values());
