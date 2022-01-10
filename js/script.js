//INSIDE IIFE

let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  function getAll() {
    return pokemonList;
  };

  // below function compares if the input is an object, and its object.keys, by converting this last value to a string.
  // if everything is true, then pushes the new pokemon to pokemonList

  function add(pokemon) {
    let newPokemonToString = Object.keys(pokemon).toString();

    if (typeof(pokemon) === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('Please introduce a valid object');
    }
  };

  // below function adds the pokemon to the list

  function addListItem(pokemon) {
    let pokeList = document.querySelector('ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    let pokemonNameCapital = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    button.innerText = pokemonNameCapital;
    button.classList.add('tab');
    listItem.appendChild(button);
    pokeList.appendChild(listItem);

    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  };

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      let pokemonNameCapital = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      showModal(pokemonNameCapital, pokemon.height, pokemon.imageUrl);
    });
  };

  let modalContainer = document.querySelector('#modal-container');

  function showModal(name, height, image, types) {

    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let pokemonName = document.createElement('h1');
    pokemonName.innerText = name;

    let pokemonHeight = document.createElement('h4');
    pokemonHeight.innerText = 'Height: ' + height;

    let pokemonImage = document.createElement('img');
    pokemonImage.src = image;


    modal.appendChild(pokemonImage);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonHeight);
    modal.appendChild(closeButtonElement);
    modalContainer.appendChild(modal);


    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  };

  window.addEventListener('keydown', (e) => {
    //pressing escape closes the modal
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    //pressing outside of the modal closes it
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  };

  function loadDetails(item) {
    let url = item.detailsUrl;

    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });
  };

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };

})();

//OUTISDE IIFE

// below for loop to show each pokemon in pokemonList in a UL/IL



pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});