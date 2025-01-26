from django.shortcuts import render
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse , HttpResponse
from django.core.mail import EmailMessage
from .models import *
from datetime import datetime
# Create your views here.


def apphome(request):
    return render(request,'apphome.html')

def view_bill(request):
    mybills = bills.objects.all().order_by('-bill_number')
    return render(request, 'view_bill.html', {'bills':mybills})

def insert_customer(request):
    if request.method=="POST":
        Vusername = request.POST['name']
        Vaddress= request.POST['address']
        Vphone    = request.POST['phone']
        Vemail    = request.POST['email']
        us= customers(name=Vusername, address=Vaddress,phone=Vphone,email=Vemail);
        us.save();
        pass
    return HttpResponse(status=204)

def delete_customer(request):
    if request.method == 'POST':
        Name = request.POST.get('name')
        Email = request.POST.get('email')
        customer = customers.objects.filter(name=Name) & customers.objects.filter(email=Email)
        if customer.exists():
            customer.delete()
    return HttpResponse(status=204)

def insert_product(request):
    if request.method=="POST":
        Vproductname = request.POST['productname']
        Vprice       = request.POST['price']
        Vdiscount    = request.POST['discount']
        Vunit        = request.POST['unit']
        us= products(product_name=Vproductname, price=Vprice ,discount=Vdiscount,unit=Vunit);
        us.save();
        pass
    return HttpResponse(status=204)

def delete_product(request):
    if request.method == 'POST':
        Product_name = request.POST.get('name')
        product = products.objects.filter(product_name=Product_name) 
        if product.exists():
            product.delete()
    return HttpResponse(status=204)

def view_tables(request):
    myproducts = products.objects.all().order_by('product_name')
    mycustomers= customers.objects.all().order_by('name')
    return render(request, 'view_tables.html',{'productdata':myproducts,'customers':mycustomers})

def bill(request):
    myproducts = products.objects.all()  # Fetch all users
    mycustomers= customers.objects.all()
    return render(request, 'bill.html', {'productdata':myproducts,'customers':mycustomers})

@csrf_exempt
def save_bill(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Save bill details
        mybills = bills.objects.create(
            bill_number=data['bill_number'],
            date=data['date'],
            name=data['name'],
            address=data['address'],
            email=data['email'],
            mobile=data['mobile'],
            total_amount=data['total_amount']
        )
    return JsonResponse({'error': 'Invalid request'}, status=400)


def send_email(request):
    return render(request,'send_email.html')


def send_email_page(request):
    if request.method == "POST":
        context = {
            'bill_number': request.POST.get('bill_number'),
            'bill_date': request.POST.get('bill_date'),
            'customer_name': request.POST.get('customer_name'),
            'customer_email': request.POST.get('customer_email'),
            'total_amount': request.POST.get('total_amount'),
        }
        return render(request, 'send_email.html', context)
    return render(request, 'error.html')  # Handle invalid access

def send_email_message(request):
    if request.method == 'POST':
        # Extract data from the form
        bill_number = request.POST.get('bill_number')
        customer_email = request.POST.get('customer_email')
        customer_name = request.POST.get('customer_name')
        total_amount = request.POST.get('total_amount')
        bill_date = request.POST.get('bill_date')
        formatted_bill_date = datetime.strptime(bill_date, '%Y-%m-%d').strftime('%d-%b-%Y')
        email_body = f"""
    Hey dear {customer_name},

    Thank you for your purchase!

    Here are your invoice details:
    - Bill Number : {bill_number}
    - Bill Date   : {formatted_bill_date}
    - Total Amount: {total_amount}


    Please feel free to contact us if you have any questions.

    Best regards,  
    Fantastic Textile
    """
        email = EmailMessage(
            subject=f"Your Invoice - {bill_number}",
            body=email_body,
            from_email="dhruvgupta42585@gmail.com",
            to=[customer_email],
        )
        email.send()

    return HttpResponse(status=204)

def help(request):
    return render(request,'help.html')