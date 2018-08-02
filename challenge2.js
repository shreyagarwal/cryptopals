/*

	http://cryptopals.com/sets/1/challenges/2

	Fixed XOR
	Write a function that takes two equal-length buffers and produces their XOR combination.

	If your function works properly, then when you feed it the string:

	1c0111001f010100061a024b53535009181c
	... after hex decoding, and when XOR'd against:

	686974207468652062756c6c277320657965
	... should produce:

	746865206b696420646f6e277420706c6179
*/

/*

	1c - 0001 1100
	68 - 0110 1000

	74   - 0111 0100

	Solution

	Basix XOR --> if both bits are same then 0 , otherwise 1

	1. Convert both hex inputs to binary strings
	2. Xor the Binary strings and get output hex
*/

var
	ASSERT = require('assert');

function HexCharToBinStr(inp) {
	// Assumption : This will contain 1 char hex string 
	return parseInt(inp, 16).toString(2).padStart(4,0);
}

function BinCharToHexChar(inp) {
	// Assumption : This will contain 4 chars binary string 
	return parseInt(inp, 2).toString(16);
}

function HexStrToBinStr(inp) {
	let out = "";
	for(let i = 0; i < inp.length; i++) out+= HexCharToBinStr(inp[i]);
	return out;
}

function BinStrToHexStr(inp) {
	// Pass the 4 character length substrings for conversion in Hex
	let out = "";
	for(let i = 0; i < inp.length; i=i+4) out+= BinCharToHexChar(inp.substr(i,4));
	return out;
}

function XorBit(bit1, bit2) { return (bit1 == bit2)? 0: 1; }

function XorBitString(inp1, inp2) {
// Assumption bith length are same.
	let out = "";
	for(let i = 0; i<inp1.length; i++){ out+= XorBit(inp1[i], inp2[i]); }
	return out;
}

function FixedXor(inp1, inp2){
	let
		inp1Bin   = HexStrToBinStr(inp1),
		inp2Bin   = HexStrToBinStr(inp2),
		outXorBin = XorBitString(inp1Bin, inp2Bin);

	return BinStrToHexStr(outXorBin);
}

// challenge 2 assert
ASSERT("746865206b696420646f6e277420706c6179" == FixedXor("1c0111001f010100061a024b53535009181c", "686974207468652062756c6c277320657965"));
