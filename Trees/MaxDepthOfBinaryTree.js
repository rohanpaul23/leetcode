// Function to find the maximum depth of a binary tree using recursion
function maxDepth(root) {
  // Base case: if the node is null, the depth is 0
  if (root === null) return 0;

  // Recursively find the depth of left and right subtrees
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  // The depth of the current node = 1 + max(leftDepth, rightDepth)
  return Math.max(leftDepth, rightDepth) + 1;
}


// Function to find the maximum depth of a binary tree using BFS
function maxDepth(root) {
  if (root === null) return 0;

  let depth = 0;
  const queue = [root]; // Initialize queue for level-order traversal

  // While there are nodes to process
  while (queue.length > 0) {
    const levelSize = queue.length; // Number of nodes in the current level

    // Process all nodes in this level
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    // After processing one level, increment depth
    depth++;
  }

  return depth;
}
