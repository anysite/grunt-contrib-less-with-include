'use strict';

var grunt = require('grunt'),
    less = require('less');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.less_with_include = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    
    var toTest = grunt.file.expand('test/expected/*.css');
    if(toTest.length){
      test.expect(toTest.length);
    }
    for(var fileInd = 0; fileInd < toTest.length; fileInd++){
      console.log('fileInd',fileInd);
      var filePath = toTest[fileInd],
          actual = grunt.file.read(filePath.replace(/test\/expected/g,'tmp')),
          expected = grunt.file.read(filePath);
          
      //now run css in less to equlize apsces, line breaks yada yada
          console.log('filePath', filePath, filePath.replace(/test\/expected/g,'tmp'), filePath.split('/').pop() );
      test.equal(actual, expected, filePath.split('/').pop() + ' passed');
    }
    

    test.done();
  }
};
