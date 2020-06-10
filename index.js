const cases = document.getElementById("case");
const title = document.getElementById("title");
const deaths = document.getElementById("deaths");
const covidURL = "https://api.covid19api.com"
let covidPATH = "/dayone/country/"
let covidSLUG = "us"


let states = {};

fetchData = () => {
    console.log("FETCH!")
    fetch(`${covidURL}${covidPATH}${covidSLUG}`)
        .then(resp => resp.json())
        .then(json => {
            sortFetch(json);
            deaths.innerText = `${states[""][""][states[""][""].length - 1 ].Deaths} - Deaths`;
            cases.innerText = `${states[""][""][states[""][""].length - 1 ].Confirmed} - Confirmed`;
            console.log("fetch complete!")
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

addEntryToStates = (entry) => {
    const { Province, City } = entry;
    states[Province][City].push(entry)
}

addCityToProvince = (entry) => {
    const { Province, City } = entry;
    states[Province][City] = [];
    states[Province][City].push(entry);
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
