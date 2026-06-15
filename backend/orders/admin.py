from django.contrib import admin
from .models import Order

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "customer_name",
        "phone",
        "total_amount",
        "status",
        "pickup_date",
    )

    list_filter = (
        "status",
        "pickup_date",
    )

    search_fields = (
        "customer_name",
        "phone",
    )