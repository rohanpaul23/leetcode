var goodNodes = function (root) {
    function countNodes(node, maxSoFar) {
        if (node === null) return 0;

        let count = 0;

        if (node.val >= maxSoFar) {
            count = 1;
        }

        const newMax = Math.max(maxSoFar, node.val);

        return (
            count +
            countNodes(node.left, newMax) +
            countNodes(node.right, newMax)
        );
    }

    return countNodes(root, root.val);
};