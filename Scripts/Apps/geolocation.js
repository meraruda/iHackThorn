var jsonpCallBackName;

function getUserPosition(onSucceed, onError) {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(onSucceed, onError);
    } else {
        alert("Sorry, this browser doesn't support geolocation!");
    }    
}


function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;    
    console.log('經度: ' + position.coords.longitude + '，緯度: ' + position.coords.latitude);
}

function displayError(error) {
    var errors = ["Unknown error", "Permission denied by user", "Position not available", "Timeout error"];
    var message = errors[error.code];
    console.warn("Error in getting your location: " + message, error.message);
}

function nearbySearchApi(request, onSucceed, onError) {
    placeService.nearbySearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            if (typeof onSucceed === 'function') {
                onSucceed(results);
            }
            else {
                defaultPlaceSucceedHandler(results);
            }
        }
        else {
            onError(results);
        }
    });
}


function defaultPlaceSucceedHandler(results) {
    for (var i = 0; i < results.length; i++) {
        var place = results[i];
        // If the request succeeds, draw the place location on
        // the map as a marker, and register an event to handle a
        // click on the marker.
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
    }
}

function errorCk(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
}

function jsonCallback(json) {
    console.log(json);
}

function getPlaceDetail(placeid, onSucceed){
    placeService.getDetails({
        placeId: placeid
    }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            if (typeof onSucceed === 'function') {
                onSucceed(place);
            }
        }
    });
}