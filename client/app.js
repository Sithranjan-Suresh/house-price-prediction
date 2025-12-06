// Helper function to get the value of the selected bathroom radio button
function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  // Assuming the radio buttons are structured to correspond to the value (1, 2, 3...)
  for(var i in uiBathrooms) {
    if(uiBathrooms[i].checked) {
        // Since i is a string index, parseInt(i) + 1 gives the intended bath value
        return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

// Helper function to get the value of the selected BHK radio button
function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  // Assuming the radio buttons are structured to correspond to the value (1, 2, 3...)
  for(var i in uiBHK) {
    if(uiBHK[i].checked) {
        // Since i is a string index, parseInt(i) + 1 gives the intended bhk value
        return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

// Function executed when the "Estimate Price" button is clicked
function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  // *** MODIFIED URL FOR DIRECT FASTAPI ACCESS ***
  // Assuming FastAPI/Uvicorn is running on the default port 8000
  var url = "http://127.0.0.1:8000/predict_home_price"; 

  // $.post is a jQuery shorthand for an AJAX POST request
  $.post(url, {
      // Data matches the Form(...) parameters in your server.py
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  },function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);
  }).fail(function(xhr, status, error) {
      // Optional: Add a fail handler for better debugging
      console.error("POST request failed. Status: " + status + ", Error: " + error);
      console.error("Response Text: " + xhr.responseText);
      estPrice.innerHTML = "<h2>Error: Could not estimate price.</h2>";
  });
}

// Function executed when the page first loads
function onPageLoad() {
  console.log( "document loaded" );
  // *** MODIFIED URL FOR DIRECT FASTAPI ACCESS ***
  var url = "http://127.0.0.1:8000/get_location_names"; 

  // $.get is a jQuery shorthand for an AJAX GET request
  $.get(url,function(data, status) {
      console.log("got response for get_location_names request");
      if(data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          // $('#uiLocations').empty(); // This line is not needed if the next line is used
          $('#uiLocations').empty(); 
          for(var i in locations) {
              // Ensure the location value is in the correct format (lowercase) if needed by the server
              var locationValue = locations[i].toLowerCase(); 
              // Display name with capitalization for readability
              var displayName = locations[i]; 

              var opt = new Option(displayName, locationValue); // Option(text, value)
              $('#uiLocations').append(opt);
          }
      }
  }).fail(function(xhr, status, error) {
      // Optional: Add a fail handler for better debugging
      console.error("GET request failed. Status: " + status + ", Error: " + error);
      document.getElementById("uiLocations").innerHTML = "<option>Error loading locations</option>";
  });
}

// Attach the load function to the window's load event
window.onload = onPageLoad;