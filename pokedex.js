let body = document.querySelector("body");
let divSupreme = document.createElement("div");
divSupreme.classList.add("div-supreme");
let header = document.createElement("header");
let h1 = document.createElement("h1");
h1.classList.add("tittle");
let divMain = document.createElement("div");
divMain.classList.add("div-container-cards");
let searchPokemonContainer = document.createElement("div");
searchPokemonContainer.classList.add("input-container");
let inputSearch = document.createElement("input");
inputSearch.classList.add("input-text");
inputSearch.setAttribute("type", "text");
inputSearch.setAttribute("placeholder", "Who`s that Pokemon?");
let submitButton = document.createElement("input");
submitButton.classList.add("submit-button");
submitButton.setAttribute("type", "submit");
let divUnderSearch = document.createElement("div");
divUnderSearch.classList.add("under-search");

searchPokemonContainer.appendChild(inputSearch);
searchPokemonContainer.appendChild(submitButton);
{
  /* <div id="input-container">
<input type="text" placeholder="who`s that pokemon" id="input-text">
<input type="submit"  id="submit">
</div> */
}

h1.innerText = "Pokédex";
header.appendChild(h1);
divSupreme.appendChild(header);
divSupreme.appendChild(searchPokemonContainer);
divSupreme.appendChild(divUnderSearch);
divSupreme.appendChild(divMain);
body.appendChild(divSupreme);

const url = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 21; i++) {
  let randomNumber = Math.floor(Math.random() * 1000);

  fetch(url + randomNumber)
    .then((res) => res.json())
    .then((data) => pokemonCards([data]))
    .catch((err) => console.log(err));
}

function pokemonCards(object) {
  object.forEach((element) => {
    let divCard = document.createElement("div");
    divCard.classList.add("card");
    let imgCard = document.createElement("img");
    imgCard.classList.add("imageCard");
    imgCard.src = element.sprites.other["official-artwork"].front_default;
    let divCardInfo = document.createElement("div");
    divCardInfo.classList.add("container");

    divCard.appendChild(imgCard);
    divCard.appendChild(divCardInfo);
    divMain.appendChild(divCard);

    let namePokemon = document.createElement("h4");
    namePokemon.classList.add("name-pokemon");
    divCardInfo.appendChild(namePokemon);
    namePokemon.innerText =
      element.name[0].toUpperCase() +
      element.name.slice(1, element.name.length);
  });
}

submitButton.addEventListener("click", namePokemon);

function namePokemon(e) {
  e.preventDefault();

  let pokemonName = inputSearch.value.trim();
  console.log(pokemonName);
  if (pokemonName) {
    divUnderSearch.textContent = "";
    fetch(url + `${pokemonName}`)
      .then((res) => res.json())
      .then((data) => pokemonDescriptions([data]));
    inputSearch.value = "";
  } else {
    divUnderSearch.textContent = "";
    noRepeatPokemon();
  }
}

function noRepeatPokemon() {
  let infoNoPokemon = document.createElement("div");
  let paragraph = document.createElement("p");
  paragraph.innerText = "Please insert your pokemon`s name";
  infoNoPokemon.appendChild(paragraph);
  divUnderSearch.appendChild(infoNoPokemon);
}

function pokemonDescriptions(pokeNames) {
  pokeNames.forEach((element) => {
    let divDes = document.createElement("div");
    divDes.classList.add("card-description");
    let imgCardDes = document.createElement("img");
    imgCardDes.classList.add("image-card-description");
    imgCardDes.src = element.sprites.other["official-artwork"].front_default;
    let divCardInfoDes = document.createElement("div");
    divCardInfoDes.classList.add("containerDes");

    divDes.appendChild(imgCardDes);
    divDes.appendChild(divCardInfoDes);
    divUnderSearch.appendChild(divDes);

    let namePokemon = document.createElement("h4");
    namePokemon.classList.add("name-pokemon-description");
    divCardInfoDes.appendChild(namePokemon);
    namePokemon.innerText =
      element.name[0].toUpperCase() +
      element.name.slice(1, element.name.length);
  });
}
