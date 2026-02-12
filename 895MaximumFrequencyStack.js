/**
 * Problem: Maximum Frequency Stack (FreqStack)
 * --------------------------------------------
 * Design a stack-like data structure that supports the following operations:
 *
 *   1) push(val): Push an integer val onto the stack.
 *   2) pop(): Remove and return the most frequent element in the stack.
 *
 * Rules:
 * - The element with the HIGHEST FREQUENCY should be removed first.
 * - If multiple elements have the same highest frequency,
 *   return the one closest to the top (most recently pushed among them).
 *
 * Example:
 *   push(5)
 *   push(7)
 *   push(5)
 *   push(7)
 *   push(4)
 *   push(5)
 *
 *   pop() → 5   (freq 5 = 3, highest)
 *   pop() → 7   (freq 5 = 2, freq 7 = 2, tie → 7 is more recent at freq 2)
 *   pop() → 5
 *   pop() → 4
 *
 * -------------------------------------------------------------------
 * Approach (O(1) Time for push & pop)
 * -------------------------------------------------------------------
 *
 * We maintain three things:
 *
 * 1) freq: Map<number, number>
 *      - Tracks frequency of each value.
 *      - Example: freq.get(5) = 3
 *
 * 2) group: Map<number, Array<number>>
 *      - Key = frequency
 *      - Value = stack (array used as stack) of values that reached that frequency.
 *      - Example:
 *            group.get(2) = [5, 7]
 *        Means:
 *            5 reached freq 2 first
 *            7 reached freq 2 later (so it’s on top)
 *
 * 3) maxFreq: number
 *      - Keeps track of the current highest frequency.
 *
 * Why group works:
 * - Each frequency has its own stack.
 * - When multiple values tie in frequency,
 *   we simply pop from the stack of that frequency.
 * - Stack automatically ensures the most recent element is removed first.
 *
 * Time Complexity:
 * - push() → O(1)
 * - pop()  → O(1)
 *
 * Space Complexity:
 * - O(n) for storing frequencies and grouped stacks.
 */

class FreqStack {
  constructor() {
    // Map to track value → frequency
    this.freq = new Map();

    // Map to track frequency → stack of values
    this.group = new Map();

    // Tracks the highest frequency currently in the stack
    this.maxFreq = 0;
  }

  /**
   * Pushes a value onto the stack.
   * @param {number} val
   */
  push(val) {
    // 1️⃣ Increase frequency of val
    const newFreq = (this.freq.get(val) || 0) + 1;
    this.freq.set(val, newFreq);

    // 2️⃣ If no stack exists for this frequency, create one
    if (!this.group.has(newFreq)) {
      this.group.set(newFreq, []);
    }

    // 3️⃣ Push value into the stack corresponding to its frequency
    // This preserves recency among same-frequency values
    this.group.get(newFreq).push(val);

    // 4️⃣ Update maxFreq if needed
    if (newFreq > this.maxFreq) {
      this.maxFreq = newFreq;
    }
  }

  /**
   * Removes and returns the most frequent element.
   * If tie, returns the most recently pushed among them.
   * @returns {number}
   */
  pop() {
    // 1️⃣ Get stack of values at highest frequency
    const stackAtMax = this.group.get(this.maxFreq);

    // 2️⃣ Pop the most recent value from this frequency stack
    const val = stackAtMax.pop();

    // 3️⃣ Decrease frequency of that value
    this.freq.set(val, this.freq.get(val) - 1);

    // 4️⃣ If no more elements exist at this frequency level,
    //      reduce maxFreq
    if (stackAtMax.length === 0) {
      this.group.delete(this.maxFreq);
      this.maxFreq--;
    }

    // 5️⃣ Return the popped value
    return val;
  }
}

/* ----------------------------
   Example Usage + Dry Run
---------------------------- */

const fs = new FreqStack();

fs.push(5);
fs.push(7);
fs.push(5);
fs.push(7);
fs.push(4);
fs.push(5);

console.log(fs.pop()); // 5 (most frequent: freq 3)
console.log(fs.pop()); // 7 (tie freq 2, 7 most recent at freq 2)
console.log(fs.pop()); // 5
console.log(fs.pop()); // 4
