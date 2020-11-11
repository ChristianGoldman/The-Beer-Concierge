$(".btn").on("click", function() {
    let location = $("#searchLocation").val();
    console.log(location);
    listSearch();

    getHotelInfo(location);

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


});

function getHotelInfo(city) {

    $("#hotelResults").empty();

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tripadvisor-com.p.rapidapi.com/hotel/search?location=" + city + "=1&offset=0&language=en&currency=USD",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "66caed8e94mshaafad0b4be0f6f7p179bc0jsna15f212d5e21",
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

function listSearch() {
    $("#search-history").empty();
    let location = $("#searchLocation").val();
    localStorage.setItem("City", JSON.stringify(location));
    let city = JSON.parse(localStorage.getItem("City"));
    let lastSearch = $("<h5 class='lastSearch'>");
    lastSearch.text("Previous Search: " + city);
    $("#search-history").append(lastSearch);

    console.log(location);
    
}
