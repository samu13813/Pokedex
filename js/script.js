let pokemonList = [
  {name: 'Ponyta', height: 1, types: ['fire']},
  {name: 'Lugia', height: 5.2, types: ['psychic', 'flying']},
  {name: 'Rayquaza', height: 7, types: ['dragon', 'flying']}
];

for (let i=0; i<pokemonList.length; i++){
  document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height +  ')</p>');
}
