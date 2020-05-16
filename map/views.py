from django.shortcuts import render


def index(request):
    return render(request, './covid19distance/index.html')


def testmap(request):
    return render(request, './covid19distance/testmap.html')
