// This is the javascript file for the Beginning Parallax to make the eyes follow the cursor on Rich Armstrong Skillshare Parallax Course


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
};

output.x.range = output.x.end - output.x.start;

output.y.range = output.y.end - output.y.start;





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


var handleMouseMove = function(event) {
  input.mouseX.current = event.clientX;
  input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;

  input.mouseY.current = event.clientY;
  input.mouseY.fraction = (input.mouseY.current - input.mouseY.start) / input.mouseY.range;


  // lets cap the value of the mouseX fraction at 1
  if (input.mouseX.fraction > 1) {
    input.mouseX.fraction = 1;
  }

  if (input.mouseX.fraction < 0) {
    input.mouseX.fraction = 0;
  }

  if (input.mouseY.fraction > 1) {
    input.mouseY.fraction = 1;
  }

  if (input.mouseY.fraction < 0) {
    input.mouseY.fraction = 0;
  }

  // output x
  output.x.current = output.x.end - (input.mouseX.fraction * output.x.range);

  // output y
  output.y.current = output.y.end - (input.mouseY.fraction * output.y.range);

  // apply output to html
  itemsArray.forEach(function(item, k) {
    // the name that comes after .dataset. is the name you gave the attribute after the hyphen in the html. For example in the html we currently have data-depth so the code in javascript is .dataset.depth.
    // simple var depth below.
    // in the console log if you see the numbers coming back with quotes around them that means the browser is reading the numbers as text and NOT as digits. If the numbers don't have quotes around them that means the browser is reading them as digits which you can then use to make the parallax speed work.
    // var depth = item.dataset.depth;

    // parseFloat converts something into a number with decimal places
    // The , 10 after the item.dataset.depth, is to tell the browser that we want it to give us back a number with TWO decimal places.
    var depth = parseFloat(item.dataset.depth, 10);

    var itemOutput = {
      x:  output.x.current - (output.x.current * depth),
      y:  output.y.current - (output.y.current * depth),
      // by multiplying the zIndex by the depth it will mean that if the depth is 0 the zIndex will be 10000 or the highest thing.
      zIndex: 10000 - (10000 * depth)
    };

    console.log(k, "depth", depth);
    item.style.zIndex = itemOutput.zIndex;
    item.style.transform = "translate(" +itemOutput.x+ "px, " +itemOutput.y+ "px)";
  });


  // this needs to be at the end in order to create a log of everything that is happening above.
  // console.log("mouseX fraction", input.mouseX.fraction);
  // console.log("mouseY fraction", input.mouseY.fraction);

  // console.log("output.x.current", output.x.current);
  // console.log("output.y.current", output.y.current);

}

var handleResize = function() {
  input.mouseX.end = window.innerWidth;
  input.mouseX.range = input.mouseX.end - input.mouseX.start;
  input.mouseY.end = window.innerHeight;
  input.mouseY.range = input.mouseY.end - input.mouseY.start;

}

window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("resize", handleResize);
