/**
 * Problem: Combination Sum II
 * ---------------------------
 * Given a collection of candidate numbers (candidates) and a target number (target),
 * find all unique combinations in candidates where the candidate numbers sum to target.
 *
 * Rules:
 * 1. Each number in candidates may only be used once in each combination.
 * 2. The solution set must not contain duplicate combinations.
 * 3. Candidates may contain duplicate values.
 *
 * Example:
 * Input:
 *   candidates = [10,1,2,7,6,1,5]
 *   target = 8
 *
 * Output:
 *   [
 *     [1,1,6],
 *     [1,2,5],
 *     [1,7],
 *     [2,6]
 *   ]
 *
 *
 * Approach:
 * ----------
 * Backtracking + Sorting + Pruning
 *
 * 1. Sort the array to:
 *    - Make duplicate elements adjacent.
 *    - Allow early pruning when candidate > remaining.
 *
 * 2. Skip duplicates at the same recursion depth using:
 *      if (i > start && candidates[i] === candidates[i - 1]) continue;
 *
 * 3. Since each element can be used only once,
 *    we recurse using i + 1 (not i).
 *
 *
 * Time Complexity:
 * ----------------
 * Worst case is exponential.
 *
 * Rough upper bound: O(2^n)
 *
 * Explanation:
 * - Each element can either be picked or not picked.
 * - In worst case we explore most subsets.
 * - Pruning and duplicate skipping reduce branches in practice.
 *
 *
 * Space Complexity:
 * -----------------
 * O(n)
 *
 * - Recursion stack depth is at most n.
 * - Path array stores up to n elements.
 * - Output space is not included in auxiliary space.
 */

var combinationSum2 = function(candidates, target) {
    const results = [];

    // Step 1: Sort to enable duplicate skipping and pruning
    candidates.sort((a, b) => a - b);

    function backtrack(start, remaining, path) {

        // Base Case: valid combination found
        if (remaining === 0) {
            results.push([...path]); // copy current combination
            return;
        }

        // Explore choices starting from current index
        for (let i = start; i < candidates.length; i++) {

            // Skip duplicate numbers at the same depth
            if (i > start && candidates[i] === candidates[i - 1]) {
                continue;
            }

            const current = candidates[i];

            // Prune: if current number exceeds remaining target,
            // no need to check further (array is sorted)
            if (current > remaining) {
                break;
            }

            // Choose
            path.push(current);

            // Explore (i + 1 because each element can be used once)
            backtrack(i + 1, remaining - current, path);

            // Undo choice (backtrack)
            path.pop();
        }
    }

    backtrack(0, target, []);
    return results;
};
