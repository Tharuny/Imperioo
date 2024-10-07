export const capital = (data) => async () => {
    console.log("checking data",typeof data);
    
  return data
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};
