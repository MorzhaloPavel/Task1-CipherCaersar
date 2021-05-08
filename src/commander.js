const { Command } = require("commander");

const program = new Command();

program
  .option("-s, --shift <number>", "a shift")
  .option("-a, --action <type>", "an action encode/decode")
  .option("-i, --input <filename>", "an input file")
  .option("-o, --output <filename>", "an output file")
  .parse();
program.parse(process.argv);

const { action, shift, output, input } = program.opts();

if (isNaN(+shift) || typeof shift === "undefined") {
  process.stderr.write('Введите правильный "shift", "shift" принемает только число.');
  process.exit(1);
}
if (action !== "decode" && action !== "encode") {
  process.stderr.write('Введите правильный "action", "action" принемает значение "encode" / "decode".');
  process.exit(1);
}
if (input !== "input.txt" && input !== "output.txt" && typeof input !== "undefined") {
  process.stderr.write('Вы ввели неправильное название фаила ввода. Укажие "input.txt".');
  process.exit(1);
}
if (output !== "output.txt" && output !== "input.txt" && typeof output !== "undefined") {
  process.stderr.write('Вы ввели неправильное название фаила вывода. Укажие "output.txt".');
  process.exit(1);
}

module.exports = program;
