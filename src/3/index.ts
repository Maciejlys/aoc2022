import { readAs } from "aoc-util";

const commonChars = (A: string[]) => {
  let res = [...A[0]];
  for (let i = 1; i < A.length; i++) {
    res = res.filter((c) => {
      const l = A[i].length;
      A[i] = A[i].replace(c, "");
      return l > A[i].length;
    });
  }
  return res;
};

const input = readAs<string[]>({
  parser: (input: string[]) => input,
  path: "./src/3/input.txt",
  splitter: /\n/,
});

const getPriority = (char: string) =>
  char === char.toUpperCase()
    ? char.charCodeAt(0) - 38
    : char.charCodeAt(0) - 96;

const solvePart1 = () => {
  const result = input
    .map((i) => [i.slice(0, i.length / 2), i.slice(i.length / 2)])
    .reduce((arr, curr) => (arr += getPriority(commonChars(curr)[0])), 0);
  console.log(result);
};

const solvePart2 = () => {
  let sum = 0;
  for (let i = 0; i < input.length; i += 3) {
    sum += getPriority(commonChars([input[i], input[i + 1], input[i + 2]])[0]);
  }
  console.log(sum);
};

// solvePart1();
solvePart2();
