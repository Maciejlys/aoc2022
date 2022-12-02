import { readAs } from "aoc-util";

enum MatchResult {
  Win = 6,
  Draw = 3,
  Loss = 0,
}

enum Shape {
  Rock = "Rock",
  Paper = "Paper",
  Scissors = "Scissors",
}

interface Sign {
  type: Shape;
  letters: string[];
  winsWith: string;
  points: number;
}

const Signs: Sign[] = [
  {
    type: Shape.Rock,
    letters: ["A", "X"],
    winsWith: Shape.Scissors,
    points: 1,
  },
  {
    type: Shape.Scissors,
    letters: ["C", "Z"],
    winsWith: Shape.Paper,
    points: 3,
  },
  {
    type: Shape.Paper,
    letters: ["B", "Y"],
    winsWith: Shape.Rock,
    points: 2,
  },
];

const input = readAs<string[][]>({
  parser: (input: string[]) => input.map((i) => i.split(" ")),
  path: "./src/2/input.txt",
  splitter: /\n/,
});

const solvePart1 = (input: string[][]) => {
  const scores: number[] = [];
  input.forEach((line) => {
    let score = 0;
    const [opponent, me] = line;
    const opponentSign = Signs.find((s) => s.letters.includes(opponent));
    const mySign = Signs.find((s) => s.letters.includes(me));

    if (opponentSign && mySign) {
      if (mySign.winsWith === opponentSign.type) {
        score += MatchResult.Win;
      } else if (mySign.type === opponentSign.winsWith) {
        score += MatchResult.Loss;
      } else {
        score += MatchResult.Draw;
        score += mySign.points;
      }
    }

    scores.push(score);
  });
  console.log(scores.reduce((a, b) => a + b, 0));
};

const solvePart2 = (input: string[][]) => {
  const scores: number[] = [];
  input.forEach((line) => {
    let score = 0;
    const [opponent, outcome] = line;
    const opponentSign = Signs.find((s) => s.letters.includes(opponent));
    let mySign: Sign;

    if (opponentSign) {
      if (outcome === "X") {
        const possibleSigns = Signs.filter(
          (s) => s.winsWith != opponentSign.type && opponentSign.type != s.type
        );
        mySign = possibleSigns.reduce((a, b) => (a.points > b.points ? a : b));
        score += MatchResult.Loss;
      } else if (outcome === "Z") {
        mySign = Signs.find((s) => s.winsWith === opponentSign.type)!;
        score += MatchResult.Win;
      } else {
        mySign = Signs.find((s) => opponentSign.type === s.type)!;
        score += MatchResult.Draw;
      }
      score += mySign.points;
    }

    scores.push(score);
  });
  console.log(scores.reduce((a, b) => a + b, 0));
};

// solvePart1(input);
solvePart2(input);
