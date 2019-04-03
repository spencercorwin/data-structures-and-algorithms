// https://medium.com/@julianknodt/red-black-trees-in-javascript-c20eec1d5d1c

const identity = i => i;
const RIGHT = 1;
const LEFT = 0;
const oppDir = dir => dir === RIGHT ? LEFT : RIGHT;
class BinaryTree {
    constructor(value, identifier = identity) {
        this.value = value;
        this.children = [];
        this.identifier = identifier;
        this.parent = undefined;
    }

    get right() {
      return this.children[RIGHT];
    }

    get left() {
      return this.children[LEFT];
    }

    set right(value) {
      this.children[RIGHT] = value;
    }

    set left(value) {
      this.children[LEFT] = value;
    }

    get isRightChild() {
      // If this.parent is undefined then return false
      // Otherwise check if this object is equal to right child of parent
      return this.parent ? this.parent.right === this : false;
    }

    get isLeftChild() {
      return this.parent ? this.parent.left === this : false;
    }

    get isRoot() {
      return this.parent === undefined;
    }

    get uncle() {
      return this.grandparent ? (this.parent.isRightChild ? this.grandparent.left : this.grandparent.right) : undefined;
    }

    get sibling() {
      return this.parent ? (this.isRightChild ? this.parent.left : this.parent.right) : undefined;
    }

    get grandparent() {
      return this.parent ? this.parent.parent : undefined;
    }

    get isLeaf() {
      return this.children[RIGHT] === undefined && this.children[LEFT] === undefined;
      // return this.children.every(child => child === undefined);
    }

    get hasOneChild() {
      return this.children.length === 1;
      // return (this.right !== undefined && this.left === undefined) || (this.right === undefined && this.left !== undefined)
    }

    get hasTwoChildren() {
      return (this.right !== undefined && this.left !== undefined);
    }

    _swapWithParent() {
      // Create replacement node to replace old one
      // (same parent pointer, children pointers, value, identifier)
      let replacement = new BinaryTree(this.value, this.identifier);
      replacement.parent = this.parent;
      replacement.children = this.children;

      // Change old parent's children pointer to point to replacement node
      // instead of *this* (new parent)
      if (this.parent !== undefined) {
        if (this.isRightChild) {
          this.parent.right = replacement;
        } else {
          this.parent.left = replacement;
        }
      }

      // Change current node (new parent's) value, children, and parent to be equal
      // to old parent's value, children, and parent
      this.value = replacement.parent.value;
      this.children = replacement.parent.children;
      this.parent = replacement.parent.parent;

      // Change current node's (new parent's) childrens' parent pointerss to be
      // *this*, the new parent
      this.children.forEach(child => {
        if (child) {
          child.parent = this;
        }
      })

      // Change current node's (new parent's) childrens' childrens' parent pointers
      // to their new appropriate parent (not *this* the new parent)
      this.children.forEach(child => {
        if (child) {
          child.children.forEach(kid => {
            if (kid) {
              kid.parent = child;
            }
          })
        }
      })
    }

    rotateRight() {
      this._rotate(RIGHT);
      this._swapWithParent();
    }
    rotateLeft() {
      this._rotate(LEFT);
      this._swapWithParent();
    }

    _rotate(dir) {
      let opposite = oppDir(dir);
      // Set pivot node to be current node's opporite child
      let pivot = this.children[opposite];
      // Set current node's opposite child to be one of pivot node's children
      this.children[opposite] = pivot.children[dir];
      // Set current node to be pivot node's new child
      pivot.children[dir] = this;
      // Set pivot node's parent to be current node's parent
      pivot.parent = this.parent;
      // Set pivot node's (new) childrens' parent to point to pivot
      pivot.children.forEach(child => {
        if (child) {
          child.parent = pivot;
        }
      })
      // Set current node's (new) children's parent to point to current node
      this.children.forEach(child => {
        if (child) {
          child.parent = this;
        }
      })
      // Then swap current node with current node's parent node...
    }

    insert(value) {
      if (this.value === undefined) {
        this.value = value;
        return this;
      } else {
        let dir;
        if (this.identifier(value) > this.identifier(this.value)) {
          dir = RIGHT;
        } else {
          dir = LEFT;
        }
        if (this.children[dir] === undefined) {
          let newTree = new BinaryTree(value, this.identifier);
          newTree.parent = this;
          this.children[dir] = newTree;
          return newTree;
        } else {
          return this.children[dir].insert(value);
        }
      }
    }

