/**
 * Problem: Subsets (Power Set)
 * ---------------------------------------
 * Given an array of unique integers `nums`, return all possible subsets.
 * (Including the empty subset and the full set.)
 *
 * Approach: Iterative Doubling
 * ---------------------------------------
 * Start with one subset: the empty subset [[]].
 * For each number `num`:
 *   - Take every existing subset in `results`
 *   - Create a new subset by appending `num` to it
 *   - Append all those new subsets back into `results`
 *
 * Example: nums = [1,2]
 * results starts as: [[]]
 * num=1 => new: [[1]] => results: [[],[1]]
 * num=2 => new: [[2],[1,2]] => results: [[],[1],[2],[1,2]]
 *
 * Time Complexity Explanation:
 * ---------------------------------------
 * Let n = nums.length
 *
 * 1) Total number of subsets of n elements = 2^n
 *    (each element can be either included or excluded)
 *
 * 2) This algorithm generates all 2^n subsets.
 *    However, creating a new subset uses:
 *       [...subset, num]
 *    which COPIES `subset`.
 *
 * 3) Copying a subset costs O(k) where k = subset.length,
 *    and k can be up to n in the worst case.
 *
 * Therefore:
 *   - We create ~2^n subsets overall
 *   - Each creation may copy up to O(n) elements
 *
 * Final time complexity: O(n * 2^n)
 *
 * Space Complexity:
 * ---------------------------------------
 * We store all subsets: 2^n subsets, each up to size n
 * => O(n * 2^n)
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  // Start with the empty subset
  const results = [[]];

  // For each number, we "clone + append num" to every existing subset
  for (let num of nums) {
    const newSubSets = [];

    // results currently contains all subsets built so far
    for (let subSet of results) {
      // Create a NEW subset including num (do not mutate subSet)
      newSubSets.push([...subSet, num]);
    }

    // Append all newly formed subsets into results
    results.push(...newSubSets);
  }

  return results;
};
