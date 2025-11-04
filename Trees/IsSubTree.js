/**
 * Definition for a binary tree node:
 * function TreeNode(val, left, right) {
 *   this.val = (val===undefined ? 0 : val)
 *   this.left = (left===undefined ? null : left)
 *   this.right = (right===undefined ? null : right)
 * }
 */

/**
 * Determines if `subRoot` is a subtree of `root`
 * @param {TreeNode} root - the main tree
 * @param {TreeNode} subRoot - the possible subtree
 * @return {boolean}
 */
var isSubtree = function(root, subRoot) {
  // Base case 1: An empty subtree is always a subtree of any tree.
  if (!subRoot) {
    return true;
  }

  // Base case 2: If the main tree is empty but subRoot isn’t, it can’t be a subtree.
  if (!root) {
    return false;
  }

  // Check if the current root and subRoot form identical trees.
  if (isSameTree(root, subRoot)) {
    return true;
  }

  // Otherwise, recursively check if subRoot is a subtree of the left
  // or right subtree of the current root.
  return (
    isSubtree(root.left, subRoot) ||
    isSubtree(root.right, subRoot)
  );
};


/**
 * Helper function: Checks if two binary trees are structurally identical
 * and have the same node values.
 * @param {TreeNode} p - first tree node
 * @param {TreeNode} q - second tree node
 * @return {boolean}
 */
var isSameTree = function(p, q) {
  // Stack to hold pairs of nodes to compare.
  const stack = [[p, q]];

  while (stack.length) {
    // Pop the top pair for comparison.
    const [node1, node2] = stack.pop();

    // If both are null, move to the next pair (they match at this branch).
    if (!node1 && !node2) continue;

    // If only one is null, or their values differ → trees are not identical.
    if (!node1 || !node2 || node1.val !== node2.val) {
      return false;
    }

    // Push right children pair for later comparison.
    stack.push([node1.right, node2.right]);

    // Push left children pair for later comparison.
    stack.push([node1.left, node2.left]);
  }

  // All nodes matched; trees are identical.
  return true;
};
