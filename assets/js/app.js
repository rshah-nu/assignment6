// Initial buttons Array
var buttons = ["Mouse", "Cat", "Dog", "Car", "Blackhawks", "Ambulance", "Coffee", "Bubbles", "Puppy", "Plants"];

// Lower Case buttons array, used to ensure user doesn't enter a repeat term by messing up the case
var lowerCaseButtons = []

// Function which pushes lowercase copies of items in buttons array to lowerCaseButtons array, only needs to run ONCE, probably does not need to be a Fxn?
function lowerCaseArray(){
    for (var index = 0; index < buttons.length; index++) {
        lowerCaseButtons.push(buttons[index].toLowerCase());
   };
};

// Only time this function is needed, probably don't need to have it in a function but... whatever, maybe I'll need it again for whatever reason
lowerCaseArray();

// Generate buttons to page
function buttonGen() {
    // Empty existing content from btnRow to avoid constant duplications
    $(".btnRow").empty();
    // Iterate through current state of buttons array and print buttons to page
    for (var index = 0; index < buttons.length; index++) {
        // Create button element using jQuert
         var myButton = $("<button>");
        //  Set inner text of button to value at current index in array
         myButton.text(buttons[index]);
        //  Add bootstrap and personal classes to buttons
         myButton.addClass("btn gifButtons btn-primary");
        //  Add a data-attribute to buttons - later on used to find out what was clicked and pass to API
         myButton.attr("data-btnData", buttons[index]);
        //  Append each button to page
         $(".btnRow").append(myButton);
    };
};

// Get Input and add button to page
$("#gifSubmit").on("click", function(e){
    // Prevent page from refreshing on submit
    e.preventDefault();
    // Get user input and store to userInput variable
    var userInput = $("#gifSearch").val();
    // Validate to ensure user input is not empty, empty values return false
    if (userInput) {
        // Validate that the user hasn't entered a DUPLICATE entry, lowerCaseArray is used here because you don't want user to mix case 
        // just to try to screw with you ...mike, ...peter
        if (lowerCaseButtons.includes(userInput.toLowerCase())) {
            // TO-DO: Add item to page that shows array already contains item;
            // Reset search field to empty
            $("#gifSearch").val('');
        }
        // If user string input isn't empty AND input isn't a duplicate
        else{
            // Push user input to buttons array
            buttons.push(userInput);
            // Make sure it is pushed to lower case array too
            lowerCaseButtons.push(userInput.toLowerCase());
            // Reset search field to empty
            $("#gifSearch").val('');
            // print buttons to page
            buttonGen();            
        }
    }
    // If user string is empty
    else{
        // TO-DO: Add item to page that shows user didn't enter anything
    }
});

// Function which retrieves data-btnData attribute from whatever button the user pressed and passes it on to the API call fxn
$(document.body).on("click", ".gifButtons", function(){
    // Set the value of the data-btndata key to a variable for future use
    var yourChoice = $(this).attr("data-btnData");
    // Call the API passing the value of whatever button you clicked on
    apiCall(yourChoice);
});

// Call Giphy API, print images to page
function apiCall(yourChoice){
    var apiKey = "dc6zaTOxFJmzC";
    var URL= "http://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + yourChoice + "&limit=10";
    console.log(URL);
    $.getJSON(URL, function(data){
        
    });
}

// function printToPage(data){

//     var myImg = $("<img>")
//     myImg.attr("src", "")
//     var myMainDiv = $("<div>");
//     myMainDiv.addClass("col-lg-6 panel panel-default");
//     myMainDiv.append()
//     $("#gifRow")
// }
