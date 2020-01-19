// Code for the Sidebar navigation.
// Navigation drawer pulls in from the right side of the screen just like the content modules animate in from the left to the right.

$(document).ready(function (){
    //ID or Class name of the button goes into the first section
    $('#openbtn').click(function() {
        //ID or Class name of the modal you want to appear on click goes into this second area.
        $("#mySidebar").toggleClass("hidden");
        });
});

$(document).ready(function (){
    //ID or Class name of the button goes into the first section
    $('#closebtn').click(function() {
        //ID or Class name of the modal you want to appear on click goes into this second area.
        $("#mySidebar").toggleClass("hidden");
        });
});
