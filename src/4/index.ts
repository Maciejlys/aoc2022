import { readAs } from "aoc-util";

const input = readAs<string[][]>({
  parser: (input: string[]) => input.map((i) => i.split(",")),
  path: "./src/4/input.txt",
  splitter: /\n/,
});

const solvePart1 = () => {
  const result = input.reduce((sum, curr) => {
    let count = 0;
    const [pair1, pair2] = curr;
    const [x1, y1] = pair1.split("-").map((i) => parseInt(i));
    const [x2, y2] = pair2.split("-").map((i) => parseInt(i));

    if ((x1 <= x2 && y1 >= y2) || (x2 <= x1 && y2 >= y1)) count++;

    return sum + count;
  }, 0);
  console.log(result);
};

const solvePart2 = () => {
  const result = input.reduce((sum, curr) => {
    let count = 0;
    const [pair1, pair2] = curr;
    const [x1, y1] = pair1.split("-").map((i) => parseInt(i));
    const [x2, y2] = pair2.split("-").map((i) => parseInt(i));

    if ((y1 >= x2 && x1 <= x2) || (y2 >= x1 && x2 <= x1)) count++;

    return sum + count;
  }, 0);
  console.log(result);
};

solvePart1();
solvePart2();
