/**
 * -------------------------------------------------------------
 * Problem: Hand of Straights (LeetCode 846)
 * -------------------------------------------------------------
 *
 * You are given an integer array `hand` where hand[i] is the value on the ith card,
 * and an integer `groupSize`.
 *
 * You may rearrange the cards in any order. Return true if you can split ALL cards
 * into groups such that:
 *   1) Each group has exactly `groupSize` cards
 *   2) Each group consists of `groupSize` consecutive values
 *      e.g. groupSize=3 -> [4,5,6] is valid, [4,6,7] is not
 *   3) Every card is used exactly once (no leftovers)
 *
 * -------------------------------------------------------------
 * Greedy Idea (Why it works):
 * - Always start a group from the smallest card that is still available.
 * - That smallest value cannot be placed "later" in a consecutive run (because there is
 *   nothing smaller left to precede it), so it MUST begin a new group.
 * - Therefore the group is forced to be: x, x+1, ..., x+groupSize-1.
 * - If any required card is missing, it's impossible.
 *
 * -------------------------------------------------------------
 * Time Complexity:
 * - Counting: O(n)
 * - Sorting unique keys: O(u log u), where u is number of distinct values (u ≤ n)
 * - Building groups: Each card is decremented once => O(n)
 * Overall: O(n + u log u)  (commonly written as O(n log n) due to sorting)
 *
 * Space Complexity:
 * - O(u) for the frequency map
 * -------------------------------------------------------------
 */

/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
var isNStraightHand = function (hand, groupSize) {
  const n = hand.length;

  // Quick fail: total cards must be divisible into equal-sized groups
  if (n % groupSize !== 0) return false;

  // Frequency map: card value -> how many copies we have
  const freq = new Map();
  for (const x of hand) {
    freq.set(x, (freq.get(x) || 0) + 1);
  }

  // Sort distinct card values so we always process from smallest to largest
  const keys = Array.from(freq.keys()).sort((a, b) => a - b);

  // Try to form groups starting from the smallest available value
  for (const start of keys) {
    const count = freq.get(start) || 0;

    // If start has 0 left, nothing to do (it was used up by earlier groups)
    if (count === 0) continue;

    // If we have `count` copies of `start`, we must create `count` groups
    // that begin at `start`:
    // [start, start+1, ..., start+groupSize-1] repeated `count` times.
    for (let offset = 0; offset < groupSize; offset++) {
      const val = start + offset;
      const have = freq.get(val) || 0;

      // Need at least `count` copies of each required consecutive card
      if (have < count) return false;

      // Consume `count` cards of this value
      freq.set(val, have - count);
    }
  }

  // If we never failed, we successfully formed all groups
  return true;
};

/* ------------------ Quick sanity checks ------------------ */
// true: [1,2,3], [2,3,4], [6,7,8]
console.log(isNStraightHand([1,2,3,6,2,3,4,7,8], 3)); // true

// false: cannot make consecutive groups of 4 from 5 cards
console.log(isNStraightHand([1,2,3,4,5], 4)); // false

// true: [1,2,3], [1,2,3]
console.log(isNStraightHand([1,2,3,1,2,3], 3)); // true

// false: missing 3 for the forced group starting at 1
console.log(isNStraightHand([1,2,4,5,6,7], 3)); // false