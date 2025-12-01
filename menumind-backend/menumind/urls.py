from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def home(request):
    return JsonResponse({
        "status": "Backend Running",
        "message": "MenuMind API Live",
        "routes": [
            "/api/auth/send-otp/",
            "/api/auth/verify-otp/",
            "/api/prediction/run/",
            "/api/prediction/me/",
            "/api/upload/sales/"
        ]
    })

urlpatterns = [
    path('', home),                               # root response
    path('admin/', admin.site.urls),              # admin panel
    path('api/', include('app.urls')),            # include all app routes
]
