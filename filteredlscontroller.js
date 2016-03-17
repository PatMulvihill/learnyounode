var filemodule = require("./filteredlsmodule.js");

var dir = process.argv[2];
var ext = process.argv[3];

filemodule(dir,ext,function(err,files){
    if(err){
        throw new Error("Error");
    }
    else{
        for(var i = 0; i < files.length; i++){
            console.log(files[i]);
        }
    };
});

// learn you node suggested solution: 

//  var filterFn = require('./solution_filter.js')  
//      var dir = process.argv[2]  
//      var filterStr = process.argv[3]  
       
//      filterFn(dir, filterStr, function (err, list) {  
//       if (err)  
//          return console.error('There was an error:', err)  
       
//       list.forEach(function (file) {  
//          console.log(file)  
//       })  
//      })  