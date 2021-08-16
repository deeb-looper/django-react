from django.db import models
from django.conf import settings

# Create your models here.
class TimeStampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Todo(TimeStampMixin):
    title = models.CharField(max_length=100)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='todo_posts')
    description = models.TextField()
    completed = models.BooleanField(default=False)

    objects = models.Manager()

    class Meta:
        ordering = ('-created_at',)

    def _str_(self):
        return self.title