// Create an array to hold the city search history.
let searchHistory = [];

// Call the loadSearch function to get the item from the local storage.
loadSearch();

// After the button submit click run the functions and method inside it.
$(".btn").on("click", function() {

    // Create new variable to hold the city input value from the user.
    let location = $("#searchLocation").val();

    // Call getBeerInfo and getHotelInfo functions.
    getBeerInfo(location);
    getHotelInfo(location);

    // Empty the search bar value.
    $("#searchLocation").val("");
    
    // Push the city input from the user to the searchHistory array.
    searchHistory.push(location);

    // Set search history city to the localstorage
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    
    // Call the saveSearch function
    saveSearch();
    
});

// Get beer information function that will retrieve data from the Open Brewery DB API.
// The information will be the brewery name, type, phone number, and address.
function getBeerInfo(location) {

    // Empty the beer results everytime this function run
    $("#beerResults").empty();

    // Open Brewery DB API url 
    let beerURL = "https://api.openbrewerydb.org/breweries?by_city=" + location;

    // ajax call to get the data from the API and if the url work or able to get data from the url
    // then run the methods inside it 
    $.ajax({
        url: beerURL,
        method: "GET",
    }).then(function(response) {
        console.log(response);

        // Create an array for the breweries.
        let breweries = [];

        // Looping through the data in the API, retrieve them, and display them.
        for (let i=0; i < response.length; i++) {

            // Push the each of the brewery name to the breweries array.
            let getBreweryName = response[i].name;
            breweries.push(getBreweryName);
            console.log(breweries);

            // Create element for the card.
            let breweryCol = $("<div>");
            breweryCol.addClass("col s12 m12");
            let breweryCard = $("<div>");
            breweryCard.addClass("card horizontal");
            let breweryCardStaked = $("<div>");
            breweryCardStaked.addClass("card-staked");
            let breweryCardContent = $("<div>");
            breweryCardContent.addClass("card-content");

            // Clickable brewery name element that will be send to its website.
            let breweryNameEl = $("<a>");
            breweryNameEl.attr("href", response[i].website_url);
            breweryNameEl.attr("target", "_blank");
            breweryNameEl.text(response[i].name);

            // Brewery type element.
            let breweryTypeEl = $("<p>");
            breweryTypeEl.text("Brewery type: " + response[i].brewery_type);

            // Phone number element.
            let breweryPhoneNumEl = $("<p>");
            breweryPhoneNumEl.text("Phone number: " + response[i].phone);

            // Address element.
            let breweryAddressEl = $("<p>");
            breweryAddressEl.text("Address: " + response[i].street + " " + response[i].city + ", " + response[i].state + " " + response[i].postal_code);

            // Append the elements to each appropriate place.
            breweryCardContent.append(breweryNameEl);
            breweryCardStaked.append(breweryCardContent);
            breweryCard.append(breweryNameEl, breweryAddressEl, breweryTypeEl, breweryPhoneNumEl);
            breweryCol.append(breweryCard);

            // Append the card to the beer results.
            $("#beerResults").append(breweryCol);
        };
    })
}

// Get hotel information function that will retrieve data from TripAdvisor API.
// The data needed for the hotel information are image, hotel name, address, rating , and price range. 
function getHotelInfo(city) {

    // Empty the hotel results 
    $("#hotelResults").empty();

    // 
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tripadvisor-com.p.rapidapi.com/hotel/search?location=" + city + "=1&offset=0&language=en&currency=USD",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "744f173752msh69b742401cf6e6fp12dedajsn88a8274b3afb",
            "x-rapidapi-host": "tripadvisor-com.p.rapidapi.com"
        }
    };
    
    // ajax call to run the settings and if it work run the methods inside it.
    $.ajax(settings).done(function (response) {
        console.log(response);

        // Create getHotel variable to hold the first response.data which is an array of the hotel information
        let getHotel = response.data;

        // Create hotel list array
        let hotelList= [];

        // Looping through the hotel data array from the API
        for (let i=0; i < getHotel.length ; i++) {
            
            // Get the hotel name and push it to the hotel list array
            let getHotelName = response.data[i].name;
            hotelList.push(getHotelName);

            // Create elements for the card
            let hotelCol = $("<div>");
            hotelCol.addClass("col s12 m12");
            let hotelCard = $("<div>");
            hotelCard.addClass("card horizontal");

            // Create element to add the card image
            let hotelCardImg = $("<div>");
            hotelCardImg.addClass("card-image");
            let hotelImgEl = $("<img>");
            hotelImgEl.attr("src", response.data[i].photo.images.small.url);
            
            // Append hotel image to the card
            hotelCardImg.append(hotelImgEl);

            // Create elements for the card
            let hotelCardStaked = $("<div>");
            hotelCardStaked.addClass("card-staked");
            let hotelCardContent = $("<div>");
            hotelCardContent.addClass("card-content");

            // Create clickable hotel name element
            let hotelNameEl = $("<a>");
            hotelNameEl.attr("href", response.data[i].website);
            hotelNameEl.attr("target", "_blank");
            hotelNameEl.text(hotelList[i]);

            // Create element and get hotel rating.
            let hotelRatingEl = $("<p>");
            hotelRatingEl.addClass("hotelRating");
            hotelRatingEl.text("Rating: " + response.data[i].rating + "/5");
            
            // Create element and get price range.
            let hotelPriceEl = $("<p>");
            hotelPriceEl.text("Price range: " + response.data[i].price);

            // Create element and get hotel address
            let hotelAddressEl = $("<p>");
            hotelAddressEl.text("Address: " + response.data[i].address);

            // Append the hotel information to the card
            hotelCardContent.append(hotelNameEl);
            hotelCardStaked.append(hotelCardContent);
            hotelCard.append(hotelCardImg, hotelCardStaked, hotelAddressEl, hotelRatingEl, hotelPriceEl);
            hotelCol.append(hotelCard);

            // Append the hotel information card to the hotel results
            $("#hotelResults").append(hotelCol);
        };
    });
};

// Save search function 
function saveSearch() {

    // Empty the search history
    $("#search-history").empty();

    // Looping searchHistory array and create the clickable list of the city search history 
    for (let i=0;( i < searchHistory.length && i<5); i++) {
        let history = $("<li>");
        history.text(searchHistory[i]);
        history.attr("class", "usercity");
        $("#search-history").append(history);
    };

    // onclick for user city needs to be here due to scoping issues
    // get hotel info and beer info when the last user city search click
    $(".usercity").on("click", function() {
        getHotelInfo($(this).text());
        getBeerInfo($(this).text());
    });
    
};

//function to load local storage
function loadSearch() {
    let storedHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (storedHistory !== null) {
        searchHistory = storedHistory
    }
    saveSearch();
};



