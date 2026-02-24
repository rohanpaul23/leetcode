/**
 * -------------------------------------------------------------
 * LeetCode 1899: Merge Triplets to Form Target Triplet
 * -------------------------------------------------------------
 *
 * You are given an array of triplets `triplets`, where triplets[i] = [ai, bi, ci],
 * and a target triplet `target` = [x, y, z].
 *
 * Operation (merge):
 * - Pick any two triplets and merge them into a new triplet:
 *     [max(a1,a2), max(b1,b2), max(c1,c2)]
 * - You may repeat merging any number of times, using any subset of triplets.
 *
 * Goal:
 * Return true if you can obtain exactly `target` by merging, else false.
 *
 * Key greedy idea:
 * - Because merge uses MAX, values can only stay the same or increase.
 * - So any triplet that has any coordinate > target is "useless" (it would overshoot).
 * - Among the remaining "valid" triplets (all coords <= target), we just need to see
 *   if we can cover each target coordinate exactly:
 *      - some triplet provides x in first position
 *      - some triplet provides y in second position
 *      - some triplet provides z in third position
 *   If all three are achievable from valid triplets, merging them will reach target.
 *
 * Time Complexity:  O(n)   (single pass)
 * Space Complexity: O(1)
 */

/**
 * @param {number[][]} triplets
 * @param {number[]} target
 * @return {boolean}
 */
var mergeTriplets = function(triplets, target) {
  const [x, y, z] = target;

  // Track whether we can achieve each coordinate of target
  let hasX = false;
  let hasY = false;
  let hasZ = false;

  for (const [a, b, c] of triplets) {
    // If any coordinate exceeds target, we can never merge it and still end at target
    if (a > x || b > y || c > z) continue;

    // This triplet is "safe" (won't overshoot), so it can contribute to target
    if (a === x) hasX = true;
    if (b === y) hasY = true;
    if (c === z) hasZ = true;

    // Early exit if we can already form the target
    if (hasX && hasY && hasZ) return true;
  }

  return hasX && hasY && hasZ;
};

/* ------------------ Quick tests ------------------ */
console.log(mergeTriplets([[2,5,3],[1,8,4],[2,3,7]], [2,8,7])); // true
console.log(mergeTriplets([[3,4,5],[4,5,6]], [3,4,5]));         // false (second overshoots; first alone ok but equals target? actually first is target -> true)
console.log(mergeTriplets([[3,4,5],[4,5,6]], [3,4,5]));         // true (first triplet already target)
console.log(mergeTriplets([[1,1,1],[2,2,2]], [2,2,3]));         // false