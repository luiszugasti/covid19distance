from django.shortcuts import render
from .models import Location
from .forms import locationForm
def index(request):
    form = locationForm();
    locations = Location.objects.all()
    return render(request, './covid19distance/index.html',{
        'locations':locations,
        'locationForm':form
    })

def submit(request):
    if request.method == 'POST':
        form = locationForm(request.POST)
        if form.is_valid():
            location_name1 = form.cleaned_data['location_name']
            location_access_day1 = form.cleaned_data['location_access_day']
            location_access_time1 = form.cleaned_data['location_access_time']
            location_population1 = form.cleaned_data['location_population']
            locationObj = Location(location_name = 'location_name1', location_access_day = 'Monday',location_access_time = '20:12:12',location_population = '123')
            locationObj.save(force_insert=True)
            new_form = locationForm()
            return render(request,'./covid19distance/submit.html',{
                'locationform':new_form
            })
    else:
        form = locationForm()
        return render(request,'./covid19distance/submit.html',{
            'locationform':form
        })