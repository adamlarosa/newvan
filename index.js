const cases = document.getElementById("case");
const title = document.getElementById("title");
const deaths = document.getElementById("deaths");
const covidURL = "https://api.covid19api.com"
let covidPATH = "/dayone/country/"
let covidSLUG = "us"

const main = document.getElementById("main-content");

const stateSelector = document.getElementById("state-selector");
const stateForm = document.getElementById("selectState")

let countyContainer = document.createElement("div")
let countyForm = document.createElement("form")
let countySelect = document.createElement("select")
let countyInput = document.createElement("input")


stateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const index = stateSelector.selectedIndex
    showCounty(stateSelector.options[index].value)
})

showCounty = (state) => {  
    countyContainer.id = "county-container"
    countySelect.id = "county-select"
    countyInput.type = "submit"

    countyContainer.appendChild(countyForm)
    countyForm.appendChild(countySelect)
    countyForm.appendChild(countyInput)

    Object.keys(states[state]).sort().map(name => {
        countySelect.appendChild(dropdownOption(name))
    })
    main.innerHTML = ""
    main.appendChild(countyContainer)
    countyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const index = countySelect.selectedIndex
        countyInfo(countySelect.options[index].value)
    })
}

countyInfo = (county) => {
    console.log(county)
}

let states = {};

fetchData = () => {
    console.log("FETCH!")
    fetch(`${covidURL}${covidPATH}${covidSLUG}`)
        .then(resp => resp.json())
        .then(json => {
            sortFetch(json);
            deaths.innerText = `${states[""][""][states[""][""].length - 1 ].Deaths} - Deaths`;
            cases.innerText = `${states[""][""][states[""][""].length - 1 ].Confirmed} - Confirmed`;
            Object.keys(states).sort().map(name => {
                stateSelector.appendChild(dropdownOption(name));
            })
            main.innerText = "Select a state from the right."
        })
}

dropdownOption = (name) => {
    let newOption = document.createElement("option")
    newOption.value = name;
    newOption.text = name;
    return newOption
}

provinceInStates = (entry) => {
    return Object.keys(states).includes(entry.Province)
}
cityInProvince = (entry) => {
    return Object.keys(states[entry["Province"]]).includes(entry.City)
}
addProvinceToStates = (entry) => {
    const { Province, City } = entry;
    states[Province] = {};
    states[Province][City] = [];
    states[Province][City].push(entry);
}
addCityToProvince = (entry) => {
    const { Province, City } = entry;
    states[Province][City] = [];
    states[Province][City].push(entry);
}
addEntryToStates = (entry) => {
    const { Province, City } = entry;
    states[Province][City].push(entry)
}
sortFetch = (data) => {
    for (const index in data) {
    let entry = data[index];
        if (provinceInStates(entry)) {
            if (cityInProvince(entry)) {
                addEntryToStates(entry);
            } else {
                addCityToProvince(entry)
            }
        } else {
            addProvinceToStates(entry);
        }
    }
}


title.innerText = "COVID-19"
fetchData();
