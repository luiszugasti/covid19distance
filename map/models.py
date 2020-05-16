from django.db import models


class Location(models.Model):
    WEEK_DAYS = [('Mon','Monday'),('Tue','Tuesday'),('Wed','Wednesday'),('Thu','Thusday'),('Fri','Friday'),('Sat','Saturday'),('Sun','Sunday')]
    location_name = models.CharField(max_length = 100)
    location_access_day = models.CharField(max_length=9, choices=WEEK_DAYS)
    location_access_time = models.TimeField()
    location_population = models.IntegerField(null=True)
