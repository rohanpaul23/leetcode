/**
 * StockSpanner
 *
 * For each incoming price, return the span:
 * Number of consecutive days (including today)
 * where previous prices were <= current price.
 *
 * We use a monotonic decreasing stack.
 * Each element in stack stores:
 *   [price, span]
 *
 * Time Complexity: Amortized O(1) per next()
 * Space Complexity: O(n)
 */

var StockSpanner = function() {
  // Stack stores [price, span]
  this.stack = [];
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function(price) {

  let span = 1; // At least today counts

  /**
   * While:
   * - Stack not empty
   * - Top price <= current price
   *
   * We can merge spans because:
   * Those previous days are guaranteed
   * to be smaller than current price.
   */
  while (
    this.stack.length &&
    this.stack[this.stack.length - 1][0] <= price
  ) {
    // Add the span of the popped price
    span += this.stack.pop()[1];
  }

  // Push current price and its computed span
  this.stack.push([price, span]);

  return span;
};
