var txt;
var i = 0;
var speed = 0;
var lastIndex = 0;
var interval;
var dataText = [];
var speed = 0;

var slider = document.getElementById("myRange");
var output = document.getElementById("output");
output.innerHTML = String(slider.value).concat(" wpm"); 
speed = calcSpeed(parseInt(slider.value));
slider.oninput = function() {
  output.innerHTML = String(this.value).concat(" wpm");
  speed = calcSpeed(parseInt(this.value));
}

function myStop() {
    clearInterval(interval);
    lastIndex = i;
}
function myStart() {
    displayData(dataText);
}
function fileSelected(file) {
    if(file.type=="text") {
       dataText = file.data.split(" ");
       console.log(dataText)
    } else {
        createP("Please select a text file.");
    }
}

function setup() {
    noCanvas();
    var fileInput = createFileInput(fileSelected);
    fileInput.style("font-size","25px");
    fileInput.style("color","grey");
    fileInput.position(window.innerWidth/3+100,50); 
}
function displayData(dataArray) {
    var displayP = document.getElementById("displayP");
    i = lastIndex;
    interval = setInterval(function() {
        console.log("in loop");
        displayP.innerHTML = dataArray[i];
        i++;
        if(i==(dataArray.length)) {
            setTimeout(function(){
                displayP.innerHTML = '* end of file *';
                clearInterval(interval);
            },speed);
        }
    },speed)
}

function calcSpeed(speed) {
    return (60/speed)*1000;
}
