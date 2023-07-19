const video = document.getElementById('video')
function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => {console.error(err),
    alert("PLEASE ALLOW CAMERA ACCESS TO TAKE YOUR VIDEO"),
   window.location.reload()}
  )
  
}

function getDistance(x1, y1, x2, y2) {
  let y = x2 - x1;
  let x = y2 - y1;

  return Math.sqrt(x * x + y * y);
}

let model;
let ctx = document.getElementById('canvas').getContext("2d");
const detectFaces = async () => {
  const prediction = await model.estimateFaces(video, false);
  // console.log(prediction);
  if (prediction.length > 0) {
    for (let i = 0; i < prediction.length; i++) {
      const start = prediction[i].topLeft;
      const end = prediction[i].bottomRight;
      const size = [end[0] - start[0], end[1] - start[1]];
      const markings = prediction[i].landmarks;
      const prob = prediction.probability;
      ctx.lineWidth = "3";

      ctx.drawImage(video, 0, 0, 638, 480);
      ctx.strokeStyle = "#FF0000";
      ctx.fillStyle = "#00FF00"
      ctx.beginPath();
      // Render a rectangle over each detected face.
      ctx.rect(start[0], start[1], size[0], size[1]);
      ctx.font = "20px red Seoge UI"
      ctx.fillText("Face:" + (i + 1), start[0], start[1] - 5);
      ctx.stroke();
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "red";
      // ctx.moveTo(markings[0][0],markings[0][1]);
      // ctx.lineTo(markings[0][0]+5,markings[0][1]);
      // ctx.moveTo(markings[1][0],markings[1][1]);
      // ctx.lineTo(markings[1][0]+5,markings[1][1]);
      // ctx.moveTo(markings[2][0],markings[2][1]);
      // ctx.lineTo(markings[2][0]+5,markings[2][1]);
      // ctx.moveTo(markings[3][0],markings[3][1]);
      // ctx.lineTo(markings[3][0]+5,markings[3][1]);
      // ctx.moveTo(markings[4][0],markings[4][1]);
      // ctx.lineTo(markings[4][0]+5,markings[4][1]);
      // ctx.moveTo(markings[5][0],markings[5][1]);
      // ctx.lineTo(markings[5][0]+5,markings[5][1]);
      var size_btw_eyes = getDistance(markings[0][0], markings[0][1], markings[1][0], markings[1][1]);
      let newImage = new Image();
      newImage.src = 'https://www.transparentpng.com/thumb/sunglasses/sunglasses-png-clipart-images-34.png'
      // ctx.globalAlpha = 0.0;
      newImage.onload = () => {
        // Draw the image onto the context
        ctx.drawImage(newImage, markings[4][0],markings[4][1]*0.94  ,markings[5][0]-markings[4][0],size[1]*0.3);
      }
      ctx.stroke();
      ctx.fillStyle = "black";
      ctx.globalAlpha = 0.3;-
      
      // console.log(size_btw_eyes)
      // ctx.roundRect(markings[0][0] - (size_btw_eyes / 3.5), markings[0][1] - (size_btw_eyes / 5.2), (size_btw_eyes / 2) + 8, (size_btw_eyes / 2) - 7, 3);

      // ctx.roundRect(markings[1][0] - (size_btw_eyes / 3), markings[1][1] - (size_btw_eyes / 5.2), (size_btw_eyes / 2) + 8, (size_btw_eyes / 2) - 7, 3);
      // ctx.moveTo(markings[0][0] - (size_btw_eyes / 4) + (size_btw_eyes / 2) + 8, markings[0][1] - (size_btw_eyes / 5.2) + (((size_btw_eyes / 2) - 7) / 2))
      // ctx.lineTo(markings[1][0] - (size_btw_eyes / 3), markings[1][1] - (size_btw_eyes / 5.2) + (((size_btw_eyes / 2) - 7) / 2))
      // ctx.fill()

      ctx.stroke();
    }
  }
};
startVideo();
video.addEventListener("loadeddata", async () => {
  model = await blazeface.load();
  setInterval(detectFaces, 10);
});

