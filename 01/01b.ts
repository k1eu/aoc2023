const numbersMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const availableSemanticNumbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
] as const;

const file = Bun.file("01/01.txt");

const a = await file.text();

const lines = a.split("\n");

const getNumbersPerLine = (line: string) => {
  let numbers: number[] = [];

  const wordsInLine = availableSemanticNumbers.map((word) => {
    const indexes = [];
    let startingIndex = 0;

    while (line.indexOf(word, startingIndex) !== -1) {
      const index = line.indexOf(word, startingIndex);
      startingIndex = index + 1;
      indexes.push(index);
    }

    return {
      word,
      indexes,
    };
  });

  const parsedWordsInLine = wordsInLine.reduce((acc, word) => {
    const { word: wordName, indexes } = word;

    if (indexes.length === 0) {
      return acc;
    }

    indexes.forEach((index) => {
      const number = numbersMap[wordName];
      acc.push({
        number,
        index,
      });
    });
    return acc;
  }, [] as { number: number; index: number }[]);

  // @ts-expect-error - Trust me
  const numbersInLine: {
    number: number;
    index: number;
  }[] = line
    .split("")
    .map((char, index) => {
      if (!isNaN(parseInt(char))) {
        return {
          number: parseInt(char),
          index,
        };
      }
    })
    .filter(Boolean);

  const allNumbersInLine = [...parsedWordsInLine, ...numbersInLine];

  const sortedNumbersInLine = allNumbersInLine.sort(
    (a, b) => a.index - b.index
  );

  sortedNumbersInLine.forEach((number) => {
    numbers.push(number.number);
  });

  return numbers;
};

let total = 0;

lines.forEach((line) => {
  const numbers = getNumbersPerLine(line);
  if (numbers.length > 1) {
    const first = numbers[0];
    const last = numbers[numbers.length - 1];
    const together = `${first}${last}`;
    total += parseInt(together);
  }
  if (numbers.length === 1) {
    const together = `${numbers[0]}${numbers[0]}`;
    total += parseInt(together);
  }
});

console.log(total);
