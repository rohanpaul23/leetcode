/**
 * -------------------------------------------------------------
 * Problem: Gas Station (LeetCode 134)
 * -------------------------------------------------------------
 *
 * There are n gas stations arranged in a circular route.
 *
 * gas[i]  = amount of gas available at station i
 * cost[i] = gas required to travel from station i to station i+1
 *
 * You start with:
 * - An empty tank
 * - At one of the gas stations
 *
 * Goal:
 * Return the starting station index from which you can travel
 * around the entire circuit exactly once in clockwise direction.
 *
 * If it is not possible, return -1.
 *
 * IMPORTANT:
 * - If a solution exists, it is guaranteed to be unique.
 * - The route is circular.
 *
 * -------------------------------------------------------------
 * Intuition:
 *
 * 1) If total gas < total cost → impossible to complete.
 * 2) If total gas >= total cost → solution exists.
 * 3) Use greedy approach to find valid starting index.
 *
 * -------------------------------------------------------------
 * Time Complexity:  O(n)
 *   - First loop computes total gas and cost → O(n)
 *   - Second loop finds valid start → O(n)
 *
 * Space Complexity: O(1)
 *   - Only constant variables used.
 * -------------------------------------------------------------
 */

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {

    // Step 1: Compute total gas and total cost
    // If total gas is less than total cost,
    // completing the circuit is impossible.
    let totalGas = 0;
    let totalCost = 0;

    for (let i = 0; i < gas.length; i++) {
        totalGas += gas[i];
        totalCost += cost[i];
    }

    // Global feasibility check
    if (totalGas < totalCost) {
        return -1;  // Not enough fuel overall
    }

    // Step 2: Find valid starting station using greedy logic
    let currentGas = 0;   // Tracks fuel while simulating
    let startIndex = 0;   // Candidate starting station

    for (let i = 0; i < gas.length; i++) {

        // Add net gain/loss at this station
        currentGas += gas[i] - cost[i];

        // If tank becomes negative:
        // It means we cannot start from startIndex.
        // Also, none of the stations between startIndex and i can be valid.
        if (currentGas < 0) {

            // Reset fuel
            currentGas = 0;

            // Try next station as new starting candidate
            startIndex = i + 1;
        }
    }

    // Since totalGas >= totalCost,
    // startIndex must be the unique valid answer.
    return startIndex;
};