// ## FILTERED LS (Exercise 5 of 13)  

//   Create a program that prints a list of files in a given directory,  
//   filtered by the extension of the files. You will be provided a directory  
//   name as the first argument to your program (e.g. '/path/to/dir/') and a  
//   file extension to filter by as the second argument.  

//   For example, if you get 'txt' as the second argument then you will need to  
//   filter the list to only files that end with .txt. Note that the second  
//   argument will not come prefixed with a '.'.  

//   The list of files should be printed to the console, one file per line. You  
//   must use asynchronous I/O.  

//  ─────────────────────────────────────────────────────────────────────────────  

//  ## HINTS  

//   The fs.readdir() method takes a pathname as its first argument and a  
//   callback as its second. The callback signature is:  

//      function callback (err, list) { /* ... */ }  

//   where list is an array of filename strings.  

//   Documentation on the fs module can be found by pointing your browser here:  
//   file:///home/ubuntu/.nvm/versions/node/v4.3.2/lib/node_modules/learnyounod  
//   e/node_apidoc/fs.html  

//   You may also find node's path module helpful, particularly the extname  
//   method.  

//   Documentation on the path module can be found by pointing your browser  
//   here:  
//   file:///home/ubuntu/.nvm/versions/node/v4.3.2/lib/node_modules/learnyounod  
//   e/node_apidoc/path.html  

var fs = require('fs');
var path = require('path');

var pathName = process.argv[2];
var extension = '.' + process.argv[3];

fs.readdir(pathName, function(err, list) {
    if (err) {
        console.log(err);
    }

    list.forEach(function(element) {
        var ext = path.extname(element);
        if (extension == ext) {
            console.log(element);
        }
    });
    
    // for (var i = 0; i < list.length; i++) {
    //     var ext = path.extname(list[i]);
    //     if (extension == ext) {
    //         console.log(list[i]);
    //     }
    // }

});

// learnyounode solution: 
//  var fs = require('fs')  
//  var path = require('path')  

//  fs.readdir(process.argv[2], function (err, list) {  
//   list.forEach(function (file) {  
//      if (path.extname(file) === '.' + process.argv[3])  
//       console.log(file)
//   })  
//  })