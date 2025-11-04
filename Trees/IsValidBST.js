/**
 * @param {TreeNode} root
 * @return {boolean}
 *
 * Validate if a given binary tree is a valid Binary Search Tree (BST).
 * Rule: For every node, all values in its left subtree < node.val < all values in its right subtree.
 */
var isValidBST = function(root) {

  /**
   * Helper function that recursively checks if a subtree is valid
   * @param {TreeNode} node - current node being validated
   * @param {number|null} min - lower bound (all nodes must be > min)
   * @param {number|null} max - upper bound (all nodes must be < max)
   * @returns {boolean} - true if subtree rooted at `node` is valid, else false
   */
  function dfs(node, min, max) {
    // Base case: an empty tree (null node) is always valid
    if (!node) return true;

    // Check if current node violates the BST property:
    // - If there is a lower bound (min), node.val must be greater than it
    // - If there is an upper bound (max), node.val must be less than it
    // Use strict inequality to prevent duplicates
    if ((min !== null && node.val <= min) ||
        (max !== null && node.val >= max)) {
      return false; // violation found → not a valid BST
    }

    // Recursively validate left and right subtrees:
    // - Left subtree: all values must be < node.val
    //   → new max becomes node.val
    // - Right subtree: all values must be > node.val
    //   → new min becomes node.val
    return dfs(node.left, min, node.val) &&
           dfs(node.right, node.val, max);
  }

  // Start recursion with no bounds (entire range open)
  return dfs(root, null, null);
};
