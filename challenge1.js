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
	3. Padding Level 1 ( bit ) : Pad whatever is remaining with 0 for remaining bits
	4. Padding Level 2 ( Byte ): 3 bytes of input data = 4 bytes of Base64. 
		Hence if total input length module 3 = 0 , not padding, 1 will have == , 2 will have =

	E.g. 
	4 - 0100
	9 - 1001
	2 - 0010

	converted to 
	010010 - 18 - S
	010010- 18 - s



*/

var
	ASSERT = require('assert'),

	LOOKUP = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','+','/',];

function HexCharToBinStr(inp) { return parseInt(inp, 16).toString(2).padStart(4,0); }
function BinStrToDecInt(inp) { return parseInt(inp, 2).toString(10); }

function HexStrToBase64Str(inp){
	let
		inpLeng    = inp.length,
		pendingStr = "",
		out        = "";

	for(let i = 0; i < inp.length; i++) {
		let bitStr = HexCharToBinStr(inp[i]);

		// console.log("bitStr", inp[i], bitStr, pendingStr);
		pendingStr += bitStr;


		if (pendingStr.length >= 6) {

			// convert 6 chars in base64
			toConvert = pendingStr.slice(0,6);
			out+= LOOKUP[BinStrToDecInt(toConvert)];

			// console.log("toConvert ", toConvert, out);
			// truncate those 6 chars
			pendingStr = pendingStr.substring(6);
			// console.log("pendingStr ", pendingStr);
		}
	}

	// Padding Level 1
	if(pendingStr.length > 0) {
		pendingStr = pendingStr.padEnd(6,0);
		out+= LOOKUP[BinStrToDecInt(pendingStr)];
	}

	// padding Level 2 : This is hex string hence to calc bytes we multiply by 2
	padLength = ((inpLeng * 2) % 3);
	if (padLength == 1) out+= "==";
	else if (padLength == 2) out+= "=";

	return out;
}

ASSERT("EjQ=" == HexStrToBase64Str("1234"));
ASSERT("EjRW" == HexStrToBase64Str("123456"));
ASSERT("EjRWeA==" == HexStrToBase64Str("12345678"));

// challenge 1 assert
ASSERT("SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t" == HexStrToBase64Str("49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d"));
