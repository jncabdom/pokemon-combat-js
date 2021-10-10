
let player1 = {
  domData: {
    sprite: document.querySelector(".field-side.top .poke-sprite"),
    hpbar: document.querySelector(".field-side.top .poke-healthbar"),
    name: document.querySelector(".field-side.top .poke-name"),
    lvl: document.querySelector(".field-side.top .poke-lvl")
  },
  pokeHealth: 1,
  pokeName: "Ditto",
  pokeDef: 1,
  pokeAtk: 1,
  pokeLvl: 99
}

let playerCpu = {
  domData: {
    sprite: document.querySelector(".field-side.bottom .poke-sprite"),
    hpbar: document.querySelector(".field-side.bottom .poke-healthbar"),
    name: document.querySelector(".field-side.bottom .poke-name"),
    lvl: document.querySelector(".field-side.bottom .poke-lvl")
  },
  pokeHealth: 1,
  pokeName: "Ditto",
  pokeDef: 1,
  pokeAtk: 1,
  pokeLvl: 99
}

// Getting pokémon data from PokéAPI and storing it into allPokemonData[]

let pokemonListRange = [1, 151];
let allPokemonData = [...Array(152).keys()].slice(1);

/**
 * @description Gets all pokémon data from PokeAPI, storing it into
 *              allPokemonData[].
 */
const getPokemonData = async () => {
  allPokemonData = await Promise.all(
    allPokemonData.map(async (index) =>
      await getSinglePoke(index, allPokemonData)));
  beginGame();
}

/**
 * @description fetchs a single pokémon data from PokéAPI, returns it
 * @param {number} id the pokémon whose data we want to get from PokéAPI
 * @returns {object} extracted from the returning promise
 */
const getSinglePoke = (id) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then((pokemon) => pokemon);
}

/**
 * @description Calculates and returns a random number between
 *              min and max.
 * @param {number} min 
 * @param {number} max 
 * @returns {number} Resulting random number.
 */
const getRandomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * @description Updates all data for a trainer in the DOM.
 * @param {object} player 
 */
const updateAllData = (player) => {
  updateName(player);
  updateLvl(player);
}

/**
 * @description Updates pokémon's name in the DOM.
 * @param {object} player 
 */
const updateName = (player) => {
  player.domData.name.innerHTML = player.pokeName;
}

/**
 * @description Updates pokémon's level in the DOM.
 * @param {object} player 
 */
const updateLvl = (player) => {
  player.domData.lvl.innerHTML = "Lv. " + player.pokeLvl;
}

/**
 * @description Updates pokémon's health in the DOM.
 * @param {object} player 
 */
const updateHealth = (player) => {
  // Todo. Healthbar implementation still undone
}

// Rudimentary game start. 
//Probably will put into a beginGame() function.
getPokemonData();
updateAllData(player1);
updateAllData(playerCpu);
