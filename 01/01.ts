const file = Bun.file("01/01.txt");

const a = await file.text();

const lines = a.split("\n");
console.log(lines);

const getNumbersPerLine = (line: string) => {
  let numbers: number[] = [];
  line.split("").forEach((char) => {
    if (!isNaN(parseInt(char))) {
      numbers.push(parseInt(char));
    }
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
    console.log(first, last, together);
    total += parseInt(together);
  }
  if (numbers.length === 1) {
    const together = `${numbers[0]}${numbers[0]}`;
    total += parseInt(together);
  }
});

console.log(total);
