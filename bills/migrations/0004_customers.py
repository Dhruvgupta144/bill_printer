# Generated by Django 5.1.3 on 2024-12-09 16:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bills', '0003_rename_product_products_alter_products_table'),
    ]

    operations = [
        migrations.CreateModel(
            name='customers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
                ('address', models.CharField(max_length=50)),
                ('phone', models.CharField(max_length=10)),
                ('email', models.EmailField(max_length=254)),
            ],
            options={
                'db_table': 'customers',
            },
        ),
    ]
