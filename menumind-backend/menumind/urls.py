from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

# Root fallback health/home endpoint
def home(request):
    return JsonResponse({
        "status": "Backend Running",
        "message": "MenuMind API Live",
        "version": "1.0"
    })

urlpatterns = [
    # Root welcome endpoint
    path('', home),

    # Admin panel
    path('admin/', admin.site.urls),

    # App routes (make sure app/urls.py exists)
    path('api/', include('app.urls')),
]
