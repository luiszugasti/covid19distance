from django.shortcuts import render
from .models import Location
from .forms import locationForm
import json
from django.http import HttpResponse
from django.core import serializers

def index(request):
    locations = Location.objects.all()
    if request.method == 'POST':
        form = locationForm(request.POST)
        if form.is_valid():
            location_name1 = form.cleaned_data['location_name']
            location_access_day1 = form.cleaned_data['location_access_day']
            location_access_time1 = form.cleaned_data['location_access_time']
            location_population1 = form.cleaned_data['location_population']
            locationObj = Location(location_name = location_name1, location_access_day = location_access_day1,location_access_time = location_access_time1,location_population = location_population1)
            locationObj.save(force_insert=True)
            new_form = locationForm()
            return render(request,'./covid19distance/index.html',{
                'locationform':new_form,
                'locations':locations,
                'send_status':'valid'
            })
    else:
        form = locationForm();
        return render(request, './covid19distance/index.html',{
            'locations':locations,
            'locationform':form,
            'send_status':'invalid'
        })

def park(request):
    dump = serializers.serialize('json', Location.objects.filter(location_type='park'))
#name of park and color
    data = json.dumps(dump)
    return HttpResponse(data, content_type='application/json')