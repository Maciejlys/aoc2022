import { readAs } from "aoc-util";

const input = readAs<string>({
  parser: ([input]) => input,
  path: "./src/6/input.txt",
});

const exampleInputs = [
  "bvwbjplbgvbhsrlpgdmjqwftvncz",
  "nppdvjthqldpwncqszvftbrmjlhg",
  "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
];

const areAllUnique = (arr: string) => arr.length === new Set(arr).size;

const findPacketMarker = (input: string, amount: number): number => {
  let buffer = "";

  for (let i = 0; i < input.length; i++) {
    buffer += input[i];
    buffer = buffer.length > amount ? buffer.slice(1) : buffer;
    if (buffer.length === amount && areAllUnique(buffer)) return i + 1;
  }
  return -1;
};

console.log(`Part1 answer: ${findPacketMarker(input, 4)}`);
console.log(`Part2 answer: ${findPacketMarker(input, 14)}`);
