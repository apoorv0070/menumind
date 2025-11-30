
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
import redis, os, random, datetime, json
from .models import Prediction, Sales, Dish, Restaurant
REDIS_URL = os.getenv('REDIS_URL','redis://localhost:6379/0')
r = redis.from_url(REDIS_URL, decode_responses=True)
@api_view(['POST'])
def send_otp(request):
    phone = request.data.get('phone')
    if not phone: return Response({'error':'phone required'}, status=400)
    otp = '%06d' % random.randint(0,999999)
    r.set(f'otp:{phone}', otp, ex=300)
    # In production integrate SMS provider. For now return OTP in response for demo.
    return Response({'status':'sent','otp':otp})
@api_view(['POST'])
def verify_otp(request):
    phone = request.data.get('phone'); code = request.data.get('code')
    if not phone or not code: return Response({'error':'phone and code required'}, status=400)
    stored = r.get(f'otp:{phone}')
    if stored != code: return Response({'error':'invalid'}, status=400)
    # create or get user tied to phone
    username = 'u'+phone.replace('+','')
    user, _ = User.objects.get_or_create(username=username)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token':token.key})
@api_view(['POST'])
def run_prediction(request):
    # minimal: create a dummy prediction for demo
    user = request.user if request.user.is_authenticated else None
    restaurant = Restaurant.objects.first()
    payload = {'demo': {'Paneer Masala': {'pred_qty': 10}}}
    pred = Prediction.objects.create(restaurant=restaurant, date=datetime.date.today()+datetime.timedelta(days=1), payload=payload)
    return Response({'status':'ok','prediction':pred.payload})
@api_view(['GET'])
def get_my_prediction(request):
    # return latest prediction for first restaurant (demo)
    pred = Prediction.objects.order_by('-created_at').first()
    if not pred: return Response({'error':'no prediction'}, status=404)
    return Response({'payload': pred.payload, 'date': str(pred.date)})
@api_view(['POST'])
def upload_sales(request):
    # accept small CSV in body as text for demo (or multipart file)
    text = request.data.get('csv')
    if not text: return Response({'error':'csv required'}, status=400)
    lines = [l.strip() for l in text.strip().split('\n') if l.strip()]
    for row in lines[1:]:
        date,dish,qty = row.split(',')
        # naive demo: ignore creating Dish objects
    return Response({'status':'uploaded'})
