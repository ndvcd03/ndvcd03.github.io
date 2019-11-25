// This is the javascript file for the video 10 on Rich Armstrong Skillshare Parallax Course


// html setup

var itemsHTMLCollection = document.getElementsByClassName("parallax-item");

var itemsArray = Array.from(itemsHTMLCollection);
var html = document.documentElement;





// input section
var input = {
  scrollY: {
    start: 0,
    end: html.scrollHeight - window.innerHeight,
    current: 0,
  },
};

input.scrollY.range = input.scrollY.end - input.scrollY.start;



// output section
var output = {
  x: {
    // the start and end determine how much movement there will be on parallax scroll. The higher the number the more movement there is.
    // 0 is where the object would be if there was no parallax applied to it.
    start: -150,
    end: 150,
    current: 0,
  },
  y: {
    start: 0,
    end: 150,
    current: 0,
  },
  zIndex: {
    range: 10000,
  },
  // by making both the start and end 1 that makes scale not work. If I take the code out for scale the rest of the code gets broken, hence the work around.
  scale: {
    start: 1,
    end: 1,
  },
  blur: {
    startingDepth: 0,
    range: 0,
  }
};

output.scale.range = output.scale.end - output.scale.start;
output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;


var updateInputs = function() {
  // scrollY input
  input.scrollY.current = html.scrollTop;
  input.scrollY.fraction = (input.scrollY.current - input.scrollY.start) / input.scrollY.range;
}

var updateOutputs = function() {
  // output x and y

  output.y.current = output.y.start + (input.scrollY.fraction * output.y.range);
}

var updateEachParallaxItem = function() {
  // apply output to html
  itemsArray.forEach(function(item, k) {

    var depth = parseFloat(item.dataset.depth, 10);

    var itemInput = {
      scrollY: {
        // In example below when I've scrolled 450px down the page I want my scrollFraction to be 1 and when I've scrolled 800px down the page I want my scrollFraction to be 0. When the scroll fraction is 0 that means that the object is in its final resting place.
        // start: 450,
        // end: 800,
        // offsetParent is saying go find the parent element that has the position:relative; applied to it. so the code below is saying the following:
        // – measure the distance from the top of parent object to the top of the document window.
        // if you don't want to use the offsetParent and offsetTop that is ok but you need to use something that doesn't change its position because you are calculating two dynamic properties and if
        start: item.offsetParent.offsetTop,
        //
        end: item.offsetParent.offsetTop + window.innerHeight,
      }
    }
    // really important as this means that we can specify a start and an end for EACH item!
    itemInput.scrollY.range = itemInput.scrollY.end - itemInput.scrollY.start;
    itemInput.scrollY.fraction = (input.scrollY.current - itemInput.scrollY.start) / itemInput.scrollY.range;

    var itemOutputYCurrent = output.y.start + (itemInput.scrollY.fraction * output.y.range);

    var itemOutput = {
      x: output.x.current - (output.x.current * depth),
      y: itemOutputYCurrent * depth,
      zIndex: output.zIndex.range - (output.zIndex.range * depth),
      scale: output.scale.start + (output.scale.range * depth),
      blur: (depth - output.blur.startingDepth) * output.blur.range,
    };
    console.log(k, "fraction", itemInput.scrollY.fraction);
    console.log("scroll", input.scrollY.current);

    // console.log(k, "depth", depth);
    item.style.filter = "blur(" + itemOutput.blur + "px)";
    item.style.zIndex = itemOutput.zIndex;
    item.style.transform = "scale(" + itemOutput.scale + ") translate(" + itemOutput.x + "px, " + itemOutput.y + "px)";
  });
}

var handleScroll = function() {
  updateInputs();
  updateOutputs();
  updateEachParallaxItem();

  var scrollMax = html.scrollHeight - window.innerHeight;
  // console.log("scrollAmt", scrollAmt, "scrollMax", scrollMax)
}

var handleResize = function() {
  input.mouseX.end = window.innerWidth;
  input.mouseX.range = input.mouseX.end - input.mouseX.start;
  input.mouseY.end = window.innerHeight;
  input.mouseY.range = input.mouseY.end - input.mouseY.start;
}



document.addEventListener("scroll", handleScroll)
window.addEventListener("resize", handleResize);

// by placing these down here at the bottom of your code you will see the items as scaled AND blurred as soon as the page is loaded and NOT just on the scroll. Things are also now in the right order as soon as the page is loaded. Before the items were layered like you'd see with default html.
updateInputs();
updateOutputs();
updateEachParallaxItem();
