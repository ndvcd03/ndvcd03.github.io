// This is the javascript file for the Capturing Mouse Movement video on Rich Armstrong Skillshare Parallax Course

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

// this needs to be at the end in order to create a log of everything that is happening above.
  console.log("mouseX fraction", input.mouseX.fraction)
  console.log("mouseY fraction", input.mouseY.fraction)

}

var handleResize = function() {
  input.mouseX.end = window.innerWidth;
  input.mouseX.range = input.mouseX.end - input.mouseX.start;
  input.mouseY.end = window.innerHeight;
  input.mouseY.range = input.mouseY.end - input.mouseY.start;

}


window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("resize", handleResize);
