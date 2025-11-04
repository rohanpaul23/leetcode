/**
 * Lowest Common Ancestor in a Binary Search Tree (without swapping p and q)
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  let cur = root;

  while (cur) {
    // Case 1: Both nodes are smaller than current node → go left
    if (p.val < cur.val && q.val < cur.val) {
      cur = cur.left;
    }
    // Case 2: Both nodes are larger than current node → go right
    else if (p.val > cur.val && q.val > cur.val) {
      cur = cur.right;
    }
    // Case 3: Split point — p and q lie on different sides (or one equals cur)
    else {
      return cur; // Found the LCA
    }
  }

  return null; // If not found (shouldn't happen if both nodes exist in tree)
};


/**
 * Lowest Common Ancestor of a Binary Search Tree (Recursive)
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  // Base case: if root is null, return null
  if (!root) return null;

  // If both p and q are smaller than root, LCA lies in left subtree
  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  }

  // If both p and q are greater than root, LCA lies in right subtree
  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  }

  // Otherwise, current node is the split point → LCA found
  return root;
};
