/*
	http://cryptopals.com/sets/1/challenges/1

	Convert hex to base64
	The string:

	49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d
	Should produce:

	SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t
	So go ahead and make that happen. You'll need to use this code for the rest of the exercises.

	Cryptopals Rule
	Always operate on raw bytes, never on encoded strings. Only use hex and base64 for pretty-printing.

*/

/* Solution

	1. Each hex character is from 0 to F and takes 4 bits. Convert each hex character to 4 bits
	2. Take 6 bits , convert to base 10 decimal and get relevant base64 from each lookup table
	3. Append = as required for padding

	E.g. 
	4 - 0100
	9 - 1001
	2 - 0010

	converted to 
	010010 - 18 - S
	010010- 18 - s

*/

function HexCharToBinStr(inp) { return parseInt(inp, 16).toString(2).padStart(4,0); }
function BinStrToDecInt(inp) { return parseInt(inp, 2).toString(10); }

var
	LOOKUP     = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','+','/',],
	INPUT      = "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d",
	OUTPUT     = "SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t",
	pendingStr = "",
	out        = "";

for(let i = 0; i < INPUT.length; i++) {
	let bitStr = HexCharToBinStr(INPUT[i]);

	// console.log("bitStr", INPUT[i], bitStr, pendingStr);
	pendingStr += bitStr;


	if (pendingStr.length >= 6) {

		// convert 6 chrrs in base64
		toConvert = pendingStr.slice(0,6);
		out+= LOOKUP[BinStrToDecInt(toConvert)];

		// console.log("toConvert ", toConvert, out);
		// truncate those 6 chars
		pendingStr = pendingStr.substring(6);
		// console.log("pendingStr ", pendingStr);
	}
}

// PAdding in case 4 bytes are missing

console.log(pendingStr);
console.log(out);
console.log(OUTPUT)