    find(value) {
      let identifiedValue = this.identifier(value);
      let thisValue = this.identifier(this.value);
      if (thisValue === identifiedValue) {
        return this.value;
      } else {
        let dir;
        if (thisValue < identifiedValue) {
          dir = RIGHT;
        } else {
          dir = LEFT;
        }
        if (this.chidrren[dir] === undefined) {
          return undefined;
        } else {
          return this.children[dir].find(value);
        }
      }
    }

    contains(value) {
      return this.find(value) !== undefined;
    }

    _minimumChild() {
      let current = this;
      while (current.left !== undefined) {
        current = current.left;
      }
      return current;
    }

    minimum() {
      return this._minimumChild().value;
    }

    _maximumChild() {
      let current = this;
      while (current.left !== undefined) {
        current = current.right;
      }
      return current;
    }

    maximum() {
      return this._maximumChild().value;
    }

    remove(value) {
      let identifiedValue = this.identifier(value);
      let thisValue = this.identifier(this.value);
      if (thisValue === identifiedValue) {
        if (this.isLeaf) {
          if (this.isRoot) {
            this.value = undefined;
          } else if (this.isRightChild) {
            this.parent.right = undefined;
          } else if (this.isLeftChild) {
            this.parent.left = undefined;
          }
        } else if (this.hasOneChild) {
          let rmDir = this.right ? LEFT : RIGHT;
          this.right ? this.rotateLeft() : this.rotateRight();
          this.children[rmDir] = undefined;
        } else if (this.hasTwoChildren) {
          let replacement = this.right._minimumChild();
          this.value = replacement.value;
          this.right.remove(replacement.value);
        }
      } else {
        let dir;
        if (thisValue < identifiedValue) {
          dir = RIGHT;
        } else {
          dir = LEFT;
        }
        if (this.children[dir] === undefined) {
          return undefined;
        } else {
          return this.children[dir].remove(value);
        }
      }
    }
}

// Now implement Red Black Tree
// Each node is either red or black
// Root is always black
// All leaves are black
// If a node is red then both its children are black
// Every path from any node to a leaf contains the same number of black leaves
// All nodes are inserted as red nodes

const BLACK = 'b';
const RED = 'r';

class RedBlackTree extends BinaryTree {
  constructor(value, identifier = identity, color = BLACK) {
    super(value, identifier);
    this.color = color;
  }

  // Swap needs to be modified to swap colors
  _swapWithParent() {
    let replacement = new RedBlackTree(this.value, this.identifier, this.color);
    replacement.parent = this.parent;
    replacement.children = this.children;
    if (this.parent !== undefined) {
      if (this.isRightChild) {
        this.parent.right = replacement;
      } else {
        this.parent.left = replacement;
      }
    }
    this.value = replacement.parent.value;
    this.children = replacement.parent.children;
    this.parent = replacement.parent.parent;
    this.color = replacement.parent.color;
    this.children.forEach(child => {
      if (child) {
        child.parent = this;
      }
    })
    this.children.forEach(child => {
      if (child) {
        child.children.forEach(kid => {
          if (kid) {
            kid.parent = child;
          }
        })
      }
    })
  }

  paintBlack() {
    this.color = BLACK;
  }

  paintRed() {
    this.color = RED;
  }

  get isBlack() {
    return this.color === BLACK;
  }

  get isRed() {
    return this.color === RED;
  }

  // Search is the same as before but insertion and deletion need to change
  paint() {
    return this._insert1();
  }

  _insert1() {
    if (this.parent === undefined) {
      this.paintBlack();
      return;
    } else {
      this._insert2();
    }
  }

  _insert2() {
    if (this.parent.isBlack) {
      return;
    } else {
      this._insert3();
    }
  }

  _insert3() {
    let uncle = this.uncle;
    if (uncle ? uncle.isRed : false) {
      this.parent.paintBlack();
      uncle.paintBlack();
      this.grandparent.paintRed();
      this.grandparent.paint();
      return;
    } else {
      this._insert4();
    }
  }

  _insert4() {
    if (this.isRightChild && this.parent.isLeftChild) {
      this.parent.rotateLeft();
      return;
    } else if (this.isLeftChild && this.parent.isRightChild) {
      this.parent.rotateRight();
      return;
    }
    this._insert5();
  }

  _insert5() {
    this.parent.paintBlack();
    this.grandparent.paintRed();
    if (this.isLeftChild) {
      this.grandparent.rotateRight();
    } else {
      this.grandparent.rotateLeft();
    }
    return;
  }

