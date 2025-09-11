const selectBreed = document.getElementById("breedSelect");
const breedImg = document.getElementById("breedImage");
const breedInfo = document.getElementById("breedInfo");

async function selectBreeds() {
  try {
    const result = await fetch("http://localhost:3000/api/breeds");
    const data = await result.json();
    console.log(data)
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
  try {
    const imageResult = await fetch(`http://localhost:3000/api/cat/${breedId}`)
    const cat = await imageResult.json();

    if (!cat || !cat.breeds || !cat.breeds[0]) {
      breedInfo.textContent = "No information about this cat breed.";
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

