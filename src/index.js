const fs = require("fs");
const { pipeline } = require("stream");
const cipherCaesar = require("./cipher");
const commander = require("./commander")
const MyTransform = require("./transform")

const { action, shift, output, input } = commander.opts();

const readStream = input 
  ? fs.createReadStream(input) 
  : process.stdin;
  
const writeStream = output
  ? fs.createWriteStream(output, { flags: "a" })
  : process.stdout;

const shiftAction = action === "encode" ? Math.floor(+shift) : Math.floor(-shift);
const transform = new MyTransform(cipherCaesar, shiftAction)

pipeline(readStream, transform, writeStream, (err) => {
  if (err) {
    console.log("Error pipeline");
  }
  console.log("Pipeline succeeded.");
});
