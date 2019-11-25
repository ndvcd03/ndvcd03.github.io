// This is the javascript file for the video 8 on Rich Armstrong Skillshare Parallax Course


// html setup

var itemsHTMLCollection = document.getElementsByClassName("parallax-item");

var itemsArray = Array.from(itemsHTMLCollection);

// console.log("pupilsHTMLCollection", pupilsHTMLCollection);
console.log("itemsArray", itemsArray);





// input section
var input = {
  mouseX: {
    // start: 0,
    // end: window.innerWidth,
    start: 0,
    end: window.innerWidth,
    current: 0,
  },
  mouseY: {
    start: 0,
    end: window.innerHeight,
    current: 0,
  }
};

input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;



// output section
var output = {
  x: {
    // the start and end determine how much movement there will be on parallax scroll. The higher the number the more movement there is.
    start: -150,
    end: 150,
    current: 0,
  },
  y: {
    start: -150,
    end: 150,
    current: 0,
  },
  zIndex: {
    range: 10000,
  },
  scale: {
    start: 1,
    end: 0.3,
  },
  blur: {
    startingDepth: .5,
    range: 20,
  }
};

output.scale.range = output.scale.end - output.scale.start;
output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;

var mouse = {
  // Things are slightly off with the static x and y coordinates and we need them to be dynamic.
  // x: 0,
  // y: 0,
  x: window.innerWidth * .5,
  y: window.innerHeight * .5,
}

// function(name for this goes here) —————— the content you put between the parenthase is what ever name you want to come up with.
// the below code logs the ENTIRE event resulting in a HUGE list of different data. Rather than logging the entire event we want to log just the x y cordinates of the cursor.
// var handleMouseMove = function(event) {
//   console.log("event", event)
// }

// ******** first example of eventListener and how that registered the mousemove event.
// window.addEventListener("mousemove", function() {
//   console.log("working!")
// })

// code that just lists the x coordinate value for the mouseMove
// var handleMouseMove = function(event) {
//   console.log("event.clientX", event.clientX)
// }

var updateInputs = function() {
  // mouse x input
  // input.mouseX.current = event.clientX;
  input.mouseX.current = mouse.x;
  input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;
  // mouse y input
  // input.mouseY.current = event.clientY;
  input.mouseY.current = mouse.y;
  input.mouseY.fraction = (input.mouseY.current - input.mouseY.start) / input.mouseY.range;
}

var updateOutputs = function() {
  // output x and y
  output.x.current = output.x.end - (input.mouseX.fraction * output.x.range);
  output.y.current = output.y.end - (input.mouseY.fraction * output.y.range);
}

var updateEachParallaxItem = function() {
  // apply output to html
  itemsArray.forEach(function(item, k) {

    var depth = parseFloat(item.dataset.depth, 10);

    var itemOutput = {
      x: output.x.current - (output.x.current * depth),
      y: output.y.current - (output.y.current * depth),
      zIndex: output.zIndex.range - (output.zIndex.range * depth),
      scale: output.scale.start + (output.scale.range * depth),
      blur: (depth - output.blur.startingDepth) * output.blur.range,
    };

    console.log(k, "depth", depth);
    item.style.filter = "blur(" + itemOutput.blur + "px)";
    item.style.zIndex = itemOutput.zIndex;
    item.style.transform = "scale(" + itemOutput.scale + ") translate(" + itemOutput.x + "px, " + itemOutput.y + "px)";
  });
}

var handleMouseMove = function(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  updateInputs();
  updateOutputs();
  updateEachParallaxItem();
}

var handleResize = function() {
  input.mouseX.end = window.innerWidth;
  input.mouseX.range = input.mouseX.end - input.mouseX.start;
  input.mouseY.end = window.innerHeight;
  input.mouseY.range = input.mouseY.end - input.mouseY.start;

}

window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("resize", handleResize);

// by placing these down here at the bottom of your code you will see the items as scaled AND blurred as soon as the page is loaded and NOT just on the movement of the mouse. Things are also now in the right order as soon as the page is loaded. Before the items were layered like you'd see with default html.
updateInputs();
updateOutputs();
updateEachParallaxItem();
