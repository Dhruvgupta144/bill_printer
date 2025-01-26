from django.urls import path,include
from .import views
urlpatterns = [
    path('', views.apphome,name='apphome'),
    path('insert_customer/', views.insert_customer,name='insert_customer'),
     path('view_bill/', views.view_bill,name='view_bill'),
    path('delete_customer/', views.delete_customer,name='delete_customer'),
    path('insert_product/', views.insert_product,name='insert_product'),
    path('delete_product/', views.delete_product,name='delete_product'),
    path('save_bill/', views.save_bill, name='save_bill'),
    path('view_tables/', views.view_tables,name='view_tables'),
    path('bill/', views.bill,name='bill'),
    path('send_email_page/', views.send_email_page,name='send_email_page'),
    path('send_email/', views.send_email,name='send_email'),
    path('send_email_message/', views.send_email_message,name='send_email_message'),
    path('help/', views.help,name='help'),
]
