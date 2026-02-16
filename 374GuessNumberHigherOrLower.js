/**
 * ================================================================
 * 🧩 Problem: Guess Number Higher or Lower
 * ================================================================
 *
 * We are playing a Guess Game.
 *
 * I pick a number from 1 to n.
 * You must guess which number I picked.
 *
 * Every time you guess wrong, I tell you:
 *   -1 → Your guess is higher than the picked number (num > pick)
 *    1 → Your guess is lower than the picked number (num < pick)
 *    0 → Your guess is correct (num == pick)
 *
 * You are given a pre-defined API:
 *
 *      int guess(int num)
 *
 * Return the number that I picked.
 *
 * ------------------------------------------------
 * 🔎 Key Insight:
 * The search space (1 to n) is sorted.
 * Each guess gives directional feedback.
 * Therefore, we can use Binary Search.
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * ================================================================
 */


/**
 * Forward declaration of guess API.
 * guess(num):
 *   -1 → num > pick
 *    1 → num < pick
 *    0 → num == pick
 */


/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function(n) {

    // Initialize search boundaries
    let left = 1;
    let right = n;

    // Continue searching while valid search space exists
    while (left <= right) {

        /**
         * Compute middle safely to avoid overflow
         * (important in languages like Java/C++)
         *
         * Instead of (left + right) / 2
         * we use:
         */
        let mid = left + Math.floor((right - left) / 2);

        // Call the provided API to check our guess
        let result = guess(mid);

        // If result is 0, we found the picked number
        if (result === 0) {
            return mid;
        }

        // If result is -1 → our guess is too high
        // So eliminate the right half including mid
        else if (result === -1) {
            right = mid - 1;
        }

        // If result is 1 → our guess is too low
        // So eliminate the left half including mid
        else {
            left = mid + 1;
        }
    }

    /**
     * Technically unreachable because
     * the problem guarantees a valid answer.
     */
    return -1;
};
