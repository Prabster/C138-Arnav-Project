status = "";
input = "";
objects = [];

function preload() {
}

function setup() {
    canvas = createCanvas(600, 450);
    canvas.position(665, 450);

    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 600, 450);

    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (let i = 0; i < objects.length; i++) {
            objectsLabel = objects[i].label;
            objectsConfidence = Math.floor(objects[i].confidence * 100) + "%";
            objectsHeight = objects[i].height;
            objectsWidth = objects[i].width;
            objectsX = objects[i].x;
            objectsY = objects[i].y;

            r = random(255);
            g = random(255);
            b = random(255);

            stroke(r, g, b);
            noFill();
            textSize(25);
            text(objectsLabel + ": " + objectsConfidence, objectsX, objectsY);
            rect(objectsX, objectsY, objectsWidth, objectsHeight);

            if (objects == "input") {
                document.getElementById("object").innerHTML = "Object: Detected";
            } else {
                document.getElementById("object").innerHTML = "Object: Not Detected";
            }
        }
    }
}


function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Staus: Detecting Objects";
    input = document.getElementById("input").value;
}

function modelLoaded() {
    console.log("Your Model Has Been Initialized");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}