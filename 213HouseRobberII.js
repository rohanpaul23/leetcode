/**
 * House Robber II (Circular)
 * Using DP array inside helper
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

var rob = function(nums) {

    const n = nums.length;

    if (n === 1) return nums[0];

    // Standard House Robber on a subarray
    function robHelper(start, end) {

        const length = end - start + 1;

        const dp = new Array(length);

        // Base cases
        dp[0] = nums[start];
        dp[1] = Math.max(nums[start], nums[start + 1]);

        // Build DP relative to subarray
        for (let i = 2; i < length; i++) {
            dp[i] = Math.max(
                dp[i - 2] + nums[start + i],  // rob current
                dp[i - 1]                     // skip current
            );
        }

        return dp[length - 1];
    }

    // Case 1: Exclude last house
    const excludingLast = robHelper(0, n - 2);

    // Case 2: Exclude first house
    const excludingFirst = robHelper(1, n - 1);

    return Math.max(excludingLast, excludingFirst);
};