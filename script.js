$(".btn").on("click", function() {
    let location = $("#searchLocation").val();
    console.log(location);

    getHotelInfo(location);



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
            let breweryname = $("<div>");

            let breweryNameEl = $("<a>");
            breweryNameEl.attr("href", response[i].website_url);
            breweryNameEl.attr("target", "_blank");
            breweryNameEl.text(response[i].name);

            breweryname.append(breweryNameEl);

            $("#beerResults").append(breweryname);
        }
    })


});

function getHotelInfo(city) {

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
            hotelCol.addClass("col s12 m7");
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
            hotelCardContent.append(hotelNameEl);
            hotelCardStaked.append(hotelCardContent);
            hotelCard.append(hotelCardImg, hotelCardStaked);
            hotelCol.append(hotelCard);



            $("#hotelResults").append(hotelCol);

        // for (let i=0; i < getHotel.length ; i++) {

        //     let getHotelName = response.data[i].name;
        //     hotelList.push(getHotelName);

        //     let hotelName = $("<div>");

        //     let hotelNameEl = $("<a>");
        //     hotelNameEl.attr("href", response.data[i].website);
        //     hotelNameEl.attr("target", "_blank");
        //     hotelNameEl.text(hotelList[i]);
        //     let hotelImageEl = $("<img>");
        //     hotelImageEl.attr("alt", "picture of the hotel");
        //     hotelImageEl.attr("src", response.data[i].photo.images.small.url);


        //     hotelName.append(hotelNameEl);
        //     hotelName.append(hotelImageEl);
        //     console.log(hotelList);

        //     $("#hotelResults").append(hotelName);
        };
    });
};

// function getBeerInfo() {
    
// }