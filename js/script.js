const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const Input = document.querySelector('.input__search');
const ButtomPrev = document.querySelector('.btn-prev');
const ButtomNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) =>{

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        if (APIResponse.status == 200){
            const data = await APIResponse.json();
            console.log(data);
            return data ;
        };
    
}

const RenderPokemon = async (pokemon) => {

        pokemonName.innerHTML ='Loading...';
        pokemonNumber.innerHTML = '';
        
        const data = await fetchPokemon(pokemon);
        
        if (data){
        pokemonName.innerHTML = data['name'];
        pokemonNumber.innerHTML = data['id'];
        searchPokemon = data['id'];
        pokemonImage.src = data
        ['sprites']
        ['versions']
        ['generation-v']
        ['black-white']
        ['animated']
        ['front_default'];

        Input.value = '';
    }else{
        pokemonName.innerHTML ='Not found!';
        pokemonNumber.innerHTML = '';
        pokemonImage.src = '/images/error-404.svg';
    };
};
form.addEventListener('submit', (event) => {
    event.preventDefault();
    RenderPokemon(Input.value.toLowerCase());
});

ButtomPrev.addEventListener('click',() => {
    searchPokemon -= 1;
    RenderPokemon(searchPokemon);
});
ButtomNext.addEventListener('click',() => {
    searchPokemon += 1;
    RenderPokemon(searchPokemon);
});

RenderPokemon(searchPokemon);