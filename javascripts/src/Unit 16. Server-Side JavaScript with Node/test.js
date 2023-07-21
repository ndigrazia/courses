/*import { Blob } from 'buffer';

// .length returns the number of UTF-16 codepoints, each of which as 2 bytes long.
const byteLengthUtf16 = (str) => str.length * 2
const byteLengthUtf8 = (str) => new Blob([str]).size

console.log(byteLengthUtf16("A"));
console.log(byteLengthUtf8("A"));*/

let computer = Buffer.from("HOLA", "ascii"); // Convert string to Buffer
for(let i = 0; i < computer.length; i++) { // Use Buffer as byte array
    computer[i]--; // Buffers are mutable
}
console.log(computer.toString());

computer.subarray(0,3).map(x=>x+1).toString() // => "IBM"
// Create new "empty" buffers with Buffer.alloc()
let zeros = Buffer.alloc(1024); // 1024 zeros
let ones = Buffer.alloc(128, 1); // 128 ones
let dead = Buffer.alloc(1024, "DEADBEEF", "hex"); // Repeating pattern of bytes
// Buffers have methods for reading and writing multi-byte values
// from and to a buffer at any specified offset.
dead.readUInt32BE(0) // => 0xDEADBEEF
dead.readUInt32BE(1) // => 0xADBEEFDE
dead.readBigUInt64BE(6) // => 0xBEEFDEADBEEFDEADn
dead.readUInt32LE(1020) // => 0xEFBEADDE