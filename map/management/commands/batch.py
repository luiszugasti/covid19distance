import googlemaps
import time
# from django.core.management.base import BaseCommand, CommandError

# from map.models import Location


def merge_two_dicts(x, y):
    z = x.copy()  # start with x's keys and values
    z.update(y)  # modifies z with y's keys and values & returns None
    return z


# class Command(BaseCommand):
# create the gmaps object
key = 'AIzaSyAa9kNiGDlJqiOk9iudMkoEOpND4ZKcsFI'
gmaps = googlemaps.Client(key)
# let toronto = {lat: 43.6598154, lng: -79.4618357};
location = (43.6598154, -79.4618357)
type_list = ["park", "meal_takeaway", "library", "transit_station"]  #
# hard coded
# for now
language = "en-US"
region = "CA"
radius = 2000

for sample_type in type_list:
    # get the initial placement...
    test = gmaps.places(
        sample_type,
        location=location,
        radius=radius,
        # region=region,
        language=language,
        # min_price=0,
        # max_price=4,
        # open_now=True,
        type=sample_type,
    )

totals = test['results']

# get the subsequent entries for test by iterating thru the places object,
# sending the new value of "next_page_token".
for i in range(0, 10):
    time.sleep(5)
    test = gmaps.places(
        sample_type,
        location=location,
        radius=radius,
        language=language,
        type=sample_type,
        page_token=test['next_page_token']
    )
    totals.extend(test['results'])
    try:
        next_page_token = test['next_page_token']
    except KeyError:
        break

print("yay")
# TODO write to database
# for item in totals:
#     temp = Location(
#         location_name=item["name"],
#         location_access_day='Monday',
#         location_access_time=2,
#         location_population=10,
#     )
#     temp.save()
