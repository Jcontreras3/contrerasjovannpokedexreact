const gettingPokemon = async (pokeInput) =>{
    
    const result = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokeInput);
    const data = await result.json();
    return data;
    
}

export {gettingPokemon}