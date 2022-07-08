from django.contrib import admin

# Register your models here.

from .models import SalesByCardType

admin.site.register(SalesByCardType)
