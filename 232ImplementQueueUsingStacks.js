/**
 * ------------------------------------------------------------
 * Problem: Implement Queue using Stacks
 * ------------------------------------------------------------
 * Implement a FIFO queue using only stack operations.
 *
 * We use two stacks:
 *   - inStack  (for push operations)
 *   - outStack (for pop/peek operations)
 *
 * Time Complexity (Amortized):
 *   push  -> O(1)
 *   pop   -> O(1)
 *   peek  -> O(1)
 *   empty -> O(1)
 * ------------------------------------------------------------
 */

var MyQueue = function() {
    this.inStack = [];
    this.outStack = [];
};

/**
 * Push element x to the back of queue.
 */
MyQueue.prototype.push = function(x) {
    this.inStack.push(x);
};

/**
 * Move elements from inStack → outStack if needed.
 * This reverses order and exposes oldest element.
 */
MyQueue.prototype.moveStacks = function() {
    if (this.outStack.length === 0) {
        while (this.inStack.length > 0) {
            this.outStack.push(this.inStack.pop());
        }
    }
};

/**
 * Removes element from front of queue.
 */
MyQueue.prototype.pop = function() {
    this.moveStacks();
    return this.outStack.pop();
};

/**
 * Returns front element without removing it.
 */
MyQueue.prototype.peek = function() {
    this.moveStacks();
    return this.outStack[this.outStack.length - 1];
};

/**
 * Returns true if queue is empty.
 */
MyQueue.prototype.empty = function() {
    return this.inStack.length === 0 && this.outStack.length === 0;
};
