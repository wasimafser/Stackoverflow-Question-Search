from django.db import models

# Create your models here.


class QueryResponse(models.Model):
    query = models.CharField(max_length=1000)
    response = models.JSONField(null=True)

    def __str__(self):
        return self.query
