
$(document).ready(function () {

var APIKey = "f2c7f03ce6caef2a5f775dc746cdf6d9";
var ingredient = ["rice", "steak", "fish", "lettuce", "milk", "chicken"];


 //Create buttons for each itme in ingredient
 for (var i=0; i < ingredient.length; i++) {
 var newBtn = $("<button>").text(ingredient[i])
    .addClass("btn btn-primary")
    .attr("data-name", ingredient[i]);
 $("#btn-view").append(newBtn);
};

//Make API call to obtain data
function getDishes(currentDish){
 console.log({
     currentDish: currentDish
 });
//Create Query URL
 var queryURL = "https://www.food2fork.com/api/search?key=" + APIKey + "&q=" + currentDish + "&page=1";
//Empty the DIV of previous data
$("#gif-view").empty();

//Make AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"}).then(function(response){
            console.log({ response: response });       
//Insert three dish pics with title   
    for (var k=0; k < 3; k++){

        var usableResponse = JSON.parse(response);
        console.log(usableResponse);
        
        var dishTitle = $("<div>").text(usableResponse.recipes[k].title);
        $("#gif-view").append(dishTitle);

        var nextDish = $("<img>").attr('src', usableResponse.recipes[k].image_url);
        $("#gif-view").append(nextDish);
    };
    });

};

//Listen for click on one of the available buttons

$(".btn").on("click", function(event){
    event.preventDefault();

    var clickedIngredient = $(this).attr("data-name");

    console.log({
        clickedIngredient: clickedIngredient
    });
    getDishes(clickedIngredient);
});

})