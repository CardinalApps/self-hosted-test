/**
 * Search the start of the string for:
 * 
 *   1. optional [ or (
 *   2. any number
 *   3. optional ] or )
 *   4. optional dash with optional spaces
 * 
 * Examples:
 * 
 *   1. [2018] Album name
 *   2. (2018) Album name
 *   3.  2018 Album name
 *   4. 2018-Album name
 *   5. 01 Track name
 *   6. [20] Track name
 *   7. (20) Track name
 *   8. (20)-Track name
 *   8. 20 - Track name
 *   8. 20 -Track name
 */
export const matchNumberPrefix = /^(\[?|\(?)\d+(\]?|\)?)\s?( |-)\s?/i
