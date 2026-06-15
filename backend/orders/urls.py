from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import CustomerAnalyticsView

from .views import download_invoice

from .views import (
    OrderCreateView,
    OrderUpdateView,
    RegisterView,
    UserOrderView,
    TrackOrderView,
    ReviewView,
    ReviewDeleteView,
    DashboardStatsView,
    ReviewListView,
    ReviewDeleteView,
)
from .views import AnalyticsView

from .views import (
    export_orders_excel,
    export_customers_excel,
    export_revenue_report,
)

urlpatterns = [

    path(
        "orders/",
        OrderCreateView.as_view(),
        name="orders"
    ),

    path(
        "orders/<int:pk>/",
        OrderUpdateView.as_view(),
        name="order-update"
    ),

    path(
        "my-orders/",
        UserOrderView.as_view(),
        name="my-orders"
    ),

    path(
        "track-order/",
        TrackOrderView.as_view(),
        name="track-order"
    ),

    path(
        "reviews/",
        ReviewView.as_view(),
        name="reviews"
    ),

    path(
    "reviews/<int:pk>/",
    ReviewDeleteView.as_view(),
    name="review-delete"
),

    path(
        "register/",
        RegisterView.as_view(),
        name="register"
    ),

    path(
        "login/",
        TokenObtainPairView.as_view(),
        name="login"
    ),

    path(
        "refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),

    path(
    "dashboard-stats/",
    DashboardStatsView.as_view(),
     name="dashboard-stats"
),


path(
    "all-reviews/",
    ReviewListView.as_view(),
    name="all-reviews"
),

path(
    "reviews/<int:pk>/delete/",
    ReviewDeleteView.as_view(),
    name="delete-review"
),

path(
    "invoice/<int:order_id>/",
    download_invoice,
    name="invoice",
),

path(
    "analytics/",
    AnalyticsView.as_view()
),

path(
    "customers/",
    CustomerAnalyticsView.as_view()
),

path(
    "export-orders/",
    export_orders_excel,
),

path(
    "export-customers/",
    export_customers_excel,
),

path(
    "export-revenue/",
    export_revenue_report,
),
]