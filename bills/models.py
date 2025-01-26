from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.

class customers(models.Model):
    name = models.CharField(max_length=25)
    address = models.CharField(max_length=50)
    phone = models.CharField(max_length=10)
    email = models.EmailField(max_length=254)

    class Meta:
        db_table = 'customers'
        unique_together = ('name', 'email')  # Ensures uniqueness at the database level

    def clean(self):
        # Additional validation if needed
        if customers.objects.filter(name=self.name, email=self.email).exists():
            raise ValidationError('A customer with this name and email already exists.')

    def save(self, *args, **kwargs):
        try:
            self.full_clean()  # Validate before saving
            super().save(*args, **kwargs)
        except ValidationError as e:
            print(f"Error saving customer: {e}")


class products(models.Model):
    product_name = models.CharField(max_length=255, unique=True)  # Ensures uniqueness at the database level
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=5, decimal_places=2)
    unit = models.CharField(max_length=50)

    class Meta:
        db_table = 'products'

    def clean(self):
        # Additional validation if needed
        if products.objects.filter(product_name=self.product_name).exists():
            raise ValidationError('A product with this name already exists.')

    def save(self, *args, **kwargs):
        try:
            self.full_clean()  # Validate before saving
            super().save(*args, **kwargs)
        except ValidationError as e:
            print(f"Error saving product: {e}")


class bills(models.Model):
    bill_number = models.IntegerField(unique=True)
    date = models.DateField()
    name = models.CharField(max_length=100)
    address = models.TextField()
    email = models.EmailField()
    mobile = models.CharField(max_length=15)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    class Meta:
        db_table = 'bills_bill'

