import { readAs } from "aoc-util";

interface Columns extends Record<number, string[]> {
  [key: number]: string[];
}

interface MoveOrder {
  amount: number;
  from: number;
  to: number;
}

const input = readAs<string[][]>({
  parser: (input: string[]) => input.map((i) => i.split("\n")),
  path: "./src/5/input.txt",
  splitter: /\n\n/,
});

const getContainers = (input: string[][]): Columns => {
  const columns: Columns = {};
  [...input].shift()?.forEach((line) => {
    let column = 1;
    for (let index = 0; index < line.length; index += 4) {
      if (line[index] === "[") {
        columns[column] ??= [];
        columns[column].push(line[index + 1]);
      }
      column++;
    }
  });

  return columns;
};

const getMoveOrders = (input: string[][]) => {
  return (
    [...input]
      .pop()
      ?.map((line) => line.replace(/[a-z]/g, "").split("\n"))
      .reduce((arr: MoveOrder[], curr) => {
        const [amount, from, to] = curr[0]
          .trim()
          .split(" ")
          .filter((a) => a != "")
          .map(Number);
        const moveOrder: MoveOrder = {
          amount,
          from,
          to,
        };
        return [...arr, moveOrder];
      }, []) || []
  );
};

const moveContainers = (
  containers: Columns,
  moveOrders: MoveOrder[]
): Columns => {
  moveOrders.forEach((moveOrder) => {
    const { amount, from, to } = moveOrder;

    for (let index = 0; index < amount; index++) {
      const container = containers[from]?.shift();
      containers[to]?.unshift(container!);
    }
  });

  return containers;
};

const moveContainers2 = (
  containers: Columns,
  moveOrders: MoveOrder[]
): Columns => {
  moveOrders.forEach((moveOrder) => {
    const { amount, from, to } = moveOrder;
    let movedContainers: string[] = [];

    for (let index = 0; index < amount; index++) {
      movedContainers.unshift(containers[from]?.shift()!);
    }

    for (let container of movedContainers) {
      containers[to]?.unshift(container);
    }
  });

  return containers;
};

const getTopContainersAsString = (containers: Columns) => {
  const result = [];

  for (const key in containers) {
    result.push(containers[key]?.shift());
  }

  return result.join("");
};

const solvePart1 = () => {
  const input1 = input;
  const containers = getContainers(input1);
  const moveOrders = getMoveOrders(input1);

  moveContainers(containers, moveOrders);
  console.log(getTopContainersAsString(containers));
};

const solvePart2 = () => {
  const input1 = input;
  const containers = getContainers(input1);
  const moveOrders = getMoveOrders(input1);

  moveContainers2(containers, moveOrders);
  console.log(getTopContainersAsString(containers));
};

// solvePart1();
solvePart2();
