(function (resrc) {
  "use strict";
  resrc.breakpoint = function (options) {

    var defaults = {
      breakpointClass : "resrc--breakpoint",
      prefix : "data-src-"
    };

    var settings = resrc.extend(defaults, options);
    var imgs = resrc.getElementsByClassName(settings.breakpointClass);
    var regex = new RegExp("^" + settings.prefix + ".*");

    var sortObjectByWidth =  function (obj1, obj2) {
      return obj1.width - obj2.width;
    };

    var useFallbackImgPath = function () {
      this.src = resrc.getResrcImageObject(this).fallbackImgPath;
    };

    var setElementSrc = function () {
      // If an element is found.
      if (imgs) {
        // Loop over each element.
        for (var i = 0; i < imgs.length; i++) {
          // Create a sources array. This will store objects containing a width, unit and a src.
          var sources = [];
          // Create a matches array. This will store source objects matched against the matchMedia.
          var matches = [];
          // Create a reference to the current element.
          var elem = imgs[i];
          // Loop over each attribute of the element.
          for (var j = 0; j < elem.attributes.length; j++) {
            // Create a reference for the current attribute.
            var elemAttr = elem.attributes[j];
            // If the current attributes name contains the 'settings.prefix'.
            if (regex.test(elemAttr.nodeName)) {
              // Add an object containing width, unit and src and add it to the sources array.
              sources.push(
                { "width" : elemAttr.nodeName.replace(settings.prefix, "").replace(/\D/g, ""),
                  "unit"  : elemAttr.nodeName.replace(settings.prefix, "").replace(/[0-9]/g, ""),
                  "src"   : elemAttr.value }
              );
            }
          }
          // Sort the sources array in ascending width order.
          sources = sources.sort(sortObjectByWidth);
          // Loop over the source array.
          for (var k = 0; k < sources.length; k++) {
            // If matchMedia is supported & matchMedia matches.
            if (window.matchMedia && window.matchMedia("(min-width: " + sources[k].width + sources[k].unit + ")").matches) {
              // Add the sources object to the matches array.
              matches.push(sources[k]);
            }
            // If matchMedia is not supported
            if (!window.matchMedia) {
              // Add the last sources object to the match array
              // Break out of the loop
              matches.push(sources[sources.length - 1]);
              break;
            }
          }
          // If there is a match.
          if (matches.length) {
            // Create a reference to last matched object.
            var matchedEl = matches.pop();
            // If the src of the element is NOT the same as the matchedEl.src
            if (matchedEl.src !== elem.getAttribute("data-src")) {
              // Set the data-src of the element to the src of the matchedEl object.
              elem.setAttribute("data-src", matchedEl.src);
              // Set the element src by calling the resrc.getResrcImageObject public method.
              elem.src = resrc.getResrcImageObject(elem).resrcImgPath;
              // Fallback gracefully to the remote image if there is an error.
              elem.onerror = useFallbackImgPath;
              // Remove the width and height from the element.
              elem.removeAttribute("width");
              elem.removeAttribute("height");
            }
          }
        }
      }
    };

    // Add a resize event listener so it runs when the browser window size changes.
    if (window.addEventListener) {
      window.addEventListener("resize", setElementSrc, false);
    } else if (window.attachEvent) {
      window.attachEvent("onresize", setElementSrc);
    }

    // Execute the setElementSrc function.
    setElementSrc();

    // return the resrc object so the public resrc methods can be chained.
    return resrc;

  };

  return resrc;

}(resrc));