const express = require("express");
const router = express.Router();
const pokedex = require("pokedex-promise-v2");
const p = new pokedex();
const fs = require("fs");

router.get("/query", async (req, res) => {
  const pokemonName = req.query.query;
  const pokemon = await constructPokemon(pokemonName);
  res.send(pokemon);
});

router.get("/get/:id", async (req, res) => {
  const pokemonId = req.params.id;
  const pokemon = await constructPokemon(pokemonId);
  res.send(pokemon);
});

router.put("/catch/:id", async (req, res) => {
  const pokemonId = req.params.id;
  const requestUsername = req.headers.username;
  let fileExists = true;
  try {
    fs.readFileSync(`./users/${requestUsername}/${pokemonId}.json`);
  } catch (error) {
    fileExists = false;
    const matchingPokemon = JSON.stringify(await constructPokemon(pokemonId));
    fs.writeFileSync(
      `./users/${requestUsername}/${pokemonId}.json`,
      `${matchingPokemon}`
    );
    res.send("pokemon caught");
  }
  if (fileExists) {
    throw new Error("403 catch");
  }
});

router.delete("/release/:id", (req, res) => {
  const requestUsername = req.headers.username;
  const pokemonId = req.params.id;
  try {
    fs.readFileSync(`./users/${requestUsername}/${pokemonId}.json`);
    fs.unlinkSync(`./users/${requestUsername}/${pokemonId}.json`);
    res.send("pokemon released");
  } catch (error) {
    throw new Error("403 release");
  }
});

router.get("/", (req, res) => {
  const requestUsername = req.headers.username;
  const userPokemonList = fs.readdirSync(`./users/${requestUsername}`);
  const pokemonInfoList = [];
  for (let pokemon of userPokemonList) {
    const pokemonInfo = fs.readFileSync(
      `./users/${requestUsername}/${pokemon}`
    );
    pokemonInfoList.push(JSON.parse(pokemonInfo.toString()));
  }
  res.send(pokemonInfoList);
});

/**
 * Returns selected attributes of a pokemon
 * @param {string} identifier - id or name of pokemon.
 * @returns {Object}
 */
async function constructPokemon(identifier) {
  const pokemonData = await p.getPokemonByName(identifier);
  const pokemon = {
    name: pokemonData.name,
    height: pokemonData.height,
    weight: pokemonData.weight,
    types: types(pokemonData),
    front_pic: pokemonData.sprites.front_default,
    back_pic: pokemonData.sprites.back_default,
    abilities: abilities(pokemonData),
  };
  return pokemon;
}

/**
 * Returns the abilities of a pokemon
 * @param {Object} pokemonData
 * @returns {Array} - Contains pokemon's ability names
 */
function abilities(pokemonData) {
  const pokemonAbilities = [];
  for (let ability of pokemonData.abilities) {
    pokemonAbilities.push(ability.ability.name);
  }
  return pokemonAbilities;
}

/**
 * Returns the types of a pokemon
 * @param {Object} pokemonData
 * @returns {Array} - Contains pokemon's type names
 */
function types(pokemonData) {
  const pokemonTypes = [];
  for (let type of pokemonData.types) {
    pokemonTypes.push(type.type.name);
  }
  return pokemonTypes;
}

module.exports = router;
