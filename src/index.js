let POKE_RANGE_MIN = 0;
let POKE_RANGE_MAX = 150;

const msgBoard = document.querySelector(".message-board-info");
const backgroundImg = document.querySelector(".pokeBackground");

let backgroundTypes = ["caves", "forest", "grass", "mountain", "ocean", "snow", "indoor"];

let backgroundDirectories = {
  caves: './backgrounds/Caves/Caves-',
  forest: './backgrounds/Forest/Forest-',
  grass: './backgrounds/Grass/Grass-',
  mountain: './backgrounds/Mountain/Mountain-',
  ocean: './backgrounds/Ocean/Ocean-',
  snow: './backgrounds/Snow/Snow-',
  indoor: './backgrounds/'
}

let backgroundFiles = {
  caves: ['1', '2'],
  forest: ['Afternoon', 'Day', 'Night'],
  grass: ['Afternoon', 'Day', 'Night'],
  mountain: ['Afternoon', 'Day', 'Night'],
  ocean: ['Afternoon', 'Day', 'Night'],
  snow: ['Afternoon', 'Day', 'Night'],
  indoor: ['Indoor']
}

let playercpu = {
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
  pokeLvl: 99,
  pokeSprite: "",
  isBack: true
}

let player1 = {
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
  pokeLvl: 99,
  pokeSprite: "",
  isBack: false
}

// Getting pokémon data from PokéAPI and storing it into allPokemonData[]

let pokemonListRange = [POKE_RANGE_MIN + 1, POKE_RANGE_MAX + 1];
let allPokemonData = [...Array(POKE_RANGE_MAX + 2).keys()].slice(1);

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
  updateHealth(player);
  updateSprite(player);
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

const updateSprite = (player) => {
  player.domData.sprite.src = player.pokeSprite;
}

const setPlayerPoke = (player, index) => {
  let newPoke = allPokemonData[index];
  player.pokeSprite = player.isBack ?
    newPoke.sprites.front_default :
    newPoke.sprites.back_default;
  player.pokeName = newPoke.name;
  player.pokeHealth = newPoke.stats[0].base_stat;
  player.pokeAtk = newPoke.stats[1].base_stat;
  player.pokeDef =  newPoke.stats[2].base_stat;
}

const updateMsgBoard = (player) => {
  msgBoard.innerHTML = `What should ${player.pokeName.toUpperCase()} do?`;
}

const setBackground = () => {
  let selectedBackground = backgroundTypes[getRandomNumberInRange(0, backgroundTypes.length - 1)];
  let selectedFile = getRandomNumberInRange(0, backgroundFiles[selectedBackground].length - 1);
  backgroundImg.src = backgroundDirectories[selectedBackground] +
    backgroundFiles[selectedBackground][selectedFile] + '.png';
}

// Rudimentary game start. 
//Probably will put into a beginGame() function.
const beginGame = () => {
  setBackground();
  setPlayerPoke(playercpu, getRandomNumberInRange(POKE_RANGE_MIN, POKE_RANGE_MAX));
  setPlayerPoke(player1, getRandomNumberInRange(POKE_RANGE_MIN, POKE_RANGE_MAX));
  updateAllData(playercpu);
  updateAllData(player1);
  updateMsgBoard(player1);
}

getPokemonData();
document.querySelector(".start-button").addEventListener('click', () => {
  document.querySelector(".screen-cover").style.display = "none";
  document.querySelector(".start-button").style.display = "none";
});
