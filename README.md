# TODO REST API

## Requirements

* Python3
* Pipenv

## Getting started

1. Before running the application make sure Python3 is already installed in your machine. If not you can download it here https://www.python.org/downloads/.
2. Run command ```pip install pipenv``` which creates and manages a virtualenv for your projects, as well as adds/removes packages from your Pipfile as you install/uninstall packages. It also generates the ever-important Pipfile.lock, which is used to produce deterministic builds.
3. Navigate to server folder ```cd server```
4. Source the virtual environment ```pipenv shell```
5. Install the dependencies ```pipenv install```
6. Start the Django server. Run ```python manage.py runserver```.
7. Navigate to ```http://localhost:8000/admin/``` to see the django administration.
8. Navigate to ```http://localhost:8000/``` to see Django rest framework interface and view todos API

### Django admin superuser credentials

```
    username: admin
    password: password
```

## Create your own superuser

1. Run command ```python manage.py createsuperuser``` and this will prompt you to enter the ```username```, ```email```, ```password```, ```password(again)```.
2. Now youve created new superuser. Navigate to ```http://localhost:8000/admin/``` to see the django administration login page.
3. Logged in the superuser account you created earlier then you will be redirected to the admin page. You can now add and delete items from it.

## Built With

* [Python](https://www.python.org/) - A programming language that lets you work quickly and integrate systems more effectively.
* [Django](http://djangoproject.org/) - A high-level Python Web framework that encourages rapid development and clean, pragmatic design.
* [Django REST Framework](https://www.django-rest-framework.org/) - Powerful and flexible toolkit for building Web APIs.
