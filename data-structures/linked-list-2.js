
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  size() {
    return this.length;
  }

  getHead() {
    return this.head;
  }

  add(element) {
    const node = new Node(element);
    if (this.head === null) {
      this.head = node;
    } else {
      let currentNode = this.head;
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }
      currentNode.next = node;
    }
    this.length++;
  }

  remove(element) {
    if (this.head.element === element) {
      this.head = this.head.next;
    }
    let currentNode = this.head;
    while (true) {
      if (currentNode.next.element === element) {
        currentNode.next = currentNode.next.next;
        break;
      }
      currentNode = currentNode.next;
    }
    this.length--;
  }

  isEmpty() {
    return length === 0;
  }

  indexOf(element) {
    let currentNode = this.head;
    for (let i = 0; i < this.length; i++) {
      if (currentNode.element === element) {
        return i;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  elementAt(index) {
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  addAt(index, element) {
    const newNode = new Node(element);
    const node = this.elementAt(index - 1);
    const nextBeforeInsert = node.next;
    node.next = newNode;
    node.next.next = nextBeforeInsert;
    this.length++;
  }

  removeAt(index) {
    const node = this.elementAt(index - 1);
    node.next = this.elementAt(index + 1);
    this.length--;
  }

  getValues() {
    let result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(this.elementAt(i).element);
    }
    return result;
  }

}

const linkedlist = new LinkedList();

[3, 5, 6, 1, 8, 40].forEach(e => linkedlist.add(e));

console.log(linkedlist.size());
console.log(linkedlist.getValues());
linkedlist.remove(6);
console.log(linkedlist.size());
console.log(linkedlist.getValues());
console.log(linkedlist.indexOf(40));
console.log(linkedlist.elementAt(4));
linkedlist.addAt(1, 100);
console.log(linkedlist.getValues());
linkedlist.removeAt(1);
console.log(linkedlist.getValues());
