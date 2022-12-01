import { readAs } from "aoc-util";

const splitArray = (input: number[]) => {
  const result = [];
  let temp = [];
  for (let i = 0; i <= input.length; i++) {
    if (isNaN(input[i]) || i > input.length - 1) {
      result.push(temp);
      temp = [];
    } else {
      temp.push(input[i]);
    }
  }
  return result;
};

const input = readAs<number[][]>({
  parser: (input: string[]) => splitArray(input.map((i) => parseInt(i))),
  path: "./src/1/input.txt",
  splitter: /\n/,
});

const getSums = (input: number[][]) => {
  return input.map((i) => i.reduce((a, b) => a + b, 0));
};

const solvePart1 = (input: number[][]) => {
  console.log(Math.max(...getSums(input)));
};

const solvePart2 = (input: number[][]) => {
  const top3 = getSums(input)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b, 0);

  console.log(top3);
};

solvePart1(input);
solvePart2(input);
