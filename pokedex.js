let body = document.querySelector("body");
let divSupreme = document.createElement("div");
divSupreme.classList.add("div-supreme");
let header = document.createElement("header");
let h1 = document.createElement("h1");
h1.classList.add("tittle");
let divMain = document.createElement("div");
divMain.classList.add("div-container-cards");

h1.innerText = "Pokédex";
header.appendChild(h1);
divSupreme.appendChild(header);
divSupreme.appendChild(divMain);
body.appendChild(divSupreme);

const url = "https://pokeapi.co/api/v2/pokemon/";

const numberOfPokemon = 210;

const fetchPromises = [];
for (let i = 1; i <= numberOfPokemon; i++) {
  fetchPromises.push(fetch(url + i).then((res) => res.json()));
}

Promise.all(fetchPromises)
  .then((data) => {
    // data.sort((a, b) => a.id - b.id);
    pokemonCards(data);
  })
  .catch((error) => {
    console.error("Error fetching Pokémon data:", error);
  });

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
