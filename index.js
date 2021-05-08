const fs = require("fs");
const { pipeline } = require('stream');
const Transform = require('stream').Transform;
const commander = require("./commander")
const cipherCaesar = require("./cipher")

const {caesarShift} = cipher

const { action, shift, output, input } = commander.opts();

const readStream = input
  ? fs.createReadStream(input)
  : process.stdin;

  const writeStream = output
  ? fs.createWriteStream(output, { flags: 'a' })
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