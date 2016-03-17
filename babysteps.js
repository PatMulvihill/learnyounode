// this program sums up all the arguments passed to it
var sum = 0;

// i starts at 2 because first 2 args are path to node and path to babysteps.js
for (var i = 2; i < process.argv.length; i++) {
    sum = sum + Number(process.argv[i]);
}


console.log(sum);