from django.db import models


class Location(models.Model):
    WEEK_DAYS = ['Monday','Tuesday','Wednesday','Thusday','Friday','Saturday','Sunday']
    location_name = models.CharField(max_length = 100)
    location_access_day = models.CharField(max_length=9, choices=WEEK_DAYS)
    location_access_time = models.TimeField()
    location_population = models.IntegerField(null=True)
