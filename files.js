// files.js
var fs = require('fs');
var path = require('path');
module.exports = {
  fs: require('fs'),
  path: require('path'),
  walkDir: function(dir, callback){
    fs.readdirSync(dir).forEach( f => {
      let dirPath = path.join(dir, f);
      let isDirectory = fs.statSync(dirPath).isDirectory();
      callback(path.join(dir, f));
    });
  }
}
