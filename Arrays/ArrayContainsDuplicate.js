var containsDuplicate = function(nums) {
    // Create a Set to store unique elements we've seen so far
    const seen = new Set();

    // Loop through each number in the array
    for (let num of nums) {
        // If the number is already in the Set, we found a duplicate
        if (seen.has(num)) return true;

        // Otherwise, add the number to the Set
        seen.add(num);
    }

    // If loop completes with no duplicates, return false
    return false;
};
