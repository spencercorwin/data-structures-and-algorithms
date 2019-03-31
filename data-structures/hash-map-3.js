
class HashTable {
  constructor() {
    this.map = [];
    this.storageLimit = 4;
  }

  _hash(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      // Get the character code for each character in string
      // charCode returns integer between 0 and 65535
      // Add them all together
      hash += string.charCodeAt(i);
    }
    // Modulo with size of table
    return hash % this.storageLimit;
  }

  // Uses chaining to handle collisions
  set(key, value) {
    // If space is open for that hashed key then simply add new key-value pair
    if (!this.map[this._hash(key)]) {
      this.map[this._hash(key)] = [[key, value]];
    // If space is taken then need to check if key is there or not
    } else {
      let inserted = false;
      for (let i = 0; i < this.map[this._hash(key)].length; i++) {
        // If key is there then reset key
        if (this.map[this._hash(key)][i][0] === key) {
          this.map[this._hash(key)][i][1] = value;
          inserted = true;
        }
      }
      // If the loop never finds key in this index then push the new key-value pair
      if (!inserted) {
        this.map[this._hash(key)].push([key, value]);
      }
    }
  }

  get(key) {
    const index = this.map[this._hash(key)];
    for (let i = 0; i < index.length; i++) {
      if (index[i][0] === key) {
        return index[i][1];
      }
    }
    return null;
  }

  remove(key) {
    const index = this.map[this._hash(key)];
    for (let i = 0; i < index.length; i++) {
      if (index[i][0] === key) {
        delete index[i][1];
      }
    }
    return null;
  }

}

const hashtable = new HashTable();

hashtable.set('spencer', 26);
hashtable.set('garrett', 24);
hashtable.set('baxter', 4);

console.log(hashtable.get('baxter'));
console.log(hashtable.get('spencer'));

hashtable.remove('spencer');
console.log(hashtable.get('spencer'));
