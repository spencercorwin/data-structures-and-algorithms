class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

// Be careful to handle any possible edge cases when writing these methods, such as deletions for the first or last element
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null; // Tail points to last item but last item's .next points to null
    this.length = 0;
  }

  // Adds new node at the beginning (head)
  addAtHead(input) {
    const node = new Node(input);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      node.next = null;
    } else {
      const newSecond = this.head;
      newSecond.prev = node;
      node.prev = null;
      this.head = node;
      node.next = newSecond;
    }
    this.length++;
  }

  addAtTail(input) {
    const node = new Node(input);
    if (this.tail === null) {
      this.head = node;
      this.tail = node;
      node.next = null;
    } else {
      const newSecond = this.tail;
      newSecond.next = node;
      node.prev = newSecond;
      this.tail = node;
      node.next = null;
    }
    this.length++;
  }

  remove(input) {
    if (this.head === null) {
      return null;
    } else if (this.head.value === input) {
      this.removeFromHead();
    } else if (this.tail.value === input) {
      this.removeFromTail();
    } else {
      let currentNode = this.head;
      while (currentNode) {
        if (currentNode.value === input) {
          currentNode.prev.next = currentNode.next;
          currentNode.next.prev = currentNode.prev;
          break;
        }
        currentNode = currentNode.next;
      }
    }
    this.legnth--;
  }

  removeFromHead() {
    if (this.head === null) {
      return null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    this.length--;
  }

  removeFromTail() {
    if (this.tail === null) {
      return null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.length--;
  }

  // My version of "print"
  values() {
    const result = [];
    let currentNode = this.head;
    for (let i = 0; i < this.length; i++) {
      result.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return result;
  }

  print() {
    if (this.head === null) {
      return null;
    } else {
      let result = [];
      let node = this.head;
      while (node.next !== null) {
        result.push(node.value);
        node = node.next;
      };
      result.push(node.value);
      return result;
    }
  }

  printReverse() {
    if (this.tail === null) {
      return null;
    } else {
      let result = [];
      let node = this.tail;
      while (node.prev !== null) {
        result.push(node.value);
        node = node.prev;
      };
      result.push(node.value);
      return result;
    }
  }

}


const test = new DoublyLinkedList();

test.addAtTail(25);
test.addAtTail(35);
test.addAtTail(60);
console.log(test.print());
test.remove(60);

console.log(test.print());
