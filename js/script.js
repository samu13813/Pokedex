let pokemonList = [
  {name: 'Ponyta', height: 1, types: ['fire']},
  {name: 'Lugia', height: 5.2, types: ['psychic', 'flying']},
  {name: 'Rayquaza', height: 7, types: ['dragon', 'flying']}
];

// for loop that displays names / heights of each pokemon in the above list
//and checks if the height is larger than 6, and if it is, displays a text

for (let i=0; i<pokemonList.length; i++){
  if (pokemonList[i].height >= 6){
    document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height +  ') - Wow, that\'s big!</p>');
  } else {
    document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height +  ')</p>');
  }
}
