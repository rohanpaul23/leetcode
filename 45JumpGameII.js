/**
 * Problem: Jump Game II
 * ---------------------
 * You are given a 0-indexed array of integers `nums` of length n.
 * You are initially positioned at index 0.
 *
 * Each element nums[i] represents the maximum forward jump length from index i.
 *
 * From index i, you may jump to any index:
 *      i + j  where
 *      0 <= j <= nums[i]
 *      and i + j < n
 *
 * Return the MINIMUM number of jumps required to reach index n - 1.
 *
 * The test cases guarantee that you can reach the last index.
 *
 * ----------------------------------------------------------
 * Example 1:
 * nums = [2,3,1,1,4]
 * Output: 2
 *
 * Explanation:
 * Jump 1: index 0 -> index 1
 * Jump 2: index 1 -> index 4
 *
 * ----------------------------------------------------------
 * Approach: Greedy (Level-Based / Range Expansion)
 * ----------------------------------------------------------
 *
 * Key Idea:
 * We move layer by layer (like BFS but without queue).
 *
 * Think of it as:
 * - At each jump, we explore the maximum reachable range.
 * - We keep track of:
 *
 *   1) currentEnd  → end of the current jump range
 *   2) farthest    → farthest index we can reach in next jump
 *   3) jumps       → number of jumps taken
 *
 * How it works:
 *
 * - Traverse the array from left to right.
 * - At each index, update the farthest reachable position.
 * - When we reach currentEnd,
 *     it means we must take a jump.
 * - Then update currentEnd = farthest.
 *
 * This guarantees minimum jumps.
 */

var jump = function(nums) {

  let jumps = 0;        // number of jumps taken
  let currentEnd = 0;   // end of current jump range
  let farthest = 0;     // farthest reachable index

  // We stop at n-2 because once we reach n-1,
  // no more jumps are needed.
  for (let i = 0; i < nums.length - 1; i++) {

    // Update the farthest reachable index
    farthest = Math.max(farthest, i + nums[i]);

    // If we've reached the end of current jump range,
    // we must take another jump.
    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
    }
  }

  return jumps;
};


/**
 * Time Complexity: O(n)
 * ---------------------
 * We traverse the array once.
 *
 * Space Complexity: O(1)
 * ----------------------
 * Only a few variables are used.
 */