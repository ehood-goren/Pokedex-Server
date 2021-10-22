const express = require('express');
const router = express.Router();
const pokedex = require('pokedex-promise-v2');
const p = new pokedex;

router.get('/query', async (req, res) => {
    const pokemonName = req.query.query;
    const pokemon = await constructPokemon(pokemonName);
    res.send(pokemon);
});

router.get('/get/:id', async (req, res) => {
    const pokemonId = req.params.id;
    const pokemon = await constructPokemon(pokemonId);
    res.send(pokemon);
});

/**
 * Returns selected attributes of a pokemon
 * @param {string} identifier - id or name of pokemon.
 * @returns {Object}
 */
async function constructPokemon(identifier){
    const pokemonData = await p.getPokemonByName(identifier);
    const pokemon = {
        name: pokemonData.name,
        height: pokemonData.height,
        weight: pokemonData.weight,
        types: types(pokemonData),
        front_pic: pokemonData.sprites.front_default,
        back_pic: pokemonData.sprites.back_default,
        abilities: abilities(pokemonData),
    }
    return pokemon;
}

/**
 * Returns the abilities of a pokemon
 * @param {Object} pokemonData
 * @returns {Array} - Contains pokemon's ability names
 */
function abilities(pokemonData){
    const pokemonAbilities = [];
    for(let ability of pokemonData.abilities){
        pokemonAbilities.push(ability.ability.name);
    }
    return pokemonAbilities;
}

/**
 * Returns the types of a pokemon
 * @param {Object} pokemonData
 * @returns {Array} - Contains pokemon's type names
 */
function types(pokemonData){
    const pokemonTypes = [];
    for(let type of pokemonData.types){
        pokemonTypes.push(type.type.name);
    }
    return pokemonTypes;
}

module.exports = router;
