# Generated by Django 5.1.3 on 2024-12-12 17:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bills', '0004_customers'),
    ]

    operations = [
        migrations.DeleteModel(
            name='user',
        ),
    ]
