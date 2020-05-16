from django import forms
from .models import Location

class locationForm(forms.ModelForm):
    class Meta:
        model = Location
        fields = ['location_name','location_access_day','location_access_time','location_population']