var fs = require('fs');

var init = function(params) {
  var p = Object.assign({}, params);
  if (!p.prefix) {
    p.prefix = '- ';
  }
  if (!p.linkPath) {
    p.linkPath = p.path;
  }
  if (!p.fileFilter) {
    p.fileFilter = function(file) {
      return true;
    };
  }
  if (!p.dirFilter) {
    p.dirFilter = function(file) {
      return true;
    };
  }
  if (!p.newline) {
    p.newline = '\n';
  }
  return p;
};

var manageFiles = function(files, params) {
  var p = init(params);
  var result = '';
  files.filter(function(file) {
    return fs.statSync(p.path + "/" + file).isFile() && p.fileFilter(file);
  }).forEach(function(file) {
    result += p.prefix + '[' + file + '](' + p.linkPath + '/' + file + ')' + p.newline;
  });
  return result;
};
exports.manageFiles = manageFiles;

var manageDirs = function(dirs, params) {
  var p = init(params);
  var result = '';
  dirs.filter(function(dir) {
    return fs.statSync(params.path + "/" + dir).isDirectory() && p.dirFilter(dir);
  }).forEach(function(dir) {
    result += p.prefix + dir + p.newline;
    var newp = Object.assign({}, p);
    newp.path = p.path + '/' + dir;
    newp.linkPath = p.linkPath + '/' + dir;
    newp.prefix = '  ' + p.prefix;
    result += explorer(newp);
  });
  return result;
};
exports.manageDirs = manageDirs;

var explorer = function(params) {
  var files = fs.readdirSync(params.path);
  var result = manageFiles(files, params) + manageDirs(files, params);
  return result;
};
exports.explorer = explorer;
