const fs = require("fs");
const { Command } = require('commander');
const program = new Command();
const { pipeline } = require('stream');
const Transform = require('stream').Transform;

const cipherCaesar = require("./cipher")

const {caesarShift} = cipher


program
.requiredOption('-s, --shift <number>', 'a shift')
  .option('-i, --input', 'an input file')
  .option('-o, --output', 'an output file')
  .requiredOption('-a, --action <encode/decode>', 'an action encode/decode')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .requiredOption('-a, --action <type>', 'an action encode/decode')
  .parse();
const options = program.opts();

program.parse(process.argv)

const { action, shift, output, input } = program.opts();

if (action !== "decode" && action !== "encode") {
  process.stderr.write('Введите правильный "action", "action" принемает значение "encode" / "decode"');
  process.exit(1);
}
if (input !== "input.txt" && typeof input !== "undefined") {
  process.stderr.write('Вы ввели неправильное название фаила ввода. Укажие "input.txt"');
  process.exit(1);
}
if (output !== "output.txt" && typeof output !== "undefined") {
  process.stderr.write('Вы ввели неправильное название фаила вывода. Укажие "output.txt"');
  process.exit(1);
}

if (isNaN(+shift)) {
  process.stderr.write("Введите число!");
  process.exit(1);
}
const readStream = input
  ? fs.createReadStream('input.txt')
  : process.stdin;

  const writeStream = output
  ? fs.createWriteStream('output.txt', { flags: 'a' })
  : process.stdout;

  const shiftAction = action === "encode" ? Math.floor(+shift) : Math.floor(-shift);
  const transform = new Transform({
    transform(chunk, encoding, callback) {
      this.push(cipherCaesar(chunk.toString(), shiftAction));
      callback();
    },
  });

  pipeline(readStream, transform, writeStream, (err) => {
    if (err) {
      console.log("Error pipeline");
    }
    console.log("Pipeline succeeded.");
  });