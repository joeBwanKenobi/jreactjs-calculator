export const NUM_VALS = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  zero: "0",
  decimal: "."
};

export const OPERATORS = {
  add: (prevNum, currentNum) => Number(prevNum) + Number(currentNum),
  subtract: (prevNum, currentNum) => Number(prevNum) - Number(currentNum),
  multiply: (prevNum, currentNum) => Number(prevNum) * Number(currentNum),
  divide: (prevNum, currentNum) => Number(prevNum) / Number(currentNum)
};

export const OPERS_CHECK = ["add", "subtract", "multiply", "divide"];