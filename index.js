const cases = document.getElementById("case");
cases.innerText="confirmed cases";

let data;

fetch(`https://api.covid19api.com/dayone/country/us`)
    .then(resp => resp.json())
    .then(json => {
        data = json;
        cases.innerText = data[0].Confirmed;
    });

