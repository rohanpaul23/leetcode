/**
 * Problem: Jump Game
 * ------------------
 * You are given an integer array `nums`.
 * You are initially positioned at index 0.
 * Each element `nums[i]` represents your maximum jump length from that position.
 *
 * Return true if you can reach the last index.
 * Return false otherwise.
 *
 * Example 1:
 * nums = [2,3,1,1,4]
 * Output: true
 * Explanation:
 * From index 0 you can jump to index 1.
 * From index 1 you can jump to index 4 (last index).
 *
 * Example 2:
 * nums = [3,2,1,0,4]
 * Output: false
 * Explanation:
 * You get stuck at index 3 because nums[3] = 0,
 * and you can’t move forward to reach index 4.
 *
 * --------------------------------------------------------
 * Approach: Backward Greedy
 * --------------------------------------------------------
 *
 * Instead of trying to move forward,
 * we start from the last index and move backward.
 *
 * Idea:
 * - Let finalPosition represent the index we need to reach.
 * - Initially, finalPosition = last index.
 * - Move backward through the array.
 * - If index i can reach finalPosition,
 *   then we update finalPosition = i.
 *
 * If we can eventually move finalPosition to 0,
 * that means index 0 can reach the last index.
 */

var canJump = function(nums) {

  // Start with the goal as the last index
  let finalPosition = nums.length - 1;

  // Traverse backward from second-last index
  for (let i = nums.length - 2; i >= 0; i--) {

    // Check if current index can reach the current goal
    // i + nums[i] gives the farthest index reachable from i
    if (i + nums[i] >= finalPosition) {

      // If reachable, move the goal to this index
      finalPosition = i;
    }
  }

  // If we managed to move the goal to index 0,
  // then we can reach the end
  return finalPosition === 0;
};

/**
 * Time Complexity: O(n)
 * ----------------------
 * We iterate through the array once (from right to left).
 * Each element is processed exactly one time.
 *
 * Space Complexity: O(1)
 * -----------------------
 * We use only one variable (finalPosition).
 * No extra data structures are used.
 */