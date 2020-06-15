const cases = document.getElementById("case");
const title = document.getElementById("title");
const deaths = document.getElementById("deaths");
const covidURL = "https://api.covid19api.com"
let covidPATH = "/dayone/country/"
let covidSLUG = "us"

const main = document.getElementById("main-content");

const stateSelector = document.getElementById("state-selector");
const stateForm = document.getElementById("selectState")

const countyShow = document.getElementById("footer")
const countyContainer = document.createElement("div")
const countyForm = document.createElement("form")
const countySelect = document.createElement("select")
const countyInput = document.createElement("input")
countyContainer.id = "county-container"
countySelect.id = "county-select"
countyInput.type = "submit"
countyContainer.appendChild(countyForm)
countyForm.appendChild(countySelect)
countyForm.appendChild(countyInput)



stateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const index = stateSelector.selectedIndex
    showCountys(stateSelector.options[index].value)
})

showCountys = (state) => {  
    countySelect.innerHTML = ""
    Object.keys(states[state]).sort().map(name => {
        countySelect.appendChild(dropdownOption(name))
    })
    main.innerHTML = ""
    main.appendChild(countyContainer)
    countyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const index = countySelect.selectedIndex
        countyInfo(countySelect.options[index].value, state)
    })
}
countyInfo = (county, state) => {
    //appended to countyShow (i.e. footer)
    let countyInfo = document.createElement("div")
    countyShow.innerHTML = ""
    countyShow.appendChild(countyInfo)
    countyInfo.innerText = `${county} County, ${state}`

    displayCountyInfo(states[state][county]);
/*
iterate through array
create div for each entry

    example entry
    <div class="entry">date: 45 deaths, 4832 confirmed cases with 4433 still active</div>

    display:
        active cases
        confirmed cases
        date
        deaths
*/
}
displayCountyInfo = (county) => {
    Object.keys(county).forEach(i => {
        drawCountyInfoDiv(county[i]);
    });
}

drawCountyInfoDiv = (entry) => {
    console.log(entry)
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

/* populate a dropdown menu*/
dropdownOption = (name) => {
    let newOption = document.createElement("option")
    newOption.value = name;
    newOption.text = name;
    return newOption
}

/* sort data from fetch by state & county*/
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
