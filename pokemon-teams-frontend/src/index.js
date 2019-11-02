const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", ()=>{
    const main = document.getElementsByTagName("main")[0]
    fetchThemAll()

    main.addEventListener("click", clickHandler)

    function clickHandler(e) {
        e.stopPropagation()
        // console.log(e.target.dataset.pokeid)
        if (e.target.dataset.id && e.target.parentNode.getElementsByTagName("ul")[0].getElementsByTagName("li").length < 6) {
            let trainer_id = {trainer_id: e.target.dataset.id}
            let button_id = e.target.parentNode.getElementsByTagName("button")[0].dataset.id
            fetchNewPokemon(trainer_id, button_id)
        }else if (e.target.dataset.pokeid) {
            fetchDeletePokemon(e.target.dataset.pokeid)
            e.target.parentElement.remove()
        }
    }
    

    function fetchThemAll(){
        fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(json => json.forEach(renderThemAll))
    }

    function renderThemAll(trainerPokemons) {
        // console.log(trainerPokemons)

        let card_div = document.createElement("div")
        card_div.className = "card"
        
        let pTag = document.createElement("p")
        pTag.innerText = `${trainerPokemons.name}`

        let button = document.createElement("button")
        button.dataset.id = `${trainerPokemons.id}`
        button.innerText = "Add Pokemon"

        let ul = document.createElement("ul")

        card_div.appendChild(pTag)
        card_div.appendChild(button)

        trainerPokemons.pokemons.forEach(function(pokemon) {
            let li = document.createElement("li")
            li.innerHTML = `${pokemon.nickname}(${pokemon.species})`
        
            let releaseButton = document.createElement("button")
            releaseButton.dataset.pokeid = `${pokemon.id}`
            releaseButton.className = "release"
            releaseButton.innerText = "Release"
            
            li.appendChild(releaseButton)
            ul.appendChild(li)
        })
        
        card_div.appendChild(ul)
        main.appendChild(card_div)
    }

    function fetchNewPokemon(id, button_id){
        fetch(POKEMONS_URL, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify(id)
        })
        .then(resp => resp.json())
        .then(json => renderNew(json, button_id))
    }

    function renderNew(pokemon, button_id) {
        let new_li = document.createElement("li")
        let ul = document.querySelector(`button[data-id="${button_id}"]`).parentNode.getElementsByTagName("ul")[0]
        new_li.innerHTML = `${pokemon.nickname}(${pokemon.species})`
        
        let releaseButton = document.createElement("button")
        releaseButton.dataset.pokeid = `${pokemon.id}`
        releaseButton.className = "release"
        releaseButton.innerText = "Release"
        
        new_li.appendChild(releaseButton)
        ul.appendChild(new_li)
    }

    function fetchDeletePokemon(id){
        fetch(`${POKEMONS_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify({id : id})
        })
    }



})






// pokemon DELETE /pokemons/:id(.:format)