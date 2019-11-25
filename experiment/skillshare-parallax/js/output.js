// This is the javascript file for the Capturing the Outputs to make the eyes follow the cursor on Rich Armstrong Skillshare Parallax Course


// html setup

var pupilsHTMLCollection = document.getElementsByClassName ("pupil");

var pupilsArray = Array.from(pupilsHTMLCollection);

// console.log("pupilsHTMLCollection", pupilsHTMLCollection);
console.log("pupilsArray", pupilsArray);





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
    start: -75,
    end: 75,
    current: 0,
  },
  y: {
    start: -75,
    end: 75,
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
  // the code below means that the pupils will follow your cursor. If you want to have the pupils go the opposite direction of the cursor than use the code on line 105
output.x.current = output.x.start + (input.mouseX.fraction * output.x.range);

output.x.opposite = output.x.end - (input.mouseX.fraction * output.x.range);

// the inverse pupil move
// output.x.current = output.x.end - (input.mouseX.fraction * output.x.range);

// output y
output.y.current = output.y.start + (input.mouseY.fraction * output.y.range);

output.y.opposite = output.y.end - (input.mouseY.fraction * output.y.range);

// apply output to html
pupilsArray.forEach(function (pupil, k){

//  if (k === 0) {
//   pupil.style.transform = "translate("+output.x.current+"px, "+output.y.current+"px)";
// } else {
//   pupil.style.transform = "translate("+output.x.current+"px, "+output.y.current+"px)";
// }

if (k === 0) {
 pupil.style.transform = "translate("+output.x.opposite+"px, "+output.y.opposite+"px)";
} else {
 pupil.style.transform = "translate("+output.x.current+"px, "+output.y.current+"px)";
}



  // pupil.style.transform = "translate("+output.x.current+"px, "+output.y.current+"px)";
  // pupil.style.transform = "translateY("+output.y.current+"px)";
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
