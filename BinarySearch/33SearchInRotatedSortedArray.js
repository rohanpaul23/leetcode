/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let l = 0;
    let r = nums.length -1;
   
    while(l<=r){
      let mid = Math.floor((l+r)/2);
  
      if(target === nums[mid]){
          return mid;
      }
  
      if(nums[l]<= nums[mid]){
          if(target >= nums[l] && target<=nums[mid] ){
              r = mid-1;
          }
          else {
              l = mid+1
          }
      }
      else{
          if(target >= nums[mid] && target<= nums[r]){
              l = mid+1
          }
          else {
              r = mid-1
          }
      }
    }
    return -1
};
const  nums = [8,9,10,0,1,2,3,4,5,6,7];
const target = 0
console.log(search(nums,target))