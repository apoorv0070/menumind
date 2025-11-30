
from django.db import models
class Restaurant(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    city = models.CharField(max_length=100, blank=True)
class Dish(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    cost_price = models.FloatField(default=0)
    selling_price = models.FloatField(default=0)
class Sales(models.Model):
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    date = models.DateField()
    qty = models.IntegerField()
    session = models.CharField(max_length=10, choices=(('lunch','lunch'),('dinner','dinner')))
class Prediction(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    date = models.DateField()
    payload = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
