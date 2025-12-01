
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def home(request):
    return JsonResponse({"status": "Backend Running", "message": "MenuMind API Live"})
urlpatterns = [path('', home),path('admin/', admin.site.urls), path('api/', include('app.urls'))]
