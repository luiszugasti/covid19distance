from django.db import models


class Location(models.Model):
    location_name = models.CharField(max_length=100)
    location_access_day = models.CharField(max_length=9)
    location_access_time = models.IntegerField()
    location_population = models.IntegerField(null=True)
