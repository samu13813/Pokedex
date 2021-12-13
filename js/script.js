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

  return {
    getAll: getAll,
    add: add
  };

})();

// for loop that displays names / heights of each pokemon in the above list
// and checks if the height is larger than 6, and if it is, displays a text

pokemonRepository.getAll().forEach(function(item){
  let pokeList = document.querySelector('ul');
  let listItem = document.createElement('li');
  let button = document.createElement('button');

  button.innerText = item.name;
  button.classList.add('tab');
  listItem.appendChild(button);
  pokeList.appendChild(listItem);


});
