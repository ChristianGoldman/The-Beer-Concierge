let searchHistory = [];

loadSearch();

$(".btn").on("click", function() {
    let location = $("#searchLocation").val();

    
    getBeerInfo(location);
    getHotelInfo(location);
    $("#searchLocation").val("");
    
    
    
        searchHistory.push(location);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    
    
    saveSearch();
    

});



function getBeerInfo(location) {

    $("#beerResults").empty();

    let beerURL = "https://api.openbrewerydb.org/breweries?by_city=" + location;

    $.ajax({
        url: beerURL,
        method: "GET",
    }).then(function(response) {
        console.log(response);
        let breweries = [];
        for (let i=0; i < response.length; i++) {

            let getBreweryName = response[i].name;
            breweries.push(getBreweryName);
            console.log(breweries);
            let breweryCol = $("<div>");
                
            breweryCol.addClass("col s12 m12");
            let breweryCard = $("<div>");
            breweryCard.addClass("card horizontal");
            
            let breweryCardStaked = $("<div>");
            breweryCardStaked.addClass("card-staked");
            let breweryCardContent = $("<div>");
            breweryCardContent.addClass("card-content");
            let breweryNameEl = $("<a>");
            breweryNameEl.attr("href", response[i].website_url);
            breweryNameEl.attr("target", "_blank");
            breweryNameEl.text(response[i].name);
            let breweryTypeEl = $("<p>");
            breweryTypeEl.text("Brewery type: " + response[i].brewery_type);
            let breweryPhoneNumEl = $("<p>");
            breweryPhoneNumEl.text("Phone number: " + response[i].phone);
            let breweryAddressEl = $("<p>");
            breweryAddressEl.text("Address: " + response[i].street + " " + response[i].city + ", " + response[i].state + " " + response[i].postal_code);

            breweryCardContent.append(breweryNameEl);
            breweryCardStaked.append(breweryCardContent);
            breweryCard.append(breweryNameEl, breweryAddressEl, breweryTypeEl, breweryPhoneNumEl);
            breweryCol.append(breweryCard);

            $("#beerResults").append(breweryCol);
        };
    })
}

function getHotelInfo(city) {

    $("#hotelResults").empty();

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
    
    $.ajax(settings).done(function (response) {
        console.log(response);

        let getHotel = response.data;

        let hotelList= [];

        for (let i=0; i < getHotel.length ; i++) {
            let getHotelName = response.data[i].name;
            hotelList.push(getHotelName);
            let hotelCol = $("<div>");
            hotelCol.addClass("col s12 m12");
            let hotelCard = $("<div>");
            hotelCard.addClass("card horizontal");
            let hotelCardImg = $("<div>");
            hotelCardImg.addClass("card-image");
            let hotelImgEl = $("<img>");
            hotelImgEl.attr("src", response.data[i].photo.images.small.url);
            hotelCardImg.append(hotelImgEl);
            let hotelCardStaked = $("<div>");
            hotelCardStaked.addClass("card-staked");
            let hotelCardContent = $("<div>");
            hotelCardContent.addClass("card-content");
            let hotelNameEl = $("<a>");
            hotelNameEl.attr("href", response.data[i].website);
            hotelNameEl.attr("target", "_blank");
            hotelNameEl.text(hotelList[i]);
            let hotelRatingEl = $("<p>");
            hotelRatingEl.addClass("hotelRating");
            hotelRatingEl.text("Rating: " + response.data[i].rating + "/5");
            let hotelPriceEl = $("<p>");
            hotelPriceEl.text("Price range: " + response.data[i].price);
            let hotelAddressEl = $("<p>");
            hotelAddressEl.text("Address: " + response.data[i].address);

            hotelCardContent.append(hotelNameEl);
            hotelCardStaked.append(hotelCardContent);
            hotelCard.append(hotelCardImg, hotelCardStaked, hotelAddressEl, hotelRatingEl, hotelPriceEl);
            hotelCol.append(hotelCard);

            $("#hotelResults").append(hotelCol);
        };
    });

};

function saveSearch() {
    $("#search-history").empty();
    for (let i=0;( i < searchHistory.length && i<5); i++) {
        let history = $("<li>");
        history.text(searchHistory[i]);
        history.attr("class", "usercity");
        $("#search-history").append(history);
    }

    

    //onclick for usercity needs to be here due to scoping issues
    $(".usercity").on("click", function() {
        getHotelInfo($(this).text());
       getBeerInfo($(this).text());
    })
    
};

//function to load local storage
function loadSearch() {
    let storedHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (storedHistory !== null) {
        searchHistory = storedHistory
    }
    saveSearch();
};



