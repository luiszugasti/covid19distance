import googlemaps
import time

def merge_two_dicts(x, y):
    z = x.copy()   # start with x's keys and values
    z.update(y)    # modifies z with y's keys and values & returns None
    return z

# create the gmaps object
key = 'AIzaSyAa9kNiGDlJqiOk9iudMkoEOpND4ZKcsFI'
gmaps = googlemaps.Client(key)
# let toronto = {lat: 43.6598154, lng: -79.4618357};
location = (43.6598154, -79.4618357)
type = "park" # hard coded for now
language = "en-US"
region = "CA"
radius = 2000

# get the initial placement...
test = gmaps.places(
    type,
    location=location,
    radius=radius,
    # region=region,
    language=language,
    # min_price=0,
    # max_price=4,
    # open_now=True,
    type=type,
)

totals = test['results']

# get the subsequent entries for test by iterating thru the places object, sending the new value of "next_page_token".
for i in range(0, 10):
    time.sleep(5)
    test = gmaps.places(
        type,
        location=location,
        radius=radius,
        language=language,
        type=type,
        page_token=test['next_page_token']
    )
    totals.extend(test['results'])
    try:
        next_page_token = test['next_page_token']
    except KeyError:
        break


print("yay")
