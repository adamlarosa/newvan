const cases = document.getElementById("case");
const title = document.getElementById("title");
const covidURL = "https://api.covid19api.com"
let covidPATH = "/dayone/country/"
let covidSLUG = "us"
let data;

let states = {};

provinceInStates = (entry) => {
    return Object.keys(states).includes(entry.Province)
}

console.log("FETCH!!")
fetch(`${covidURL}${covidPATH}${covidSLUG}`)
    .then(resp => resp.json())
    .then(json => {
        data = json;
        console.log("complete!")
    })

