import LinkedList from "./linked-list.js";

class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = [];

    this.#init();
  }

  hash(key) {
    let hashCode = 0;

    let primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  #init() {
    for (let i = 0; i < this.capacity; i++) {
      let list = new LinkedList();
      this.buckets.push([list]);
    }
  }

  bucket(key) {
    let index = this.hash(key);
    return this.buckets[index];
  }

  set(key, value) {
    let bucket = this.bucket(key);
    let list = bucket[0];

    if (list.size() === 0) {
      list.append(key, value);
    }

    if (list.contains(key)) {
      let nodeIndex = list.find(key);
      let foundNode = list.at(nodeIndex);

      foundNode.key = key;
      foundNode.value = value;
    } else {
      list.append(key, value);
    }
  }
}

const test = new HashMap();

console.log(test.set("Rama", "hi"));

console.log(test.set("Sita", "nothing"));

console.log(test);

console.log(test.hash("Rama"));

// console.log(test.init());

console.log("Console working!");
