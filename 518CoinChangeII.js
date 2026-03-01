/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {
    const dp = new Array(amount + 1).fill(0);

    dp[0] = 1;

    for(let i =1 ; i <= amount; i++){
        for(const c of coins){
            if(i - c >= 0){
                dp[i] += dp[i - c];
            }
        }
    }

    return dp[amount];
};

console.log(change(5, [1,2,5]))