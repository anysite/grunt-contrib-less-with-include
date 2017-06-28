/*
 * less-with-include
 * https://github.com/itsick/less-with-include
 *
 * Copyright (c) 2017 Itsick
 * Licensed under the MIT license.
 */

'use strict';
var less = require('less'),
    separtor = '/* less_with_include:cut from here */',
    cutFromSepartor = function(str){
      var ind = str.indexOf(separtor);
      //console.log(ind)
      if(ind > -1){
        ind += separtor.length;
        return str.substr(ind).replace(/^\n/g,'');
      }
      else{
        return str;
      }
      }


module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('less_with_include', 'complie less files with prernder files', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    let lessStr = '',
        myFiles = this.files;
    for(let filePath of this.options().include){
      lessStr += grunt.file.read(filePath)
    }
    //add spearator 
    lessStr += separtor;
    for(let filePath of myFiles[0].src){
      lessStr += grunt.file.read(filePath)
    }
    console.log('lessStr',lessStr);
    //var lessStr = grunt.file.read('test/include/mixin.less');
    
    
    //console.log(lessStr);
    less.render(lessStr, function (e, output) {
      let lessCutted = cutFromSepartor(output.css);
      console.log('lessCutted',lessCutted);
      grunt.file.write(myFiles[0].dest, lessCutted);
      // h = str.indexOf(str2) + str2.length
      // str.substr(h)
      // console.log(output.css.substr());
    });
    // var options = this.options();

    // // Iterate over all specified file groups.
    // this.files.forEach(function(f) {
    //   // Concat specified files.
    //   var src = f.src.filter(function(filepath) {
    //     // Warn on and remove invalid source files (if nonull was set).
    //     if (!grunt.file.exists(filepath)) {
    //       grunt.log.warn('Source file "' + filepath + '" not found.');
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   }).map(function(filepath) {
    //     // Read file source.
    //     return grunt.file.read(filepath);
    //   }).join(grunt.util.normalizelf(options.separator));

    //   // Handle options.
    //   src += options.punctuation;

    //   // Write the destination file.
    //   grunt.file.write(f.dest, src);

    //   // Print a success message.
    //   grunt.log.writeln('File "' + f.dest + '" created.');
    // });
  });

};
