const pokemonList = document.getElementById("pokemon-list");
let pokemonData = [];

async function fetchPokemons() {
  for (let i = 1; i <= 100; i++) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let data = await response.json();
    pokemonData.push(data);
  }
  renderPokemon(pokemonData);
}

function renderPokemon(data) {
  pokemonList.innerHTML = "";
  data.forEach((data) => {
    let pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");
    pokemonCard.setAttribute("data-name", data.name);
    pokemonCard.setAttribute("data-weight", data.weight);
    pokemonCard.innerHTML = `
                    <span class="badge">${data.id}</span>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)
      }</h3>
                    <div class="type">${data.types
        .map((t) => t.type.name)
        .join(", ")}</div>
                    <p class="info">Weight: ${data.weight / 10} kg</p>
                `;
    pokemonList.appendChild(pokemonCard);
  });
}

function searchPokemon() {
  let input = document.getElementById("search").value.toLowerCase();
  let cards = document.querySelectorAll(".pokemon-card");

  cards.forEach((card) => {
    let name = card.getAttribute("data-name").toLowerCase();
    if (name.includes(input)) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}



fetchPokemons();


function sortByAlphabet() {
  const sorted = [...pokemonData].sort((a, b) => a.name.localeCompare(b.name));
  renderPokemon(sorted);
}

function sortByAlphabetReverse() {
  const sorted = [...pokemonData].sort((a, b) => b.name.localeCompare(a.name));
  renderPokemon(sorted);
}
