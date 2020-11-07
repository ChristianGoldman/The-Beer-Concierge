$(".btn").on("click", function() {
    let location = $("#searchlocation").val();
    console.log(location);

    getHotelInfo(location);



    let beerURL = "https://api.openbrewerydb.org/breweries?by_city=" + location;

    $.ajax({
        url: beerURL,
        method: "GET",
    }).then(function(response) {
        console.log(response);
    })


});

function getHotelInfo(city) {

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tripadvisor-com.p.rapidapi.com/hotel/search?location=" + city + "=1&offset=0&language=en&currency=USD",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "e46221a643mshaa778c220df7fe7p12e0e2jsnc4033c1b7809",
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

            let hotelName = $("<div>");

            let hotelNameEl = $("<a>");
            hotelNameEl.attr("href", response.data[i].website);
            hotelNameEl.attr("target", "_blank");
            hotelNameEl.text(hotelList[i]);

            hotelName.append(hotelNameEl);
            console.log(hotelList);

            $("#hotelResults").append(hotelName);
        };
    });
};