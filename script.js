require('dotenv').config()

const fetch = require('node-fetch')

const url = "https://api.thecatapi.com/v1/images/search";
const breedUrl = "https://api.thecatapi.com/v1/breeds";
const apikey = process.env.API_KEY;

const selectBreed = document.getElementById("breedSelect");
const breedImg = document.getElementById("breedImage");
const breedInfo = document.getElementById("breedInfo");

async function selectBreeds() {
  try {
    const result = await fetch(breedUrl, {
      headers: {
        "x-api-key": apikey,
      },
    });

    const data = await result.json();
    data.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      selectBreed.appendChild(option);
    });
  } catch (err) {
    console.error("Error:", err);
  }
}

selectBreeds();

async function catImages(breedId) {
  const breedImgUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  try {
    const imageResult = await fetch(breedImgUrl, {
      headers: {
        "x-api-key": apikey,
      },
    });
    const breeds = await imageResult.json();
    const cat = breeds[0];
    if (!cat || !cat.breeds || !cat.breeds[0]) {
      breedInfo.textcontent = "No information about this cat breed.";
      breedImg.src = "";
      return;
    }
    const breed = cat.breeds[0];
    breedImg.src = cat.url;
    breedImg.alt = breed.name;
    breedInfo.textContent = `${breed.name} - ${breed.temperament}`;
  } catch (err) {
    console.error("Error:", err);
  }
}

selectBreed.addEventListener("change", () => {
  const breedId = selectBreed.value;
  if (!breedId) return;
  catImages(breedId);
});

