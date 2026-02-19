/**
 * Problem: Combination Sum
 * ------------------------
 * Given an array of distinct integers `candidates`
 * and an integer `target`,
 * return all unique combinations of candidates
 * where the chosen numbers sum to target.
 *
 * Rules:
 * - You may use the same number unlimited times.
 * - The solution set must not contain duplicate combinations.
 * - Order inside a combination does not matter.
 *
 * Example:
 * Input:  candidates = [2,3,6,7], target = 7
 * Output: [[2,2,3], [7]]
 *
 *
 * Backtracking Breakdown:
 * -----------------------
 * Base Cases:
 *   1. If remaining === 0 → valid combination found.
 *   2. If remaining < 0 → invalid branch (stop exploring).
 *
 * Choices:
 *   At each step, choose any number from `start` index onward.
 *
 * Constraint:
 *   We pass `i` (not i+1) to allow reuse of same element.
 *
 * Backtrack Step:
 *   Remove the last chosen number after recursive call (path.pop()).
 *
 *
 * Time Complexity:
 * ----------------
 * Worst case is exponential.
 *
 * Rough upper bound:
 *   O(N^(target / minValue))
 *
 * Explanation:
 * - Each recursive call branches up to N times.
 * - Depth can go up to target/minValue.
 * - Number of valid combinations can also be exponential.
 *
 * So overall time complexity ≈ Exponential.
 *
 * Space Complexity:
 * -----------------
 * O(target / minValue)
 * due to recursion stack depth.
 */

var combinationSum = function(candidates, target) {
    const results = [];

    // Optional optimization:
    // Sorting allows early pruning (stop when candidate > remaining)
    candidates.sort((a, b) => a - b);

    function backtrack(start, remaining, path) {

        // Base Case 1: valid combination found
        if (remaining === 0) {
            results.push([...path]); // copy current path
            return;
        }

        // Base Case 2: invalid branch (exceeded target)
        if (remaining < 0) {
            return;
        }

        // Explore all choices starting from `start`
        for (let i = start; i < candidates.length; i++) {

            // Prune early if candidate exceeds remaining
            if (candidates[i] > remaining) break;

            // CHOOSE
            path.push(candidates[i]);

            // EXPLORE
            // pass `i` to allow reuse of same number
            backtrack(i, remaining - candidates[i], path);

            // UNDO (Backtrack)
            path.pop();
        }
    }

    backtrack(0, target, []);
    return results;
};
