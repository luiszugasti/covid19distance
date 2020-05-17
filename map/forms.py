from django import forms
from .models import Location

class locationForm(forms.ModelForm):
    location_name = forms.CharField(label='')
    location_access_day = forms.CharField(label='')
    location_access_time = forms.IntegerField(label='')
    location_population = forms.IntegerField(label='Observed Population')
    location_type = forms.CharField(label='')
    class Meta:
        model = Location
        fields = ['location_name','location_access_day','location_access_time','location_type','location_population']