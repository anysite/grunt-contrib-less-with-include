# less-with-include

> complie less files with prernder files

##goal

this plugin would render less files to css, with prefixing other less files, but not include their output

let's say we have theme file defines mixin
> theme.less
```
.yellow{
  color:yellow;
  border: 1px solid yellow;
}

```

if we want to render it with theme file which contains
> box.less
```
.yellow-box{
  .yellow
}
```
we need to concat them, resulting the css render also the theme file

> output.css
```
.yellow{
  color:yellow;
  border: 1px solid yellow;
}
.yellow-box{
  color:yellow;
  border: 1px solid yellow;
}
```

if we will use this theme file in number of files, each of them would include the .yellow rule.

this plugin added the theme file in render stage but remove it from output so we will get 
> output.css
```
.yellow-box{
  color:yellow;
  border: 1px solid yellow;
}
```


## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install less-with-include --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('less-with-include');
```

## The "less_with_include" task

### Overview
In your project's Gruntfile, add a section named `less_with_include` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  less_with_include: {
      all: {
        options: {
          include : []//files object
          },
        files: []//files object
      }
    },
});
```

### Options

#### options.include
Type: `files`
Default value: `{}`

all the files to include before renderin less files.

### Usage Examples

In this example, all less files in example/render would be rendered to example/rendered. eahc file would be rendered with example/include included

```js
grunt.initConfig({
  less_with_include: {
      all: {
        options: {
          include : [{
              src: 'example/include/*.less'
              }
            ]
          },
        files: [{
            expand: true,       
            cwd: 'example/render', 
            src: ['*.less'], 
            dest: 'example/rendered', 
            ext: '.css',   

        }]
      }
    },
});
```

## Contributing
This module Contributed by [Hapisga](http://hapisga.co.il/)

## Release History
_(Nothing yet)_
