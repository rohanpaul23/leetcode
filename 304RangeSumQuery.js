/**
 * NumMatrix Class
 *
 * We precompute a 2D prefix sum matrix so that
 * each sumRegion query runs in O(1).
 *
 * Constructor: O(m × n)
 * Query: O(1)
 */

/**
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {

    // Edge case: empty matrix
    if (!matrix.length || !matrix[0].length) {
        this.prefix = [];
        return;
    }

    const rows = matrix.length;
    const cols = matrix[0].length;

    /**
     * Create prefix matrix with:
     *  - One extra row
     *  - One extra column
     *
     * Why?
     * It simplifies boundary calculations.
     *
     * prefix[r][c] will represent sum of rectangle:
     * from (0,0) to (r-1,c-1)
     */
    this.prefix = Array.from(
        { length: rows + 1 },
        () => new Array(cols + 1).fill(0)
    );

    /**
     * Build the prefix matrix.
     *
     * Notice we start from r = 1 and c = 1
     * because prefix[0][*] and prefix[*][0]
     * are padding zeros.
     */
    for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= cols; c++) {

            /**
             * Formula explanation:
             *
             * prefix[r][c] =
             *   current cell value
             * + sum above
             * + sum left
             * - overlap (added twice)
             */
            this.prefix[r][c] =
                matrix[r - 1][c - 1]      // current matrix cell
                + this.prefix[r - 1][c]   // sum from top
                + this.prefix[r][c - 1]   // sum from left
                - this.prefix[r - 1][c - 1]; // remove double counted overlap
        }
    }
};

/**
 * sumRegion returns sum of rectangle:
 * (row1,col1) to (row2,col2)
 *
 * We use inclusion-exclusion principle.
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {

    /**
     * Rectangle sum formula:
     *
     * Take big rectangle up to bottom-right.
     * Subtract top strip.
     * Subtract left strip.
     * Add back top-left overlap.
     *
     * prefix indices shifted by +1 because of padding.
     */

    return (
        this.prefix[row2 + 1][col2 + 1]   // big rectangle
        - this.prefix[row1][col2 + 1]     // remove top strip
        - this.prefix[row2 + 1][col1]     // remove left strip
        + this.prefix[row1][col1]         // add overlap back
    );
};
