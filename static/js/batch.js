// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

let map;
let service;
let infowindow;
let markers = [];
let textSearchCall = "https://maps.googleapis.com/maps/api/place/textsearch/"
let apiToken = "AIzaSyAa9kNiGDlJqiOk9iudMkoEOpND4ZKcsFI"
let queryLocation = 'park';
const apiString = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=park&key=AIzaSyCYNyE9kaiI_NaNfAuVpdJh9M5igP5yeTE&location=43.7184038,-79.5181406&radius=2000&type=park"

function initMap() {
    // Create the map.
    //43.6598154,-79.4618357
    let toronto = {lat: 43.6598154, lng: -79.4618357};
    map = new google.maps.Map(document.getElementById('map'), {
        center: toronto,
        zoom: 12
    });

    // Create the places service.
    let service = new google.maps.places.PlacesService(map);
    let getNextPage = null;
    let moreButton = document.getElementById('more');
    moreButton.onclick = function () {
        moreButton.disabled = true;
        if (getNextPage) getNextPage();
    };

    // Perform a nearby search.
    service.nearbySearch(
        {location: toronto, radius: 10000, type: [queryLocation]},
        function (results, status, pagination) {
            if (status !== 'OK') return;
  
            createMarkers(results);
            moreButton.disabled = !pagination.hasNextPage;
            getNextPage = pagination.hasNextPage && function () {
                pagination.nextPage();
            };
        });
}

function createMarkers(places) {
    let bounds = new google.maps.LatLngBounds();
    let placesList = document.getElementById('places');

    for (let i = 0, place; place = places[i]; i++) {

        addMarker(place);
        let infowindow = new google.maps.InfoWindow();

        google.maps.event.addListener(markers[i], 'click', function () {
            let contentString = '<button onClick="checkIn(\'' + place.name.replace(/'/g, "\\'") + '\')" />Check In</button>';
            infowindow.setContent(contentString);
            infowindow.open(map, this);
        });
        let li = document.createElement('li');
        li.textContent = place.name + '<button onClick="checkIn(\'' + place.name.replace(/'/g, "\\'") + '\')" />Check In</button>';
        placesList.appendChild(li);

        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}
function addMarker(place){
    let image = {
        // testing out the marker setups
        url: "https://i.pinimg.com/736x/d7/b2/13/d7b21331ffcae6093e15699e413bf90b.jpg",
        size: new google.maps.Size(100, 100),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
    };
    let marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
    });
    markers.push(marker);
}
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }
function checkIn(name){
    let nname = name.replace(/'/g, "\\'");
    console.log(nname);
}

function changeMarkers(location) {
    queryLocation = location;
    markers = [];
    initMap();
}