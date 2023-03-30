const imageContinaer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

//Unsplash API
const count = 10;
const apiKey = "Ychw4o5R3UKCOnCWBcuxOo6nzD6Avy_NFKeOZRLwk5M";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Helper fucntion to set attribute on dom elements
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Create Elements for links & Photos, add to DOM
function displayPhotos() {
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
    //Put <img> inside <a>, then put both inside imagecontainer element
    item.appendChild(img);
    imageContinaer.appendChild(item);
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

//on load
getPhotos();
