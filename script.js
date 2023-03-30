//Unsplash API
const count = 10;
const apiKey = "Ychw4o5R3UKCOnCWBcuxOo6nzD6Avy_NFKeOZRLwk5M";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//get photos from Unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    //Catch error here
  }
}

//on load
getPhotos();
