var Sound = "";
var RwX = 0;
var RwY = 0;
var LwX = 0;
var LwY = 0;

function preload(){
    Sound = loadSound("music.mp3");
}

function setup(){
  Canvas = createCanvas(400,350);
  Canvas.center();
  Video = createCapture(VIDEO);
  Video.hide();
  PoseNet = ml5.poseNet(Video, Status);
  PoseNet.on("pose", Result);
}

function draw(){
    image(Video,0,0,400,350);
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
    if (Report.length > 0){
        console.log(Report);
        RwX = Report[0].pose.rightWrist.x;
        RwY = Report[0].pose.rightWrist.y;
        LwY = Report[0].pose.leftWrist.y;
        LwX = Report[0].pose.leftWrist.x;

        console.info(RwY,RwX,LwY,LwX);
    }
}