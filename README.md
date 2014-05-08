# ReSRC "Art Direction" Plugin

In a responsive design, it is typical to change an image so it can be targeted towards the features of a particular display (or set of displays). Sometimes this means cropping an image. Other times, it can mean a different image altogether that may have different proportions or may be changed in other ways to communicate more effectively in a layout.

resrc.breakpoint.js is a lightweight image "art direction" plugin for use with [resrc.js](https://github.com/resrcit/resrc.js). It bring art direction to the existing ```<img />``` tag with super clean syntax. The plugin adopts a mobile first approach, and works on all browsers that support [matchmedia](http://caniuse.com/matchmedia). Unsupported browsers fall-back gracefully to your largest image set in the breakpoint attributes. The plugin supports any sizing unit (px, em etc.) that match media understands. 

## Usage

1. Include [resrc.js](http://use.resrc.it/0.7):

  ```html
  <script src="//use.resrc.it/0.7"></script>
  ```

2. Include the plugin:

  ```html
  <script src="/dist/resrc.breakpoint.min.js"></script>
  ```

3. Add the appropriate data-src-[width] attribute to your image tag

  ```html
  <img data-src-0px="http://app.resrc.it/s=w320/o=85/http://www.resrc.it/img/demo/preferred.jpg"  
       data-src-420px="http://app.resrc.it/s=w420/o=85/http://www.resrc.it/img/demo/preview.jpg"  
       data-src-720px="http://app.resrc.it/s=w720/o=85/http://www.resrc.it/img/demo/hidpi.jpg"  
       data-src-1024px="http://app.resrc.it/s=w1024/o=85/http://www.resrc.it/img/demo/css.jpg"  
       alt="" class="resrc--breakpoint"
  />
  ```

4. Call the plugin:

  ```javascript
  resrc.ready(function () {
    resrc.breakpoint();
  });
  ```
  
4. Or call the plugin and set your own defaults:

  ```javascript
  resrc.ready(function () {
    resrc.breakpoint({breakpointClass : "artdirection", prefix : "breakpoint-src-"});
  });
  ```
      
## Examples:

* [Basic](https://github.com/resrcit/resrc.breakpoint.js/blob/master/examples/example.html)
* [Advanced](https://github.com/resrcit/resrc.breakpoint.js/blob/master/examples/example-advanced.html)

## Demos:

* [Basic](http://jsfiddle.net/v4s26)
* [Advanced](http://jsfiddle.net/j5rv6)

## Building a minified release

The repository does not contain a minified resrc.breakpoint.min.js file - this is only generated
for [RELEASES](https://github.com/resrcit/resrc.breakpoint.js/releases). To build your own minified copy
for use in development simply run ```npm install``` if you haven't already, followed by ```grunt build```.
This will generate a resrc.breakpoint.min.js file in the `dist` subdirectory.

## History

For a full list of releases and changes please see the [CHANGELOG](https://github.com/resrcit/resrc.breakpoint.js/blob/master/CHANGELOG.md).

## Contributing

Please see the [CONTRIBUTING](https://github.com/resrcit/resrc.breakpoint.js/blob/master/CONTRIBUTING.md) file for guidelines.

## Contact

Please get in touch via: [EMAIL](mailto:support@resrc.it).

## License

Copyright (C) 2014 by [ReSRC LTD](http://www.resrc.it) - The MIT License (MIT)  
Please see [LICENSE](https://github.com/resrcit/resrc.breakpoint.js/blob/master/LICENSE).