# Generated by Django 5.1.3 on 2024-12-17 10:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bills', '0008_rename_bill_bills'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='bills',
            table='bill_bills',
        ),
    ]
