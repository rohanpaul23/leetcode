function maxPathSum(root) {
  // Global maximum path sum; start with -Infinity to handle all-negative trees
  let res = -Infinity;

  /**
   * dfs(node) returns:
   *   The maximum path sum of a path that:
   *   - starts at this node
   *   - goes downwards in **one direction only** (left OR right)
   *   This is the "gain" we can pass up to this node's parent.
   */
  function dfs(node) {
    if (!node) return 0;

    // Recursively get the best gains from left and right subtrees.
    // If a side is negative, we drop it by clamping at 0:
    // it’s better not to include a negative path.
    const leftGain = Math.max(0, dfs(node.left));
    const rightGain = Math.max(0, dfs(node.right));

    // Now consider the "bending path" that:
    // left subtree → node → right subtree
    const bendingPathSum = node.val + leftGain + rightGain;

    // Update global maximum with this path if it's the best so far
    res = Math.max(res, bendingPathSum);

    // Return the best one-side gain to the parent:
    // either node + left or node + right, whichever is larger.
    // We can't take both when going up, that would "branch".
    return node.val + Math.max(leftGain, rightGain);
  }

  // Start DFS from root; this fills in `res`
  dfs(root);

  return res;
}
