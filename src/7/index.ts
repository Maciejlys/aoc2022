import { readAs } from "aoc-util";

const TOTAL_SIZE = 70000000;
const SPACE_NEEDED = 30000000;

interface Node {
  name: string;
  isDir: boolean;
  size: number;
  parent?: Node;
  direcorySize: number;
  children: Node[];
}

const createNode = (name: string, isDir: boolean, size: number = 0): Node => ({
  name,
  direcorySize: 0,
  isDir,
  size,
  children: [],
});

const allSizes: number[] = [];

function findClosestDirAboveTarget(node: Node, target: number) {
  allSizes.push(node.size);
  for (const child of node.children) {
    if (child.isDir) {
      findClosestDirAboveTarget(child, target);
    }
  }
}

function addFileSizesToDirs(node: Node): void {
  if (!node.isDir) return;
  let sum = 0;
  for (const child of node.children) {
    addFileSizesToDirs(child);
    sum += child.size;
  }
  node.size += sum;
}

function findSmallDirs(node: Node, threshold: number): Node[] {
  let smallDirs: Node[] = [];
  if (node.isDir && node.size <= threshold) smallDirs.push(node);
  for (const child of node.children)
    smallDirs = smallDirs.concat(findSmallDirs(child, threshold));
  return smallDirs;
}

const input = readAs<string[]>({
  parser: (input) => input,
  path: "./src/7/input.txt",
  splitter: /\n/,
});

const root = createNode("root", true);
let currentNode = root;

const createTree = () => {
  input.forEach((line) => {
    switch (true) {
      case line.startsWith("$ cd"):
        const dir = line.split(" ").slice(2).join();
        if (dir === "/") {
          currentNode = root;
        } else if (dir === "..") {
          currentNode = currentNode.parent || root;
        } else {
          currentNode = currentNode.children.find((c) => c.name === dir)!;
        }
        break;
      case line.includes("dir"):
        const node = createNode(line.split(" ").slice(1).join(), true);
        node.parent = currentNode;
        currentNode.children.push(node);
        break;
      case line.startsWith("$ ls"):
        break;
      default:
        const [size, name] = line.split(" ");
        currentNode.children.push(createNode(name, false, Number(size)));
    }
  });
};

createTree();
addFileSizesToDirs(root);
const part1 = findSmallDirs(root, 100000).reduce(
  (sum, node) => sum + node.size,
  0
);
console.log(part1);
const target = Math.abs(TOTAL_SIZE - SPACE_NEEDED - root.size);
const part2 = findClosestDirAboveTarget(root, target);

console.log(
  allSizes.filter((s) => s > target).reduce((a, b) => Math.min(a, b))
);
// 3431883
