var isSameTree = function(p, q) {
  // Initialize a stack with a pair of root nodes from both trees.
  // Each element in the stack is an array [nodeFromTree1, nodeFromTree2].
  const stack = [[p, q]];

  // Iterate while there are pairs of nodes left to compare.
  while (stack.length) {
    // Pop a pair of nodes (LIFO order)
    const [node1, node2] = stack.pop();

    // If both nodes are null, continue — they match structurally here.
    if (!node1 && !node2) continue;

    // If only one is null or their values differ, trees are not identical.
    if (!node1 || !node2 || node1.val !== node2.val) {
      return false;
    }

    // Push right child pair for further comparison.
    stack.push([node1.right, node2.right]);

    // Push left child pair for further comparison.
    // ❌ Original code had node1.left twice (a bug).
    stack.push([node1.left, node2.left]);
  }

  // If all corresponding nodes matched, the trees are identical.
  return true;
};
