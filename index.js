const { Command } = require('commander');
const program = new Command();
const fs = require("fs");
const cipher = require("./cipher")

const {caesarShift} = cipher


program
  .requiredOption('-s, --shift <numb>', 'a shift')
  .option('-i, --input', 'an input file')
  .option('-o, --output', 'an output file')
  .requiredOption('-a, --action <encode/decode>', 'an action encode/decode')
  .parse();
const options = program.opts();


const action = options.action
let shift = +options.shift
const input = options.input
const output = options.output

if (action === 'encode') {
  shift
} else if (action === 'decode') {
  shift = -shift
} else {
  return console.error('Введите правильный "action"!');
}

caesarShift(stringW, shift)