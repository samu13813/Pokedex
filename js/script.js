//INSIDE IIFE

let pokemonRepository = (function() {
  let pokemonList = [
    {name: 'Ponyta', height: 1, types: ['fire']},
    {name: 'Lugia', height: 5.2, types: ['psychic', 'flying']},
    {name: 'Rayquaza', height: 7, types: ['dragon', 'flying']}
  ];

  function getAll() {
    return pokemonList;
  }

// below function compares if the input is an object, and its object.keys, by converting this last value to a string.
// if everything is true, then pushes the new pokemon to pokemonList

  function add(pokemon) {
    let newPokemonToString = Object.keys(pokemon).toString();

    if (typeof(pokemon) === 'object' && newPokemonToString === 'name,height,types') {
      pokemonList.push(pokemon);
    } else {
      console.log('Please introduce a valid object')
    }
  }

// below function adds the pokemon to the list

  function addListItem(pokemon) {
    let pokeList = document.querySelector('ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');

    button.innerText = pokemon.name;
    button.classList.add('tab');
    listItem.appendChild(button);
    pokeList.appendChild(listItem);

    button.addEventListener('click', function(event){
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails
  };

})();

//OUTISDE IIFE

// below for loop to show each pokemon in pokemonList in a UL/IL

pokemonRepository.getAll().forEach(function(item){
  pokemonRepository.addListItem(item);
});
