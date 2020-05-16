import googlemaps

# create the gmaps object
key = 'AIzaSyAa9kNiGDlJqiOk9iudMkoEOpND4ZKcsFI'
gmaps = googlemaps.Client(key)
# let toronto = {lat: 43.6598154, lng: -79.4618357};
location = (43.6598154, -79.4618357)
type = "park" # hard coded for now
language = "en-US"
region = "CA"
radius = 2000

tst = gmaps.places(
    "restaurant",
    location=location,
    radius=radius,
    # region=region,
    language=language,
    min_price=0,
    max_price=4,
    open_now=True,
    type=type,
)

print("yay")

