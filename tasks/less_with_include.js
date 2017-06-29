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
    },
    proccessFile = function(file, lessStr, grunt){
      var srcs = file.src;
      for(var srcsInd = 0;srcsInd < srcs.length;srcsInd++){
        var fileSrcPart = srcs[srcsInd];
        lessStr += grunt.file.read(fileSrcPart);
      }
      //console.log('lessStr',lessStr);
      //var lessStr = grunt.file.read('test/include/mixin.less');
      
      
      //console.log(lessStr);
      less.render(lessStr, function (e, output) {
        if(e){
          console.log('error', e);
          return;
        }
        var lessCutted = cutFromSepartor(output.css);
        //console.log('file.dest',file.dest);
        grunt.file.write(file.dest, lessCutted);
        // h = str.indexOf(str2) + str2.length
        // str.substr(h)
        // console.log(output.css.substr());
      });
    };


module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('less_with_include', 'complie less files with prernder files', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var lessStr = '',
        myFiles = this.files;
    //console.log(this);
    // return;
    var includes = this.options().include;
    for(var fileIncInd = 0;fileIncInd <includes.length;fileIncInd++){
      var filePath = includes[fileIncInd],
            innerFiles = grunt.file.expand(filePath.src);
      //console.log('innerFiles',innerFiles, filePath.src);
      for(var innerFileInd = 0;innerFileInd < innerFiles.length;innerFileInd++){
        var innerFile = innerFiles[innerFileInd];
        lessStr += grunt.file.read(innerFile);
      }
      
    }
    //add spearator 
    lessStr += separtor;
    for(var myFileInd = 0;myFileInd < myFiles.length;myFileInd++){
      var filePart = myFiles[myFileInd];
      proccessFile( filePart , lessStr, grunt);
    }
    
  });

};
