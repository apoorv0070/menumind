
from django.urls import path
from . import views
urlpatterns = [
    path('auth/send-otp/', views.send_otp),
    path('auth/verify-otp/', views.verify_otp),
    path('prediction/run/', views.run_prediction),
    path('prediction/me/', views.get_my_prediction),
    path('upload/sales/', views.upload_sales),
]
