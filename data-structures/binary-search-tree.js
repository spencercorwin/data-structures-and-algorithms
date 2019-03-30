
class BinarySearchTree {
  constructor() {
    this.root = null;
    this.depth = 0;
  }

  addNode(node) {
    if (this.root === null) {
      this.root = node;
      return;
    } else {
      let comparisonNode = this.root;
      let leftDepth = 0;
      let rightDepth = 0;
      while (true) {
        if (node.value > comparisonNode.value) {
          // Move right
          rightDepth++;
          if (comparisonNode.right === null) {
            comparisonNode.right = node;
            leftDepth + rightDepth > this.depth ? this.depth = leftDepth + rightDepth : this.depth = this.depth;
            break;
          } else {
            comparisonNode = comparisonNode.right;
          }
        } else {
          // Move left
          leftDepth++;
          if (comparisonNode.left === null) {
            comparisonNode.left = node;
            leftDepth + rightDepth > this.depth ? this.depth = leftDepth + rightDepth : this.depth = this.depth;
            break;
          } else {
            comparisonNode = comparisonNode.left;
          }
        }
      }
    }
  }

  findMin() {
    if (this.root === null) {
      return false;
    } else {
      let currentNode = this.root;
      while (true) {
        if (currentNode.left !== null) {
          currentNode = currentNode.left;
        } else {
          return currentNode.value;
        }
      }
    }
  }

  findMax() {
    if (this.root === null) {
      return false;
    } else {
      let currentNode = this.root;
      while (true) {
        if (currentNode.right !== null) {
          currentNode = currentNode.right;
        } else {
          return currentNode.value;
        }
      }
    }
  }

  isPresent(value) {
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.value === value) {
        return true;
      } else {
        if (value > currentNode.value) {
          currentNode = currentNode.right;
        } else {
          currentNode = currentNode.left;
        }
      }
    }
    return false;
  }

  find(value) {
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.value === value) {
        return currentNode;
      } else {
        if (value > currentNode.value) {
          currentNode = currentNode.right;
        } else {
          currentNode = currentNode.left;
        }
      }
    }
    return null;
  }

  remove(value) {
    const removeNode = (node, value) => {
      if (node === null) {
        return null;
      }
      // If node passed in is the one we're looking for then do stuff
      if (node.value === value) {

      // If node we're looking for is less than current node then go to left node
      // and try again
      } else if (node.value > value) {

      // If node we're looking for is greater than current node then go right
      // and try again
      } else {

      }
    }

    // Start with root node
    this.root = removeNode(this.root, value);
  }

}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const BST = new BinarySearchTree();
[10, 5, 6, 31, 30, 100, 101, 102, 103].forEach(num => BST.addNode(new Node(num)));
console.log(BST);
console.log(BST.findMin());
console.log(BST.findMax());
console.log(BST.isPresent(6));
console.log(BST.isPresent(7));
console.log(BST.find(30));
console.log(BST.find(32));
