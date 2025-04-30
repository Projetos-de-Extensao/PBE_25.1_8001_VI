from . import views
from django.contrib import admin
from django.urls import path, include

urlpatterns = [ path('admin/', admin.site.urls), path('', include('myapp.urls')), ]
urlpatterns = [ path('', views.home, name='home'), ]