// Function to compute the Maximum Path Sum in a Binary Tree
function maxPathSum(root) {
  // Initialize a variable to keep track of the global maximum path sum
  // Use -Infinity so it works even if all node values are negative
  let res = -Infinity;

  /**
   * Helper function: getMax(root)
   * -----------------------------------
   * This returns the maximum "gain" starting from a given node and extending
   * down one side (either left or right), because a valid path cannot branch upward.
   * 
   * Think of this as: "What’s the best sum I can get if I continue upward from this node?"
   */
  function getMax(root) {
    // Base case: if node is null, no gain
    if (!root) return 0;

    // Recursively compute max gain from left and right children
    let left = getMax(root.left);
    let right = getMax(root.right);

    // If we include this node, the best single-branch path is node.val + max(left, right)
    let path = root.val + Math.max(left, right);

    // If that path becomes negative, drop it (use 0 instead of negative)
    // because continuing through a negative path would only reduce total sum
    return Math.max(0, path);
  }

  /**
   * Helper function: dfs(root)
   * -----------------------------------
   * Traverses the entire tree and updates the global maximum `res`
   * for any path that passes through each node.
   * 
   * At every node:
   * - We compute the best downward gains from both left and right subtrees.
   * - We calculate the "bending path" that goes left → current → right.
   * - We update `res` if that bending path gives a higher sum.
   */
  function dfs(root) {
    // Base case: if node is null, just return
    if (!root) return;

    // Compute one-side gains from left and right
    let left = getMax(root.left);
    let right = getMax(root.right);

    // If we take both sides through this node, total path sum is:
    // node.val + leftGain + rightGain
    res = Math.max(res, root.val + left + right);

    // Continue DFS traversal on both sides
    dfs(root.left);
    dfs(root.right);
  }

  // Start traversal from the root
  dfs(root);

  // Return the final maximum path sum found
  return res;
}
