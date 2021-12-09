let pokemonRepository = (function() {
  let pokemonList = [
    {name: 'Ponyta', height: 1, types: ['fire']},
    {name: 'Lugia', height: 5.2, types: ['psychic', 'flying']},
    {name: 'Rayquaza', height: 7, types: ['dragon', 'flying']}
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add
  };

})();

// for loop that displays names / heights of each pokemon in the above list
// and checks if the height is larger than 6, and if it is, displays a text

pokemonRepository.getAll().forEach(function(item){
  if (item.height >= 6){
    document.write('<p>' + item.name + ' (height: ' + item.height +  ') - Wow, that\'s big!</p>');
  } else {
    document.write('<p>' + item.name + ' (height: ' + item.height +  ')</p>');
  }
});
