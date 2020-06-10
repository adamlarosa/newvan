const cases = document.getElementById("case");
const title = document.getElementById("title");
const covidURL = "https://api.covid19api.com"
let covidPATH = "/dayone/country/"
let covidSLUG = "us"
let data;

let states = {};

fetchData = () => {
    console.log("FETCH!")
    fetch(`${covidURL}${covidPATH}${covidSLUG}`)
        .then(resp => resp.json())
        .then(json => {
            data = json;
            console.log("fetch complete!")
            sortFetch(data)
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
    console.log("Sort complete!")
}


loadData = async () => {
    await fetchData();
    await sortFetch(data)
}

loadData();