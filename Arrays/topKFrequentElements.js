var topKFrequent = function(nums, k) {
    const freqMap = new Map(); // Map to store frequency of each number
    const res = []; // Result array to store top k frequent elements

    // Buckets where index = frequency, and each bucket holds list of numbers with that frequency
    // We use nums.length + 1 because the max frequency any number can have is nums.length
    const buckets = Array.from({ length: nums.length + 1 }, () => []);

    // Step 1: Count frequency of each number
    for (const num of nums) {
        freqMap.set(num, freqMap.get(num) + 1 || 1);
    }

    // Step 2: Place numbers into corresponding frequency bucket
    for (const [num, freq] of freqMap) {
        buckets[freq].push(num);
    }

    // Step 3: Traverse buckets from highest frequency to lowest
    // Collect numbers until we have at least k elements in the result
    for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {
        if (buckets[i].length > 0) {
            res.push(...buckets[i]); // Add all numbers with current frequency
        }
    }

    return res.slice(0, k); // Return only the top k frequent elements
};
