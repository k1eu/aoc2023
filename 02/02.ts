// const file = Bun.file("02/02.txt");
const file = Bun.file("02/02.txt");

const fileText = await file.text();

const lines = fileText.split("\n");
const numberOfCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

function parseLines(lines: string[]) {
  const result: {
    id: string;
    sets: Record<string, number>[];
  }[] = [];

  for (const line of lines) {
    if (line === "") {
      continue;
    }
    const [gameWithId, setsOfCubesPerGame] = line.split(":");

    const sets = setsOfCubesPerGame.split(";");
    const parsedSets: Record<string, number>[] = [];

    for (const set of sets) {
      const draws = set.split(",");
      let parsedDraws: Record<string, number> = {
        red: 0,
        green: 0,
        blue: 0,
      };
      for (const draw of draws) {
        const [_, no, color] = draw.split(" ");
        parsedDraws[color] = parseInt(no);
      }
      parsedSets.push(parsedDraws);
    }

    const [_, id] = gameWithId.split(" ");

    result.push({
      id,
      sets: parsedSets,
    });
  }
  return result;
}

const result = parseLines(lines);

const winGames = result.filter((game) => {
  const hasLost = game.sets.some(
    (set) =>
      set.red > numberOfCubes.red ||
      set.green > numberOfCubes.green ||
      set.blue > numberOfCubes.blue
  );

  return !hasLost;
});

const sum = winGames.reduce((acc, game) => {
  return acc + parseInt(game.id);
}, 0);

console.log("a", sum);

// B

const resultWithNeededCubes = result.map((game) => {
  const { reds, greens, blues } = game.sets.reduce(
    (acc, set) => {
      if (set.red > acc.reds) {
        acc.reds = set.red;
      }
      if (set.green > acc.greens) {
        acc.greens = set.green;
      }
      if (set.blue > acc.blues) {
        acc.blues = set.blue;
      }
      return acc;
    },
    {
      reds: 0,
      greens: 0,
      blues: 0,
    }
  );

  const power = reds * greens * blues;

  return {
    ...game,
    power,
  };
});

const sumOfPowers = resultWithNeededCubes.reduce((acc, game) => {
  return acc + game.power;
}, 0);

console.log("b", sumOfPowers);
