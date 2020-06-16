const cases = document.getElementById("case");
const title = document.getElementById("title");
const deaths = document.getElementById("deaths");
const covidURL = "https://api.covid19api.com"
let covidPATH = "/dayone/country/"
let covidSLUG = "us"

const main = document.getElementById("main-content");

const stateSelector = document.getElementById("state-selector");
const stateForm = document.getElementById("selectState")

const countyShow = document.getElementById("footer") /* lolwut */
const countyInfoData = document.createElement('div')
const countyContainer = document.createElement("div")
const countyForm = document.createElement("form")
const countySelect = document.createElement("select")
const countyInput = document.createElement("input")
countyInfoData.className = "entry-container" // THIS NEED TO BE ERASED 
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
    let countyInfo = document.createElement("div")
    countyShow.innerHTML = ""
    countyShow.appendChild(countyInfo)
    countyInfo.innerText = `${county} County, ${state}`
    displayCountyInfo(states[state][county]);
}
displayCountyInfo = (county) => {
    countyInfoData.innerHTML = ""
    // starting from earliest date
    // Object.keys(county).forEach(i => {
    //     drawCountyEntryInfo(county[i]);
    // });

    // starting from most recent
    for (i = county.length - 1; i >= 0; i--) {
        drawCountyEntryInfo(county[i]);
    }
}
drawCountyEntryInfo = (entry) => {
    countyShow.appendChild(countyInfoData)
    newEntry = document.createElement('div');
    newEntry.className = "entry"
    newEntry.innerText = `${entry.Date} - ${entry.Confirmed} Confirmed cases.  ${entry.Deaths} Deaths.`
    countyInfoData.appendChild(newEntry)
}

let states = {};

fetchData = () => {
console.log(new Date, "FETCH!")
    fetch(`${covidURL}${covidPATH}${covidSLUG}`)
        .then(resp => resp.json())
        .then(json => {
console.log(new Date, "download complete!  sorting results.")
            sortFetch(json);
console.log(new Date, "fetch sorted!")
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
title.innerText = ""
fetchData();
