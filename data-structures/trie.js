class Node {
  constructor() {
    this.keys = new Map();
    this.end = false;
  }
  setEnd() {
    this.end = true;
  }
  isEnd() {
    return this.end;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  // Adds a word to trie
  add(input, node = this.root) {
    // If we're at the end of the word passed in
    // this signals end of recursive function
    if (input.length === 0) {
      node.setEnd();
      return;
    // If we're not at the end of the word
    // check if the node contains the letter that we're already looking at
    // node.keys is all the letters that the node points to (immediately)
    // input[0] is just the first character of the passed-in string
    // So if the current node doesn't have a child that is input[0]...
    } else if (!node.keys.has(input[0])) {
      // ...then create a child node with that character
      node.keys.set(input[0], new Node());
      // Pass in the input string but with all the remaining letters
      // and do the same thing recursively.
      // Pass in the node we just created two lines above
      return this.add(input.substr(1), node.keys.get(input[0]));
    } else {
      // If there is already a letter by that name then don't add that letter
      // as a child node and just move to next letter and perform recursion
      return this.add(input.substr(1), node.keys.get(input[0]));
    }
  }

  // Checks if the trie contains a given word
  isWord(word) {
    let node = this.root;
    while (word.length > 1) {
      // Check if first character of current string
      // is a child node of current node
      // If not then it's not contained in trie and return false
      if (!node.keys.has(word[0])) {
        return false;
      // If it is then move to that child node and run again with
      // the next character in the input word
      } else {
        node = node.keys.get(word[0]);
        word = word.substr(1);
      };
    };
    // At this point "word" is a single letter- the last letter
    // (notice that while-loop stops before last letter)
    return (node.keys.has(word) && node.keys.get(word).isEnd()) ? true : false;
  }

  // Helper function
  print() {
    const words = [];
    const search = (node, string) => {
      // If current node's keys size is not 0 then there's still more letter to search through
      if (node.keys.size != 0) {
        // For each child node of the current node run the same search
        for (let letter of node.keys.keys()) {
          // string.concat will add the current letter to the string to be searched
          // Keep concating letters until we get full strings
          search(node.keys.get(letter), string.concat(letter));
        };
        // If we get to the end of a valid word then push it onto result array
        if (node.isEnd()) {
          words.push(string);
        }
      } else {
        // Once we get to last letters then
        string.length > 0 ? words.push(string) : undefined;
      }
    }
    search(this.root, '');
    return words.length > 0 ? words : null;
  }
}

const trie = new Trie();
['ball', 'bat', 'doll', 'dork', 'do', 'dorm', 'send', 'sense'].forEach(e => trie.add(e));

console.log(trie.isWord('doll'));
console.log(trie.isWord('dor'));
console.log(trie.isWord('dorf'));
console.log(trie.print());
