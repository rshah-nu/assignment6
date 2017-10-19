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
//Call buttonGen function for initial button generation
buttonGen();
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
    $(".gifRow").empty();
});

// Call Giphy API, print images to page
function apiCall(yourChoice){
    // API Key from NU Bootcamp
    var apiKey = "dc6zaTOxFJmzC";
    // Construct query URL, using paramaters apiKey, q=search term, and limit= how many results you want returned
    var URL= "http://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + yourChoice + "&limit=10";
    // getJSON, similar to .ajax, but simpler  
    $.getJSON(URL, function(response){
        // Iterate over entire response object 
        for (var index = 0; index < response.data.length; index++) {
            // Get still URL, fixed_height, see API docs 
            var stillURL = response.data[index].images["fixed_height_still"].url;
            // get full movement GIF URL, fixed_height, see API docs 
            var gifURL = response.data[index].images["fixed_height"].url;
            // get rating, see API docs 
            var rating = response.data[index].rating;
            // Pass above variables to print the images and rating to the page
            printToPage(stillURL, gifURL, rating);
        };
    });
};

// Function which prints images, ratings to a bootstrap panel element  
// This is a super long function.... probably a way to make it more concise? 
function printToPage(stillURL, gifURL, rating){
    // create new image element using jQuery 
    var myImg = $("<img>");
    // set the initial source to stillURL, will be changed on click
    myImg.attr("src", stillURL);
    // set classes, center-block centers image within panel
    myImg.addClass("gifImg center-block");
    // Store the full movement GIF URL as a data attribute so it can easily be accessed in future on click to change source
    myImg.attr("data-imgMove", gifURL);
    // Store the still URL as a data attribute so we can access it in future
    myImg.attr("data-imgStill", stillURL)
    // Initial status is still, therefore set value of curStatus key to still, will change on click
    myImg.attr("data-curStatus", "still");
    // Create a div to hold panel
    var myPanel = $("<div>");
    // Bootstrap panel attributes, col-lg-6 allows 2 each panels / row
    myPanel.addClass("panel panel-default gifPanel col-lg-6");
    // create a div to hold panel body, see bootstrap docs 
    var panelBody = $("<div>");
    // Assign panel-body class, see bootstrap docs
    panelBody.addClass("panel-body");
    // ADD the image into the panel body
    panelBody.append(myImg);
    // Create Panel Footer which will hold the rating
    var panelFooter = $("<div>");
    // Add panel footer and text-center classes to footer, see bootstrap docs
    panelFooter.addClass("panel-footer text-center");
    //Add the rating to the panel-footer, ideally make the rating bold, possibly add span element in future
    panelFooter.text("Rating: " + rating);
    // append panelBody (which contains image) to the panel container (see Bootstrap docs)
    myPanel.append(panelBody);
    // append panelFooter (which contains rating) to panel container (see bootstrap docs)
    myPanel.append(panelFooter);
    //Finaally, append the finished panel to the DOM
    $(".gifRow").append(myPanel);
};

// Function which looks for on clicks of GIF Images only
$(document.body).on("click", ".gifImg", function(e){
    // IF image is not moving (still), change source to movement URL and update status to moving 
    if ($(this).attr("data-curStatus") == "still") {
        $(this).attr("src", $(this).attr("data-imgMove"));
        $(this).attr("data-curStatus", "move");
    }
    // If image IS moving, make source the still URL and update status to still 
    else{
        $(this).attr("src", $(this).attr("data-imgStill"));
        $(this).attr("data-curStatus", "still");        
    }
});



