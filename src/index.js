
let player1 = {
  domData: {
    sprite: document.querySelector(".field-side.top .poke-sprite"),
    hpbar: document.querySelector(".field-side.top .poke-healthbar"),
    lvl: document.querySelector(".field-side.top .poke-healthbar")
  },
  pokeHealth: 1,
  pokeName: 1,
  pokeDef: 1,
  pokeAtk: 1
}

let playerCpu = {
  domData: {
    sprite: document.querySelector(".field-side.bottom .poke-sprite"),
    hpbar: document.querySelector(".field-side.bottom .poke-healthbar"),
    lvl: document.querySelector(".field-side.bottom .poke-healthbar")
  },
  pokeHealth: 1,
  pokeName: 1,
  pokeDef: 1,
  pokeAtk: 1
}

let pokemonListRange = [1, 151];
let allPokemonData = [...Array(152).keys()].slice(1);

const getPokemonData = async () => {
  allPokemonData = await Promise.all(
    allPokemonData.map(async (index) => {
      return await getSinglePoke(index, allPokemonData)
    })
  );
  beginGame();
}

const getSinglePoke = (id) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then((pokemon) => pokemon);
}

const getRandomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const beginGame = () => {
  console.log(allPokemonData[0].name);
}


getPokemonData();
