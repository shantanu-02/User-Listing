from django.db import models

class Users(models.Model):
    gender = models.CharField(max_length=10)
    title = models.CharField(max_length=10)
    first_name = models.CharField(max_length=50, db_index=True)
    last_name = models.CharField(max_length=50, db_index=True)
    street_name = models.CharField(max_length=100)
    street_number = models.IntegerField()
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    postcode = models.CharField(max_length=20)
    latitude = models.FloatField()
    longitude = models.FloatField()
    timezone_offset = models.CharField(max_length=10)
    timezone_description = models.CharField(max_length=100)
    email = models.EmailField(unique=True, db_index=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=255)
    dob = models.DateTimeField()
    registered = models.DateTimeField()
    phone = models.CharField(max_length=20)
    cell = models.CharField(max_length=20, db_index=True)
    nat = models.CharField(max_length=5)
    picture_large = models.URLField()
    picture_medium = models.URLField()
    picture_thumbnail = models.URLField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
