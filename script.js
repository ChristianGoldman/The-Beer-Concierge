$(".btn").on("click", function() {
    let location = $("#searchlocation").val();
    console.log(location);

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tripadvisor-com.p.rapidapi.com/hotel/search?location=" + location + "=1&offset=0&language=en&currency=USD",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "66caed8e94mshaafad0b4be0f6f7p179bc0jsna15f212d5e21",
            "x-rapidapi-host": "tripadvisor-com.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    });



let beerURL = "https://api.openbrewerydb.org/breweries?by_city=" + location;

$.ajax({
    url: beerURL,
    method: "GET",
}).then(function(response) {
    console.log(response);
})


})