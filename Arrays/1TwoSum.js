var twoSum = function(nums, target) {
    // Create a map to store numbers and their indices
    const map = new Map();

    // Loop through the array
    for (let i = 0; i < nums.length; i++) {
        // Calculate the number needed to reach the target
        const diff = target - nums[i];

        // Check if the complementary number has already been seen
        if (map.has(diff)) {
            // If found, return the indices of the two numbers
            return [map.get(diff), i];
        }

        // Otherwise, store the current number with its index
        map.set(nums[i], i);
    }

    // Return an empty array if no valid pair is found
    return [];
};
