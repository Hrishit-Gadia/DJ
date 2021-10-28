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
    Canvas = createCanvas(400, 350);
    Canvas.center();
    Video = createCapture(VIDEO);
    Video.hide();
    PoseNet = ml5.poseNet(Video, Status);
    PoseNet.on("pose", Result);
}

function draw() {
    image(Video, 0, 0, 400, 350);
    fill("red");
    stroke("red");
    if (ScoreLeft > 0.2) {
        circle(LwX, LwY, 20);

        var Left01 = Number(LwY);
        var Left02 = floor(Left01);
        var Left03 = Left02 / 350;
        document.getElementById("V").innerHTML = "Volume : " + Left03;
        Sound.setVolume(Left03);
    }

    if (ScoreRight > 0.2) {
    circle(RwX, RwY, 20);
    var Right01 = Number(RwY);
    var Right02 = floor(Right01);
    var Right03 = Right02 / 350;
    document.getElementById("V").innerHTML = "Speed : " + Right03;
    Sound.rate(Right03);
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
        console.warn(ScoreLeft);
        console.info(RwY, RwX, LwY, LwX);
    }
}