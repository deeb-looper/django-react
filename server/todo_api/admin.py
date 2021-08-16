from django.contrib import admin
from . import models

@admin.register(models.Todo)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'completed', 'creator')
