function kthSmallest(root, k) {
  let stack = [];
  let curr = root;

  // Continue as long as there are nodes to process
  // (either on the stack or in the current branch)
  while (stack.length > 0 || curr !== null) {

    // Step 1: Go as far left as possible
    while (curr !== null) {
      stack.push(curr);  // remember this node (we'll come back later)
      curr = curr.left;  // move to left child
    }

    // Step 2: Pop the top node (the smallest unvisited node)
    curr = stack.pop();

    // Step 3: Decrement k because we've visited one more node
    k--;

    // Step 4: If this is the k-th node, return its value
    if (k === 0) {
      return curr.val;
    }

    // Step 5: Now move to the right subtree and repeat
    curr = curr.right;
  }
}


/**
 * @param {TreeNode} root - root node of a Binary Search Tree (BST)
 * @param {number} k - position (1-based) of the smallest element to find
 * @return {number} - the k-th smallest element in the BST
 *
 * Approach: In-order traversal (Left → Node → Right)
 * In a BST, this traversal gives nodes in sorted order.
 */
var kthSmallest = function(root, k) {
  // Create an array to store nodes in in-order sequence
  const arr = [];

  // Perform in-order traversal and fill `arr`
  dfs(root, arr);

  // Since in-order gives sorted order,
  // the k-th smallest element is at index k - 1 (0-based index)
  return arr[k - 1];
};

/**
 * Helper function to perform in-order DFS traversal
 * @param {TreeNode} node - current node being processed
 * @param {number[]} arr - array that collects node values in sorted order
 */
var dfs = function(node, arr) {
  // Base case: if node is null, stop recursion
  if (!node) return;

  // 1️⃣ Visit left subtree first (smaller values)
  dfs(node.left, arr);

  // 2️⃣ Visit current node
  arr.push(node.val);

  // 3️⃣ Visit right subtree next (larger values)
  dfs(node.right, arr);
};
