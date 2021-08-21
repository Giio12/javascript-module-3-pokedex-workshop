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
const divAlertContainer= document.createElement('div')
divAlertContainer.className = "alert-container"
divContainer.appendChild(divAlertContainer)

const renderPokemonCard = res => {
    const cardElement = document.createElement('div')
    const cardFragmentHtml = '<div class="card"><img  class="card-img-top" src="" alt=""> <div class="card-body"> <p class="card-text"></p> </div>  </div>'
    cardElement.innerHTML = cardFragmentHtml;
    console.log(res)
    divRow.appendChild(cardElement);
    document.querySelector('.card-text').innerHTML = res.name;

    document.querySelector(".card-img-top").src = res.sprites.front_default;
}

const clearContent = () => {
    document.querySelector(".card-container").innerHTML = "";
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
        // renderAlert(`something went wrong with your serch: ${search}`)
    }
}
window.onload = () => {
    document.querySelector('#search-button').addEventListener("click",

        () => {
            const formControl = document.querySelector('.form-control').value;
            getSinglePokemon(formControl);
        })
}