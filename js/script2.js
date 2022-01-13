//INSIDE IIFE

let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";

  function getAll() {
    return pokemonList;
  }

  // below function compares if the input is an object, and its object.keys, by converting this last value to a string.
  // if everything is true, then pushes the new pokemon to pokemonList

  function add(pokemon) {
    // let newPokemonToString = Object.keys(pokemon).toString();
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("Please introduce a valid object");
    }
  }

  // below function adds the pokemon to the list

  function addListItem(pokemon) {
    loadDetails(pokemon).then(function() {
      let pokeList = document.querySelector(".pokemon-list");
      let listItem = document.createElement("li");
      let button = document.createElement("button");
      let pokemonImage = document.createElement("img");
      pokemonImage.setAttribute("alt", "A pokemon picture");
      pokemonImage.classList.add("pokemon-image");
      pokemonImage.src = pokemon.imageUrl;

      let pokemonNameCapital =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

      button.innerText = pokemonNameCapital;
      button.classList.add("tab", "btn", "btn-seconday");
      listItem.classList.add("group-list-item");
      listItem.appendChild(button);
      button.appendChild(pokemonImage);
      pokeList.appendChild(listItem);

      button.addEventListener("click", function() {
        showDetails(pokemon);
      });
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      let pokemonNameCapital =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      let firstType = pokemon.types[0].type.name;
      showModal(pokemon, firstType);
    });
  }

  let modalContainer = document.querySelector(".modal-content");

  function showModal(pokemon, firstType) {
    let pokemonNameCapital =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + pokemonNameCapital + "</h1>");
    let imageElementFront = $(
      '<img class="modal-img" alt="A pokemon picture" style="width:50%">'
    );
    imageElementFront.attr("src", pokemon.imageUrl);
    let heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");
    let pokemonType = document.createElement("img");
    pokemonType.classList.add("type-image");
    pokemonType.src = "./images/" + firstType + ".png";

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(heightElement);
    modalBody.append(pokemonType);

    $("#exampleModalCenter").modal();
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;

    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function(e) {
        console.error(e);
      });
  }

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
