
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

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
        // Node has no children
        if (node.left === null && node.right === null) {
          return null;
        }
        // Node has no left child
        if (node.left === null) {
          return node.right;
        }
        // Node has no right child
        if (node.right === null) {
          return node.left;
        }
        // Node has two children
        // Set tempNode to the right child of node to remove
        let tempNode = node.right;
        // If tempNode has left values then reset tempNode to the left node all the way down
        // until tempNode is set to the most leftward node. tempNode will replace node being removed
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        // Set node to be removed to the tempNode value
        node.value = tempNode.value;
        // Do same operation down the tree to the right of node
        node.right = removeNode(node.right, tempNode.value);
        return node;
      // If node we're looking for is less than current node then go to left node
      // and try again
      } else if (value < node.value) {
        node.left = removeNode(node.left, value);
        return node;
      // If node we're looking for is greater than current node then go right
      // and try again
      } else {
        node.right = removeNode(node.right, value);
        return node;
      }
    }

    // Start with root node
    this.root = removeNode(this.root, value);
  }

  // minHeight is distance to first node without two children
  findMinHeight(node = this.root) {
    if (node === null) {
      return -1;
    }
    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);
    if (left < right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }

  // Distance from root to furthest leaf
  findMaxHeight(node = this.root) {
    if (node === null) {
      return -1;
    }
    let left = this.findMaxHeight(node.left);
    let right = this.findMaxHeight(node.right);
    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }

  // A tree is balanced if the values between the minHeight and maxHeight are at most 1
  // A tree is more efficient when balanced
  isBalanced() {
    return this.findMaxHeight() - this.findMinHeight() <= 1;
  }

  // Depth first search that starts at left-most node and ends at right-most node
  inOrder() {
    if (this.root === null) {
      return null;
    } else {
      let result = [];
      const traverseInOrder = node => {
        // If left node exists then keep going to left node
        if (node.left) {
          traverseInOrder(node.left);
        }
        result.push(node.value);
        // If right node exists then call function on right node
        if (node.right) {
          traverseInOrder(node.right);
        }
      }
      traverseInOrder(this.root);
      return result;
    }
  }

  // Explores root nodes before leaf nodes
  // Depth first search from left to right
  preOrder() {
    if (this.root === null) {
      return null;
    } else {
      let result = [];
      const traverseInOrder = node => {
        result.push(node.value);
        // If left node exists then keep going to left node
        if (node.left) {
          traverseInOrder(node.left);
        }
        // If right node exists then call function on right node
        if (node.right) {
          traverseInOrder(node.right);
        }
      }
      traverseInOrder(this.root);
      return result;
    }
  }

  // Explores leaf nodes before root nodes
  // Depth first search
  postOrder() {
    if (this.root === null) {
      return null;
    } else {
      let result = [];
      const traverseInOrder = node => {
        // If left node exists then keep going to left node
        if (node.left) {
          traverseInOrder(node.left);
        }
        // If right node exists then call function on right node
        if (node.right) {
          traverseInOrder(node.right);
        }
        result.push(node.value);
      }
      traverseInOrder(this.root);
      return result;
    }
  }

  // Breadth first search
  levelOrder() {
    let result = [];
    let queue = [];
    if (this.root !== null) {
      // Push first node onto queue (root node)
      queue.push(this.root);
      // while loop will stop when there are no more child nodes being added to the queue
      // because queue is decreased by 1 each loop
      while(queue.length > 0) {
        // currentNode starts at root
        // Set currentNode and remove it from queue so we don't re-evaluate it later
        let currentNode = queue.shift();
        result.push(currentNode.value);
        // Get children of current node onto queue in left-right order
        if (currentNode.left !== null) {
          queue.push(currentNode.left);
        }
        if (currentNode.right !== null) {
          queue.push(currentNode.right);
        }
      }
      // When we break out of while loop then return result
      return result;
    } else {
      return null;
    }
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
BST.remove(10);
console.log('isBalanced: ' + BST.isBalanced());
console.log('findMinHeight: ' + BST.findMinHeight());
console.log('findMaxHeight: ' + BST.findMaxHeight());
console.log('inOrder: ' + BST.inOrder());
console.log('preOrder: ' + BST.preOrder());
console.log('postOrder: ' + BST.postOrder());
console.log('levelOrder: ' + BST.levelOrder());
