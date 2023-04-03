const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

//Unsplash API
let count = 5;
const apiKey = "Ychw4o5R3UKCOnCWBcuxOo6nzD6Avy_NFKeOZRLwk5M";
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images loaded
function imageLoaded() {
  console.log("image loaded");
  imagesLoaded++;
  console.log(imageLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
  }
}

//Helper fucntion to set attribute on dom elements
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Create Elements for links & Photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total images", totalImages);
  //Run function for each object in photosarray
  photosArray.forEach((photo) => {
    //Create <a> to link unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });

    //create image for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    //Put <img> inside <a>, then put both inside imagecontainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
    console.log(photosArray);
  } catch (error) {
    //Catch error here
  }
}

//Check to see if scrooling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//on load
getPhotos();