  insert(value) {
    if (this.value === undefined) {
      this.value = value;
      this.paintBlack();
      return;
    }
    let dir;
    if (this.identifier(value) > this.identifier(this.value)) {
      dir = RIGHT;
    } else {
      dir = LEFT;
    }
    if (this.children[dir] !== undefined) {
      return this.children[dir].insert(value);
    } else {
      let child = new RedBlackTree(value, this.identifier, RED);
      child.parent = this;
      let parent = child.parent;
      this.children[dir] = child;
      child.paint();
      return child;
    }
  }

  remove(value) {
    let identifiedValue = this.identifier(value);
    let thisValue = this.identifier(this.value);
    if (thisValue === identifiedValue) {
      this.rmPaint(value);
      return;
    } else {
      let dir;
      if (thisValue < identifiedValue) {
        dir = RIGHT;
      } else {
        dir = LEFT;
      }
      if (this.children[dir] === undefined) {
        return undefined;
      } else {
        return this.children[dir].remove(value);
      }
    }
  }

  stardardRemove(value) {
    if (this.isLeaf) {
      if (this.isRoot) {
        this.value = undefined;
        this.paintBlack();
      } else if (this.isRightChild) {
        this.parent.right = undefined;
      } else if (this.isLeftChild) {
        this.parent.left = undefined;
      }
    } else if (this.hasOneChild) {
      let rmDir = this.right ? LEFT : RIGHT;
      this.right ? this.rotateLeft() : this.rotateRight();
      this.children[rmDir] = undefined;
    } else if (this.hasTwoChildren) {
      let replica = this.right._minimumChild();
      this.value = replica.value;
      this.right.remove(replica.value);
    }
  }

  rmPaint(value) {
    if (!this.hasTwoChildren) {
      this._remove0();
    }
    this.standardRemove(value);
  }

  _remove0() {
    let childIsRed = this.hasOneChild ? (this.right ? this.right.isRed : this.left.isRed) : false;
    if (this.isBlack) {
      if (childIsRed) {
        this.right ? this.right.paintBlack() : this.left.paintBlack();
      } else {
        if (this.parent ? this.parent.isBlack : false) {
          this._remove1();
        }
      }
    }
  }

  _remove1() {
    if (this.parent !== undefined) {
      this._remove2();
    }
  }

  _remove2() {
    let sib = this.sibling;
    if (sib && sib.isRed) {
      this.parent.paintRed();
      sub.paintBlack();
      if (this.isLeftChild) {
        this.parent.rotateLeft();
      } else if (this.isRightChild) {
        this.parent.rotateRight();
      }
    }
    this._remove3();
  }

  _remove3() {
    let sib = this.sibling;
    let sibIsBlack = sib ? sib.isBlack : true;
    let sibLeftBlack = sib ? (sib.left ? sib.left.isBlack : true) : true;
    let sibRightBlack = sib ? (sib.right ? sib.right.isBlack : true) : true;
    if (this.parent.isBlack && sib && sibIsBlack && sibLeftBlack && sibRightBlack) {
      sib.paintRed();
      this.parent._remove1();
    } else {
      this._remove4();
    }
  }

  _remove4() {
    let sib = this.sibling;
    let sibIsBlack = sib ? sib.isBlack : true;
    let sibLeftBlack = sib ? (sib.left ? sib.left.isBlack : true) : true;
    let sibRightBlack = sib ? (sib.right ? sib.right.isBlack : true) : true;
    if (this.parent.isRed && sib && sibIsBlack && sibLeftBlack && sibRightBlack) {
      sib.paintRed();
      this.parent.paintBlack();
    } else {
      this._remove5();
    }
  }

  _remove5() {
    let sib = this.sibling;
    if (this.isLeftChild && (sib.right ? sib.right.isBlack : true) && (sib.left ? sib.left.isRed : false)) {
      sib.paintRed();
      sib.left.paintBlack();
      sib.rotateRight();
    } else if (this.isRightChild && (sib.left ? sib.left.isBlack : true) && sib.right ? sib.right.isRed : false) {
      sib.paintRed();
      sib.right.paintBlack();
      sib.rotateLeft();
    }
    this._remove6();
  }

  _remove6() {
    let sib = this.sibling;
    if (sib) {
      this.parent.isBlack ? sib.paintBlack() : sib.paintRed();
    }
    this.parent.paintBlack();
    if (this.isLeftChild) {
      sib.right.paintBlack();
      this.parent.rotateLeft();
    } else {
      sib.left.paintBlack();
      this.parent.rotateRight();
    }
  }

  countBlackToRoot(count = 0) {
    if (this.parent === undefined) {
      return count;
    } else {
      return this.isBlack ? this.parent.countBlackToRoot(count + 1) : this.parent.countBlackToRoot(count);
    }
  }

}
