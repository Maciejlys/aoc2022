import { readAs } from "aoc-util";

const input = readAs<number[]>({
  parser: (input: string[]) => input.map((i) => parseInt(i)),
  path: "./src/1/input.txt",
});

console.log(input);
