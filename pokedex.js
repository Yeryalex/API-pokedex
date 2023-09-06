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

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    fecthingForimages(data);
  });

function fecthingForimages(a) {
  for (let i = 1; i <= a.results.length; i++) {
    fetch(url + i)
      .then((res) => res.json())
      .then((data) => pokemonCards([data]));
  }
}

// function pokemon(myObject) {
//   console.log(myObject);
// }

function pokemonCards(object) {
  object.forEach((element) => {
    let divCard = document.createElement("div");
    divCard.classList.add("card");
    let imgCard = document.createElement("img");
    imgCard.classList.add("imageCard");
    imgCard.src = element.sprites.other.home.front_default;
    let divCardInfo = document.createElement("div");
    divCardInfo.classList.add("container");

    divCard.appendChild(imgCard);
    divCard.appendChild(divCardInfo);
    divMain.appendChild(divCard);

    let namePokemon = document.createElement("h4");
    divCardInfo.appendChild(namePokemon);
    namePokemon.innerText = element.name;
  });
}

// async function getPokemon() {
//   try {
//     const url = "https://pokeapi.co/api/v2/pokemon-species/";
//     const res = await fetch(url);
//     const jsonRes = await res.json();
//     return jsonRes;
//   } catch (err) {
//     console.log(err.toString());
//   }
// }

// getPokemon().then((data) => {
//   console.log(data.results);

//   pokemonCards(data);
// });

// async function getPokemonImage() {
//     try {

//       const url = "https://pokeapi.co/api/v2/pokemon-species/";
//       const res = await fetch(url);
//       const jsonRes = await res.json();
//       return jsonRes;
//     } catch (err) {
//       console.log(err.toString());
//     }
//   }
//   getPokemonImage()
