import pokemons_json from './pokemons.json'
import {capturarPokemon, criarTreinador} from '../src/index.js'

const pokemons_lista = [...pokemons_json]
let lista_pokemons

beforeEach(() => {
  lista_pokemons = pokemons_lista
})


describe('suite criação de treinador', () => {

    it('Treinador será criado com nome correto', () => {

        const treinador = criarTreinador('mario', 18, lista_pokemons[0])

        const nome_esperado = 'mario'
        const nome_obtido = treinador.nome

        expect(nome_obtido).toBe(nome_esperado)
    })

    it('Treinador será criado com a idade correta', () => {

        const treinador = criarTreinador('mario', 18, lista_pokemons[0])

        const idade_esperado = 18
        const idade_obtida = treinador.idade

        expect(idade_obtida).toBe(idade_esperado)
    })

    it('Treinador será criado com o pokemon inicial correto', () => {

        const treinador = criarTreinador('mario', 18, lista_pokemons[0])

        const pokemon_esperado = lista_pokemons[0]
        const pokemon_obtido = treinador.pokemonInicial

        expect(pokemon_obtido).toBe(pokemon_esperado)
    })

})


describe('suite captura de pokemon', () => {

    it('Deve subir o nível do pokemon corretamente', () => {

        const treinador = criarTreinador('mario', 18, lista_pokemons[0])
        const treinadorAtualizado = capturarPokemon(treinador, lista_pokemons[1])  //1 captura, 1 level ganho

        //pokemon em lista_pokemons[0] (id = 1) possui level inicial = 1
        const level_esperado = 2
        const level_obtido = treinadorAtualizado.pokemons_capturados[0].levelInicial  //quero saber o level do primeiro capturado (inicial)

        expect(level_obtido).toBe(level_esperado)
    })

    it('Treinador terá seus pokemons atualizados após nova captura', () => {
        
        const treinador = criarTreinador('mario', 18, lista_pokemons[1])
        const treinadorAtualizado = capturarPokemon(treinador, lista_pokemons[2])

        const pokemons_esperados = [lista_pokemons[1], lista_pokemons[2]]
        const pokemons_obtidos = treinadorAtualizado.pokemons_capturados

        expect(pokemons_obtidos).toStrictEqual(pokemons_esperados)
    })

})

describe('suite evolução de nível', () => {

    it('Deve evoluir pokemon ao atingir o nível necessário', () => {

        const treinador = criarTreinador('mario', 18, lista_pokemons[3])  //pokemon id 4 (levelInicial = 1) evolui em level 5

        const treinadorUP1 = capturarPokemon(treinador, lista_pokemons[5])
        const treinadorUP2 = capturarPokemon(treinadorUP1, lista_pokemons[6])
        const treinadorUP3 = capturarPokemon(treinadorUP2, lista_pokemons[7])
        const treinadorUP4 = capturarPokemon(treinadorUP3, lista_pokemons[8], lista_pokemons) //total de 4 evoluções

        const pokemon_evoluido_esperado = lista_pokemons[4]      //inicial é lista_pokemons[3]
        const pokemon_evoluido_obtido = treinadorUP4.pokemonInicial
        
        expect(pokemon_evoluido_obtido).toStrictEqual(pokemon_evoluido_esperado)
    })

    it('Não deve evoluir pokemon caso não possua o level necessário', () => {

        const treinador = criarTreinador('mario', 18, lista_pokemons[3])  //pokemon id 4 (levelInicial = 1) evolui em level 5

        const treinadorUP1 = capturarPokemon(treinador, lista_pokemons[5])
        const treinadorUP2 = capturarPokemon(treinadorUP1, lista_pokemons[6])
        const treinadorUP3 = capturarPokemon(treinadorUP2, lista_pokemons[7], lista_pokemons) //total de 3 evoluções

        const pokemon_naoEvoluido_esperado = lista_pokemons[3]      //inicial é lista_pokemons[3]
        const pokemon_naoEvoluido_obtido = treinadorUP3.pokemonInicial
        
        expect(pokemon_naoEvoluido_obtido).toStrictEqual(pokemon_naoEvoluido_esperado)
    })
})
