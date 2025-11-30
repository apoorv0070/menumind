
#!/usr/bin/env bash
python manage.py migrate --noinput
exec gunicorn menumind.wsgi:application --bind 0.0.0.0:8000 --workers 3
