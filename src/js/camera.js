
const video = document.getElementById("camera");
const slideshow = document.getElementById("slideshow");

navigator.mediaDevices.getUserMedia({video:true}).then((stream) => {
  video.srcObject = stream;
});

document.querySelector("#capture-image").addEventListener("click", (e) => {
  
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video,0,0,canvas.width, canvas.height);
  const dataURL = canvas.toDataURL();

  // sending data to main.js
  window.electronAPI.setImage(dataURL);

  // setting img element
  const image = document.createElement("img");
  image.width = "150"
  image.height = "150"
  image.src = dataURL;

  slideshow.append(image);

  new Notification("Image captured",{body:"Image is successfully captured from live video"})
  
})