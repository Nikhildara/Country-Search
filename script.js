let searchInput = document.getElementById("searchInput");
let resultContainer = document.getElementById("resultCountries");
let spinnerEl = document.getElementById("spinner");

let searchValue = "";
let classList = []

function createAndAppendcard(one) {
    resultContainer.classList.add("p-3");
    let countryCard = document.createElement("div");
    countryCard.classList.add("d-flex", "flex-row", "col-12", "col-md-5");
    countryCard.classList.add("country-card", "m-md-3");
    let {
        flag,
        name,
        population
    } = one;
    resultContainer.appendChild(countryCard);
    let image = document.createElement("img");
    image.src = flag;
    image.classList.add("country-flag");
    countryCard.appendChild(image);
    let nameContainer = document.createElement("div");
    nameContainer.classList.add("ml-3");
    countryCard.appendChild(nameContainer);
    let countryName = document.createElement("h1");
    countryName.textContent = name;
    countryName.classList.add("country-name");
    nameContainer.appendChild(countryName);
    let countryPopu = document.createElement("p");
    countryPopu.textContent = population;
    countryPopu.classList.add("country-population");
    nameContainer.appendChild(countryPopu);
}


function displayCards(country) {
    for (let one of country) {
        createAndAppendcard(one);
    }
}

function getCountries() {
    spinnerEl.classList.toggle("d-none");
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    }
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(JSONdata) {
            spinnerEl.classList.toggle("d-none");
            displayCards(JSONdata);
        })
}

function displayCards1(countrylist) {
    spinnerEl.classList.toggle("d-none");
    resultContainer.textContent = ""
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    }
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(JSONdata) {
            spinnerEl.classList.toggle("d-none");
            classList = JSONdata;
        })

    for (let country of classList) {
        let countryNam = country.name;
        if (countryNam.includes(searchValue)) {
            createAndAppendcard(country)
        }
    }
}

function onchangeSearchInput(event) {
    searchValue = event.target.value;
    displayCards1();


}
getCountries();
searchInput.addEventListener("keyup", onchangeSearchInput);