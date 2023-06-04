const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input__search = document.querySelector('.input__search')

let searchPokemon = 1;

const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

const fetchPokemon = async (pokemon)=>{

  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if(APIResponse.status === 200){
    const data = await APIResponse.json()
    return data
  }
}

const renderPokemon = async (pokemon) =>{

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if(data){
    pokemonImage.style.display = 'block'
  pokemonName.innerHTML = data.name;
  pokemonNumber.innerHTML = data.id;
  pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
  input__search.value = ''
  searchPokemon = data.id
  } else{
    pokemonName.innerHTML = 'Erro :(';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none'
  }
  if(data.id >= 650){
    pokemonImage.style.display = 'none'
  }

}

form.addEventListener('submit', (event)=>{
  event.preventDefault();
  renderPokemon(input__search.value.toLowerCase());
})

btnNext.addEventListener('click' , ()=>{
  searchPokemon +=1;
  renderPokemon(searchPokemon)
})

btnPrev.addEventListener('click' , ()=>{
  if(searchPokemon>1){
  searchPokemon -=1;
  renderPokemon(searchPokemon)}
  
})


renderPokemon(searchPokemon)
