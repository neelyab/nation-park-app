const apiKey='KsdmglUq6nA2Nc9PYzZp10DRsee3R5DuSBWJkgKi'
const baseUrl='https://developer.nps.gov/api/v1/parks?'

/* event listener for form submit. Stores search query in variables and passes 
them into the getNationalParks function */
function formListener() {
$('form').submit(event=> { event.preventDefault();
const searchTerm = $('#park').val();
const usState = $('#state').val();
const maxResults=$('#js-max-results').val();
console.log(maxResults)
getNationalParks(searchTerm, usState, maxResults);
});
}

/* formats the search query items to be used in http request */
function formatQuery(options){
const queryItems = Object.keys(options).map(key=> `${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`)
return queryItems.join('&');
}


/* creates and fetches results with url of search query */
function getNationalParks(query, usState, maxResults) {
const options= {       
    q: query,
    stateCode: usState,
    limit: maxResults,
    api_key: apiKey

    }

    const queryString= formatQuery(options);
    const url= baseUrl + queryString; 

    fetch(url)
        .then(response => {
        if(response.ok) {
            return response.json();
        } throw new Error(response.statusText);
    }) 
    .then (responseJson=> displayResults(responseJson))
    .catch(err=> { $('section').text(`something went wrong. ${err.message}`);
});
}

/* displays results of search to the page */
function displayResults(responseJson) {
    $('.js-results').empty();
 console.log(responseJson);
 if (responseJson.total === "0") {
     $('.js-results').append(`<p>Sorry, no results were returned that matched your search.</p>`);
 } else {
 for (let i =0; i<responseJson.data.length; i++) {
     $('.js-results').append(`<li><h2>${responseJson.data[i].name}</h2></li>`);
     $('.js-results').append(`<li>${responseJson.data[i].description}</li>`);
     $('.js-results').append(`<li><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></li>`);
     };

        }
    }
/*
function createAddress(latLong) {
    let coordinates = latLong.split(",");
    let lat = coordinates[0].slice(4, coordinates[0].length);
    let long = coordinates[1].slice(6, coordinates[1].length)
    console.log(lat);
    console.log(long); 
}
*/
$(formListener);