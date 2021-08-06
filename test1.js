var fs = require('fs');

// file is included here:
eval(fs.readFileSync('main.js') + '');