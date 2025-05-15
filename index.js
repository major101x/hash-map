import LinkedList from "./linked-list.js";

class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor; // Load factor to determine if array capacity should increase
    this.capacity = capacity; // Array capacity
    this.buckets = [];

    // Run private function to initialize buckets on instantiation
    this.#init();
  }

  /* Hashes the key and sets the number to not exceed the array capacity */
  hash(key) {
    let hashCode = 0;

    let primeNumber = 31; // Prime number reduces likelihood of collisions

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  /* Initializes individual buckets with linkedLists inside buckets array */
  #init() {
    for (let i = 0; i < this.capacity; i++) {
      let list = new LinkedList();
      this.buckets.push([list]);
    }
  }

  /* Returns bucket after hash is used to get bucket index */
  bucket(key) {
    let index = this.hash(key);
    return this.buckets[index];
  }

  /* Adds key and value to bucket in the hashMap */
  set(key, value) {
    let bucket = this.bucket(key); // Gets bucket
    let list = bucket[0]; // Selects instance of linkedList

    if (list.size() === 0) {
      list.append(key, value);
    }

    // if list contains key, overwrite the value. else, append new key and value to the list
    if (list.contains(key)) {
      let nodeIndex = list.find(key);
      let foundNode = list.at(nodeIndex);

      foundNode.key = key;
      foundNode.value = value;
    } else {
      list.append(key, value);
    }
  }

  /* Returns the value associated with key */
  get(key) {
    let value = null;
    let bucket = this.bucket(key); // Gets bucket
    let list = bucket[0]; // Selects instance of linkedList

    if (list.size() === 0) {
      return value;
    }

    if (list.contains(key)) {
      let nodeIndex = list.find(key);
      let foundNode = list.at(nodeIndex);

      value = foundNode.value; // Sets value to found Node value
    }

    return value;
  }

  /* Checks whether the key is in the hash map */
  has(key) {
    let hasKey = false;
    let bucket = this.bucket(key); // Gets bucket
    let list = bucket[0]; // Selects instance of linkedList

    if (list.size() === 0) {
      return hasKey; // Return false if list is empty
    }

    if (list.contains(key)) {
      hasKey = true;
    }

    return hasKey;
  }

  /* Removes a node from the hash map with matching key */
  remove(key) {
    let bucket = this.bucket(key); // Gets bucket
    let list = bucket[0]; // Selects instance of linkedList

    if (list.size() === 0) {
      throw new Error("Bucket is empty!");
    }

    if (list.contains(key)) {
      let nodeIndex = list.find(key);

      list.removeAt(nodeIndex);
    } else {
      throw new Error("Key not found"); // Throw error if key does not exist
    }
  }

  /* Returns the number of stored keys in the hash map */
  length() {
    let count = 0;

    for (let bucket of this.buckets) {
      let list = bucket[0]; // Selects instance of linkedList

      let size = list.size(); // gets the size of each linkedList

      count += size; // Adds the size to the count
    }

    return count;
  }

  /* Clears all entries in the hash map */
  clear() {
    this.buckets = []; // Resets the buckets array
    this.#init(); // Re-initializes the linkedLists inside the buckets
  }
}

const test = new HashMap();

/* TEST CODE */

test.set("Rama", "hi");
test.set("Pulpy", "hi");
test.set("Sita", "nothing");

console.log(test.get("Sita"));
console.log(test.get("Rama"));

console.log(test.has("Sita"));

test.remove("Sita");
test.remove("Pulpy");

console.log(test.has("Pulpy"));
console.log(test.has("Sita"));
console.log(test.has("Rama"));

console.log(test.length());

console.log(test);
test.clear();
console.log(test);

console.log(test.hash("Rama"));

// console.log(test.init());

console.log("Console working!");
