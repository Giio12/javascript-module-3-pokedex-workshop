//Header logo y titulo//
const div = document.createElement('div')
div.className = "container-header"
const root = document.getElementById('root')
root.appendChild(div)
const containerHeader = document.querySelector('.container-header')
const img = document.createElement('img')
img.className = "img-logo"
containerHeader.appendChild(img)
img.src = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fih1.redbubble.net%2Fimage.46821384.7393%2Fsticker%2C375x360.png&f=1&nofb=1"
const h1 = document.createElement('h1')
h1.innerText = "Pokédex"
containerHeader.appendChild(h1)

//BUSCADOR//
const divContainer = document.createElement('div')
divContainer.className = "container"
root.appendChild(divContainer)
const divRow = document.createElement('div')
divRow.className = "row mt-5"
divContainer.appendChild(divRow)
const divCol9 = document.createElement('div')
divCol9.className = "col-9"
divRow.appendChild(divCol9)
const input = document.createElement("input");
input.className = "form-control"
input.setAttribute("type", "text", );
input.setAttribute("placeholder", "Search your Pokemón", );
divCol9.appendChild(input)
const divCol3 = document.createElement('div')
divCol3.className = "col-3"
divRow.appendChild(divCol3)
const buttonSearch = document.createElement("button");
buttonSearch.id = "search-button"
buttonSearch.setAttribute("type", "button", );
buttonSearch.className = "btn btn-primary"
buttonSearch.innerText = "Search"
divCol3.appendChild(buttonSearch)
const divContainerCard = document.createElement('div')
divContainerCard.className = "card-container"
divContainer.appendChild(divContainerCard)
const divAlertContainer = document.createElement('div')
divAlertContainer.className = "alert-container"
divContainer.appendChild(divAlertContainer)
//*** BOTON PARA MOSTRAR TODOS LOS POKEMONES */
const divAllPokemons= document.createElement('div')
divAllPokemons.className="mt-3"
divContainer.appendChild(divAllPokemons)
divAllPokemons.innerHTML='<button id= "fetch-all" type= "button" class= "btn btn-primary col-12" > Fetch them all Pokemons</button>'
//*** UL ******/
const ulAllPokemons=document.createElement('ul')
ulAllPokemons.className="list-group"
divContainer.appendChild(ulAllPokemons)

const renderPokemonCard = res => {
    const cardFragmentHtml = `<div class="card ${res.types[0].type.name}"> <h5 class="card-title"></h5><img  class="card-img-top" src="" alt=""> <div class="card-body"> <p class="card-text"></p> </div>  </div>`
    divContainerCard.innerHTML = cardFragmentHtml;
    document.querySelector('.card-text').innerHTML = capitalizarPrimeraLetra(res.name);
    document.querySelector(".card-img-top").src = res.sprites.front_default;
    if (res.id < 10) {
        document.querySelector(".card-title").innerHTML = `#00${res.id}`;
    } else if (res.id < 100) {
        document.querySelector(".card-title").innerHTML = `#0${res.id}`;
    } else {
        document.querySelector(".card-title").innerHTML = `#${res.id}`;
    }
}
    

function capitalizarPrimeraLetra(nameUpperCase) {
  return nameUpperCase.charAt(0).toUpperCase() + nameUpperCase.slice(1);
}


const clearContent = () => {
    document.querySelector(".card-container").innerHTML = "";
    document.querySelector(".alert-container").innerHTML = "";
}
const renderAlert = (alertText) => {
    const alertElement = document.createElement('div')
    const alertFragmentHtml = '<div class="alert alert-danger" role="alert"></div>'
    alertElement.innerHTML = alertFragmentHtml
    divAlertContainer.appendChild(alertElement)
    document.querySelector(".alert").innerHTML = alertText

}

const getSinglePokemon = async search => {
    try {

        const url = `https://pokeapi.co/api/v2/pokemon/${search}`
        const response = await fetch(url);
        const parsedRes = await response.json();
        clearContent();
        renderPokemonCard(parsedRes);
    } catch (error) {
        console.log(error)
        clearContent();
        renderAlert(`something went wrong with your serch: ${search}`)
    }
}
const renderAllPokemons=(res)=>{
    res.results.forEach((pokemon, i) => {
        let liAllPokemons=document.createElement('li');
        liAllPokemons.classList.add(`pokemon-${i+1}`, "list-group-item")
        document.querySelector(".list-group").appendChild(liAllPokemons)
        liAllPokemons.innerHTML=(`<button class="btn btn-link"> ${pokemon.name}</button>`)
    });
}

const renderPagination = (count) => {

}

const getAllPokemons = async (page) => {
    try {
        const url = "https://pokeapi.co/api/v2/pokemon/"
        const response = await fetch(url);
        const parsedRes = await response.json();
        clearContent();
        renderAllPokemons(parsedRes);
        renderPagination(parsedRes.count)
    } catch (error){
        console.log(error)
        clearContent();
        renderAlert("Something went wrong")
    }
}
window.onload = () => {
    document.getElementById('search-button').addEventListener("click", () => {
        const formControl = document.querySelector('.form-control').value;
        formControl && getSinglePokemon(formControl);
    })
    document.getElementById('fetch-all').addEventListener("click", getAllPokemons)
}