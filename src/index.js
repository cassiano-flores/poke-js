export function criarTreinador(nome, idade, pokemonInicial) { 
    const treinador = {
        nome: nome,
        idade: idade,
        pokemonInicial: pokemonInicial,
        pokemons_capturados: [pokemonInicial]
    }

    return treinador
}

export function capturarPokemon(treinador, pokemon, lista) {
    
    const quantidade_pokemons = treinador.pokemons_capturados.length
    
    const treinadorAtualizado = {
        ...treinador,
        pokemons_capturados: [...treinador.pokemons_capturados, pokemon]
    }

    for (let i = 0; i < quantidade_pokemons; i++) {
        let pokemon_temp = treinadorAtualizado.pokemons_capturados[i]
        
        pokemon_temp.levelInicial++

        if ((pokemon_temp.evolucao != null) && (pokemon_temp.levelInicial == pokemon_temp.evolucao.level)) {
            let id_evolucao = (pokemon_temp.evolucao.id - 1)  //-1 para obter o indice do array

            if (pokemon_temp == treinadorAtualizado.pokemonInicial) {
                treinadorAtualizado.pokemonInicial = buscaPokemon(id_evolucao, lista)
            }

            treinadorAtualizado.pokemons_capturados[i] = buscaPokemon(id_evolucao, lista)

        }
    }
    
    return treinadorAtualizado
}

function buscaPokemon(id, lista) {
    const novoPokemon = {
        ...lista[id]
    }

    return novoPokemon
}
