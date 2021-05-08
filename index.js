const fs = require("fs");
const { Command } = require('commander');
const program = new Command();
const { pipeline } = require('stream');

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

if (action !== 'decode' && action !== 'encode') {
  process.stderr.write(
    'Введите правильный "action"!'
  );
}

// вернутся доделать проверку на число

// if (typeof +shift !== 'number') {
//   process.stderr.write(
//     'Введите число!'
//   );
// }

const readStream = input
  ? fs.createReadStream('input.txt')
  : process.stdin;

  const writeStream = output
  ? fs.createWriteStream('output.txt', { flags: 'a+' })
  : process.stdout;

  pipeline(readStream, transform, writeStream, () => {
    console.log('Pipeline succeeded.');
  });