# Generated by Django 5.1.3 on 2024-12-08 16:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bills', '0002_product'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='product',
            new_name='products',
        ),
        migrations.AlterModelTable(
            name='products',
            table='products',
        ),
    ]
