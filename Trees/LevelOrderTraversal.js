var levelOrder = function(root) {
  // If the tree is empty, return an empty array
  if (!root) return [];

  // This will hold the final list of levels, each level is an array of node values
  const result = [];

  // Initialize a queue with the root node (for BFS traversal)
  const queue = [root];

  // Continue looping until all nodes are processed
  while (queue.length > 0) {
    // Number of nodes currently in this level
    const currentLevel = queue.length;

    // Temporary array to store the values of nodes at the current level
    let currentLevelItems = [];

    // Process all nodes at the current level
    for (let i = 0; i < currentLevel; i++) {
      // Remove the first node from the queue
      const node = queue.shift();

      // Store the node’s value in the current level array
      currentLevelItems.push(node.val);

      // Enqueue its left child if it exists
      if (node.left) queue.push(node.left);

      // Enqueue its right child if it exists
      if (node.right) queue.push(node.right);
    }

    // After processing one complete level, add it to the final result
    result.push(currentLevelItems);
  }

  // Return the list of all levels
  return result;
};
