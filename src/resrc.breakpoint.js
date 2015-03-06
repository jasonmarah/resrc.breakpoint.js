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

    var processElements = function(elem) {
      // Create a sources array. This will store objects containing a width, unit and a src.
      var sources = [];
      // Create a matches array. This will store source objects matched against the matchMedia.
      var matches = [];
      // Loop over each attribute of the element.
      for (var i = 0; i < elem.attributes.length; i++) {
        // Create a reference for the current attribute.
        var elemAttr = elem.attributes[i];
        // If the current attributes name contains the 'settings.prefix'.
        if (regex.test(elemAttr.nodeName)) {
          // Add an object containing width, unit and src and add it to the sources array.
          sources.push({
            "width": elemAttr.nodeName.replace(settings.prefix, "").replace(/\D/g, ""),
            "unit": elemAttr.nodeName.replace(settings.prefix, "").replace(/[0-9]/g, ""),
            "src": elemAttr.value
          });
        }
      }
      // Sort the sources array in ascending width order.
      sources = sources.sort(sortObjectByWidth);
      // Loop over the source array.
      for (var j = 0; j < sources.length; j++) {
        // If matchMedia is supported & matchMedia matches.
        if (window.matchMedia && window.matchMedia("(min-width: " + sources[j].width + sources[j].unit + ")").matches) {
          // Add the sources object to the matches array.
          matches.push(sources[j]);
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
    };

    var setElementSrc = function (elem) {
      // If a valid HTML element is passed to the function.
      if (elem && elem.attributes) {
        processElements(elem);
      }
      // If an element is found.
      else if (imgs) {
        // Loop over each element.
        for (var k = 0; k < imgs.length; k++) {
          processElements(imgs[k]);
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

    // Expose setElementSrc function.
    resrc.setElementSrc = setElementSrc;

    // return the resrc object so the public resrc methods can be chained.
    return resrc;

  };

  return resrc;

}(resrc));