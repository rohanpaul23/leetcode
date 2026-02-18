/**
 * ------------------------------------------------------------
 * Problem: Implement Stack using Two Queues
 * ------------------------------------------------------------
 * Implement a LIFO stack using only standard queue operations:
 *  - push to back
 *  - pop from front
 *  - peek front
 *  - size / isEmpty
 *
 * Approach:
 *  - Maintain q1 as the main stack queue
 *  - Use q2 as a helper queue
 *  - On push:
 *      1) Insert new element into q2
 *      2) Move all elements from q1 → q2
 *      3) Swap q1 and q2
 *
 * This guarantees:
 *   Front of q1 = Top of stack
 *
 * Time Complexity:
 *   push  -> O(n)
 *   pop   -> O(1)
 *   top   -> O(1)
 *   empty -> O(1)
 * ------------------------------------------------------------
 */

var MyStack = function() {
    this.q1 = []; // main queue (stores stack)
    this.q2 = []; // helper queue
};

/** 
 * Push element x onto stack.
 * 
 * Steps:
 * 1. Push x into q2.
 * 2. Move all elements from q1 to q2.
 * 3. Swap q1 and q2.
 */
MyStack.prototype.push = function(x) {
    // Step 1
    this.q2.push(x);

    // Step 2
    while (this.q1.length > 0) {
        this.q2.push(this.q1.shift());
    }

    // Step 3: swap queues
    let temp = this.q1;
    this.q1 = this.q2;
    this.q2 = temp;
};

/**
 * Removes and returns the top element.
 * Since top is always at front of q1,
 * just dequeue.
 */
MyStack.prototype.pop = function() {
    return this.q1.shift();
};

/**
 * Returns top element without removing it.
 */
MyStack.prototype.top = function() {
    return this.q1[0];
};

/**
 * Returns true if stack is empty.
 */
MyStack.prototype.empty = function() {
    return this.q1.length === 0;
};
