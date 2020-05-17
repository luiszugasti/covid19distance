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
let location_data = document.getElementById('hidden').innerHTML;
let new_location_data = location_data.substring(0,location_data.length-54);
new_location_data+='}';
let location_json = JSON.parse(new_location_data);
console.log(location_json);
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
            
            let contentString = place.name+ location_json[place.name]+"<br>" +
            '<button onClick="checkIn(\'' + place.name.replace(/'/g, "\\'") + '\')" />Check In</button>';
            infowindow.setContent(contentString);
            infowindow.open(map, this);
        });



          
        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}
function addMarker(place){
    let markerList = ['./static/images/green.png','./static/images/blue.png','./static/images/yellow.png','./static/images/red.png'];
    let image = {
        // testing out the marker setups
        url: markerList[parseInt(Math.random()*4)],
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(30, 55)
    };
    let marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location,
    });
    markers.push(marker);
    var cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: place.geometry.location,
        radius: 1000
      });
}
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

document.getElementById("id_location_name").style.visibility = 'hidden';
document.getElementById("id_location_access_day").style.visibility = 'hidden';
document.getElementById("id_location_access_time").style.visibility = 'hidden';
document.getElementById("id_location_type").style.visibility = 'hidden';

function checkIn(name){
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let now = new Date();
    document.getElementById("id_location_name").value = name;
    document.getElementById("id_location_access_day").value = days[now.getDay()];
    document.getElementById("id_location_access_time").value = now.getHours();
    document.getElementById("id_location_type").value = queryLocation;
}

function changeMarkers(location) {
    queryLocation = location;
    markers = [];
    initMap();
}