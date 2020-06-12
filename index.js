const cases = document.getElementById("case");
const title = document.getElementById("title");
const deaths = document.getElementById("deaths");
const covidURL = "https://api.covid19api.com"
let covidPATH = "/dayone/country/"
let covidSLUG = "us"

const stateSelector = document.getElementById("state-selector");


let states = {};

fetchData = () => {
    console.log("FETCH!")
    fetch(`${covidURL}${covidPATH}${covidSLUG}`)
        .then(resp => resp.json())
        .then(json => {
            sortFetch(json);
debugger    
            deaths.innerText = `${states[""][""][states[""][""].length - 1 ].Deaths} - Deaths`;
            cases.innerText = `${states[""][""][states[""][""].length - 1 ].Confirmed} - Confirmed`;
            console.log("fetch complete!")
            Object.keys(states).map(key => {
                console.log(key, "plz add function, pass each key to appendchild for dropdown")
            })
        })
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
