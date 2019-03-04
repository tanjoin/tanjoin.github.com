var fs = require('fs');
var Itemization = require('./lib/itemization.js');

var main = function(argc, argv) {
  var readme = fs.readFile('../README.md', 'utf8', function(error, data) {
    if (error) {
      throw error;
    }
    var readme = data.replace(/## Contents\n[\s\S]*/, "## Contents\n\n" + Itemization.explorer({
      linkPath: '.',
      path: '..',
      fileFilter: function(file) {
        return !/^\./.test(file) && !/\.html/.test(file) && !/CNAME/.test(file) && !/\.log/.test(file);
      },
      dirFilter: function(dir) {
        return !/^\./.test(dir) &&
               !/css/.test(dir) &&
               !/js/.test(dir) &&
               !/img/.test(dir) &&
               !/tool/.test(dir);
      }
    }));
    console.log(readme);
    fs.writeFile('../README.md', readme, function(error) {
      if (error) {
        throw error;
      }
    });
  });
};

main();
