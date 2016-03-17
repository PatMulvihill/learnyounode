//  ## MY FIRST I/O! (Exercise 3 of 13)  
   
//   Write a program that uses a single synchronous filesystem operation to  
//   read a file and print the number of newlines (\n) it contains to the  
//   console (stdout), similar to running cat file | wc -l.  
   
//   The full path to the file to read will be provided as the first  
//   command-line argument (i.e., process.argv[2]). You do not need to make  
//   your own test file.  




// This is how you load a node global module
// Now I have full fs (filesystem) module in a var called fs
var fs = require('fs');

// All synchronous (or blocking) methods in fs module end with "Sync"
// To read a file, fs.readFileSync('/path/to/file') -> returns Buffer object
// returned Buffer object contains complete contents of file

var buf = fs.readFileSync(process.argv[2]);

//  Documentation on the fs module can be found by pointing your browser here:  
//   file:///home/ubuntu/.nvm/versions/node/v4.3.2/lib/node_modules/learnyounod  
//   e/node_apidoc/fs.html  

// Buffer objects are Node's way of efficiently representing arbitrary arrays  
//   of data, whether it be ascii, binary or some other format. Buffer objects  
//   can be converted to strings by simply calling the toString() method on  
//   them. e.g. var str = buf.toString().  

var bufStr = buf.toString();

//   Documentation on Buffers can be found by pointing your browser here:  
//   file:///home/ubuntu/.nvm/versions/node/v4.3.2/lib/node_modules/learnyounod  
//   e/node_apidoc/buffer.html 

//   If you're looking for an easy way to count the number of newlines in a  
//   string, recall that a JavaScript String can be .split() into an array of  
//   substrings and that '\n' can be used as a delimiter. Note that the test  
//   file does not have a newline character ('\n') at the end of the last line,  
//   so using this method you'll end up with an array that has one more element  
//   than the number of newlines.  


var newLineArray = bufStr.split('\n');

// Subtract 1 because final line doesn't have \n
var newLineCount= newLineArray.length - 1;

console.log(newLineCount);

// Learn you node suggested solution:

// var fs = require('fs')  
       
//      var contents = fs.readFileSync(process.argv[2])  
//      var lines = contents.toString().split('\n').length - 1  
//      console.log(lines)  
       
     // note you can avoid the .toString() by passing 'utf8' as the  
     // second argument to readFileSync, then you'll get a String!  
     //  
     // fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1  