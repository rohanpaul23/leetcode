  /**
   * @param {number[]} preorder - preorder traversal of a binary tree (Root → Left → Right)
   * @param {number[]} inorder  - inorder traversal of the same tree (Left → Root → Right)
   * @return {TreeNode} - the root of the reconstructed binary tree
   *
   * Goal:
   *  Use the preorder and inorder traversal properties to rebuild the tree.
   *  - The first element in preorder is always the root.
   *  - In inorder, all elements to the left of root are in its left subtree,
   *    and all elements to the right are in its right subtree.
   */
  var buildTree = function(preorder, inorder) {
    // Pointer to track the current root index in preorder traversal
    let preIndex = 0;

    // Map each value in inorder to its index for O(1) lookup
    const inorderIndices = new Map();
    inorder.forEach((val, i) => inorderIndices.set(val, i));

    /**
     * Recursive helper function (DFS) to construct a subtree
     * @param {number} l - left boundary index of current inorder segment
     * @param {number} r - right boundary index of current inorder segment
     * @return {TreeNode|null} - the root node of this subtree
     */
    function dfs(l, r) {
      // Base case: if the inorder range is invalid, no tree to build
      if (l > r) return null;

      // Get the current root value from preorder and move to the next index
      const root_val = preorder[preIndex++];

      // Create a new tree node using the current root value
      const root = new TreeNode(root_val);

      // Find this root’s index in the inorder array
      const mid = inorderIndices.get(root_val);

      // Recursively build the left subtree using the left part of inorder
      root.left = dfs(l, mid - 1);

      // Recursively build the right subtree using the right part of inorder
      root.right = dfs(mid + 1, r);

      // Return the constructed subtree’s root
      return root;
    }

    // Start recursion with the full inorder range (entire tree)
    return dfs(0, inorder.length - 1);
  };
