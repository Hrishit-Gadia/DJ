var Sound = "";
var ScoreLeft = 0;
var ScoreRight = 0;
var RwX = 0;
var RwY = 0;
var LwX = 0;
var LwY = 0;

function preload() {
    Sound = loadSound("music.mp3");
}

function setup() {
    Canvas = createCanvas(750, 500);
    Canvas.center();
    Video = createCapture(VIDEO);
    Video.hide();
    PoseNet = ml5.poseNet(Video, Status);
    PoseNet.on("pose", Result);
}

function draw() {
    image(Video, 0, 0, 750, 500);
    fill("red");
    stroke("red");

    if (ScoreLeft > 0.2) {
        circle(LwX, LwY, 20);
        var Left01 = Number(LwY);
        var Left02 = floor(Left01);
        var Left03 = Left02 / 500;
        document.getElementById("V").innerHTML = "Volume : " + Left03;
        Sound.setVolume(Left03);
    }

    if (ScoreRight > 0.2) {
        circle(RwX, RwY, 20);
        if (RwY > 0 && RwY <= 100) {
            Sound.rate(0.5);
            document.getElementById("S").innerHTML = "Speed : " + "0.5";
        }
        else if (RwY > 100 && RwY <= 200) {
            Sound.rate(1);
            document.getElementById("S").innerHTML = "Speed : " + "1";
        }
        else if (RwY > 200 && RwY <= 300) {
            Sound.rate(1.5);
            document.getElementById("S").innerHTML = "Speed : " + "1.5";
        }
        else if (RwY > 300 && RwY <= 400) {
            Sound.rate(2);
            document.getElementById("S").innerHTML = "Speed : " + "2";
        }
        else if (RwY > 400 && RwY <= 500) {
            Sound.rate(2.5);
            document.getElementById("S").innerHTML = "Speed : " + "2.5";
        }

    }

}

function play() {
    Sound.play();
    Sound.setVolume(1);
    Sound.rate(1);
}

function Status() {
    console.info("Posenet Turned On!");
}

function Result(Report) {
    if (Report.length > 0) {
        console.log(Report);
        RwX = Report[0].pose.rightWrist.x;
        RwY = Report[0].pose.rightWrist.y;
        LwY = Report[0].pose.leftWrist.y;
        LwX = Report[0].pose.leftWrist.x;
        ScoreLeft = Report[0].pose.keypoints[9].score;
        ScoreRight = Report[0].pose.keypoints[10].score;
        console.warn(ScoreLeft);
        console.info(RwY, RwX, LwY, LwX);
    }
}