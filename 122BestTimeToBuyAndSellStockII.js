/**
 * Solution Approach:
 *
 * Since we are allowed unlimited transactions and can hold only one stock at a time,
 * the optimal strategy is to take profit from every upward price movement.
 *
 * For each day:
 * - If today's price is higher than yesterday's price,
 *   add the difference to our total profit.
 *
 * This works because multiple small profits on rising days
 * equal the profit of buying at the lowest point and selling at the highest point.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
  let profit = 0; // Stores total profit

  // Start from day 1 and compare with the previous day
  for (let i = 1; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1];

    // If price increased, take the profit
    if (diff > 0) {
      profit += diff;
    }
  }

  return profit;
}
