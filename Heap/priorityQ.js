class PriorityQueue {
  constructor(compare) {
    this.compare = compare;
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  add(element) {
    // Add the element at the next available tree position.
    this.heap.push(element);

    // Repair priority order by moving it upward.
    this.bubbleUp();
  }

  poll() {
    // No element to remove.
    if (this.heap.length === 0) {
      return undefined;
    }

    // No repair is required for a single-element heap.
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    // Save the highest-priority element.
    const head = this.heap[0];

    // Move the last element to the root.
    this.heap[0] = this.heap.pop();

    // Repair priority order by moving it downward.
    this.bubbleDown();

    return head;
  }

  bubbleUp() {
    // Start from the newly added element.
    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      // Stop if the parent already has equal or higher priority.
      if (
        this.compare(
          this.heap[index],
          this.heap[parentIndex]
        ) >= 0
      ) {
        break;
      }

      // Otherwise, move the current element one level upward.
      this.swap(index, parentIndex);

      // Follow it to its new location.
      index = parentIndex;
    }
  }

  bubbleDown() {
    // The last element was moved to the root.
    let index = 0;

    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;

      // Assume the current element is correctly positioned.
      let highestPriorityIndex = index;

      // Check whether the left child has higher priority.
      if (
        leftChildIndex < this.heap.length &&
        this.compare(
          this.heap[leftChildIndex],
          this.heap[highestPriorityIndex]
        ) < 0
      ) {
        highestPriorityIndex = leftChildIndex;
      }

      // Check whether the right child has higher priority
      // than the best candidate found so far.
      if (
        rightChildIndex < this.heap.length &&
        this.compare(
          this.heap[rightChildIndex],
          this.heap[highestPriorityIndex]
        ) < 0
      ) {
        highestPriorityIndex = rightChildIndex;
      }

      // Neither child has higher priority.
      if (highestPriorityIndex === index) {
        break;
      }

      // Move the current element one level downward.
      this.swap(index, highestPriorityIndex);

      // Follow it to its new location.
      index = highestPriorityIndex;
    }
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }
}