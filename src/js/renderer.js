const slideshow = document.getElementById("slideshow");

window.electronAPI.getImage((e,data) => {

  // setting img element
  const image = document.createElement("img");
  image.width = "150"
  image.height = "150"
  image.src = data;

  slideshow.append(image);
  
})