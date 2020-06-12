const cases = document.getElementById("case");
const title = document.getElementById("title");
const deaths = document.getElementById("deaths");
const covidURL = "https://api.covid19api.com"
let covidPATH = "/dayone/country/"
let covidSLUG = "us"

const stateSelector = document.getElementById("state-selector");
const stateForm = document.getElementById("selectState")

stateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const index = stateSelector.selectedIndex
    console.log(stateSelector.options[index].value)
})

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
